// Main Game Logic
// Coordinates all systems and handles the core game loop

class GameLogic {
    constructor() {
        this.gameState = 'waiting';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.isDeveloperMode = false;
        this.useMouseControl = false;
        this.mouseX = 0;
        
        // Game objects
        this.paddle = null;
        this.ball = null;
        this.balls = [];
        this.bricks = [];
        
        // Input handling
        this.keys = { left: false, right: false };
        
        // Canvas and context
        this.canvas = null;
        this.ctx = null;
        
        // Explosion state management
        this.explosionState = {
            active: false,
            timer: 0,
            duration: 1000, // 1 second delay
            callback: null
        };
        
        // Leaderboard
        this.leaderboard = this.loadLeaderboard();
    }

    // Initialize the game
    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize all systems
        window.soundManager.init();
        
        // Set up game objects
        this.setupGameObjects();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
        
        // Update UI
        this.updateUI();
    }

    // Set up initial game objects
    setupGameObjects() {
        // Create paddle
        this.paddle = {
            x: 390,
            y: 600,
            width: 100,
            originalWidth: 100,
            height: 15,
            speed: 8
        };
        
        // Create ball
        this.ball = {
            x: this.paddle.x + this.paddle.width / 2,
            y: this.paddle.y - 10,
            vx: 0,
            vy: 0,
            radius: 9,
            speed: 4,
            originalSpeed: 4,
            onPaddle: true
        };
        
        // Initialize balls array with main ball
        this.balls = [this.ball];
        
        // Create level
        this.createLevel();
        
        // Make objects globally accessible
        window.paddle = this.paddle;
        window.ball = this.ball;
        window.balls = this.balls;
        window.gameState = this.gameState;
    }

    // Create level based on current level number
    createLevel() {
        if (this.isDeveloperMode) {
            this.bricks = window.brickSystem.createDeveloperLevel();
        } else {
            this.bricks = window.brickSystem.createLevel(this.level);
        }
        
        window.aiSystem.startNewLevel();
    }

    // Set up event listeners
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // UI button events
        document.getElementById('resetButton').addEventListener('click', () => this.clearHighScores());
        document.getElementById('submitScore').addEventListener('click', () => this.submitScore());
        document.getElementById('playAgain').addEventListener('click', () => this.playAgain());
    }

    // Handle keyboard input
    handleKeyDown(e) {
        // During game over, only allow essential keys for name entry
        if (this.gameState === 'gameOver') {
            // Allow Enter to submit score
            if (e.code === 'Enter') {
                e.preventDefault();
                this.submitScore();
            }
            // Block all other game controls during name entry
            return;
        }
        
        switch(e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
            case 'Space':
                e.preventDefault();
                this.launchBall();
                break;
            case 'KeyM':
                this.useMouseControl = !this.useMouseControl;
                break;
            case 'KeyS':
                window.soundManager.toggleSound();
                break;
            case 'KeyP':
                this.togglePause();
                break;
            case 'KeyD':
                this.toggleDeveloperMode();
                break;
            case 'Equal': // + key
                if (this.isDeveloperMode) {
                    this.adjustLives(1);
                }
                break;
            case 'Minus': // - key
                if (this.isDeveloperMode) {
                    this.adjustLives(-1);
                }
                break;
            case 'BracketLeft': // [ key
                if (this.isDeveloperMode) {
                    this.adjustLevel(-1);
                }
                break;
            case 'BracketRight': // ] key
                if (this.isDeveloperMode) {
                    this.adjustLevel(1);
                }
                break;
            case 'KeyB':
                this.explodeBall();
                break;
            case 'KeyR':
                this.resetGame();
                break;
        }
    }

    handleKeyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = false;
                break;
        }
    }

    // Handle mouse movement
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
    }

    // Handle mouse clicks
    handleClick(e) {
        if (this.gameState === 'waiting') {
            this.launchBall();
        }
    }

    // Launch ball from paddle
    launchBall() {
        if (this.gameState === 'waiting') {
            window.physics.launchBall(this.ball);
            this.gameState = 'playing';
            window.gameState = this.gameState;
            window.soundManager.startBackgroundMusic();
        }
    }

    // Toggle pause
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            window.soundManager.pauseGame(); // Keep background music playing
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            window.soundManager.unpauseGame(); // Ensure music continues
        }
        window.gameState = this.gameState;
    }

    // Main game loop
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    // Update game state
    update() {
        // Always allow paddle movement (even when waiting)
        window.physics.updatePaddle(this.paddle, this.keys, this.mouseX, this.useMouseControl);
        
        // Always update ball position when on paddle (even when waiting)
        if (this.gameState === 'waiting') {
            this.balls.forEach(currentBall => {
                window.physics.updateBallOnPaddle(currentBall, this.paddle);
            });
        }
        
        // Always update visual effects (including during explosions)
        window.visualEffects.update();
        
        // Handle explosion state timing
        if (this.explosionState.active) {
            this.explosionState.timer += 16; // Assuming 60fps
            if (this.explosionState.timer >= this.explosionState.duration) {
                // Explosion animation complete, execute callback
                this.explosionState.active = false;
                this.explosionState.timer = 0;
                if (this.explosionState.callback) {
                    this.explosionState.callback();
                    this.explosionState.callback = null;
                }
            }
            // Don't return here - continue updating other systems during explosion
        }
        
        if (this.gameState !== 'playing') return;
        
        // Update balls
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const currentBall = this.balls[i];
            
            // Update ball position when on paddle
            window.physics.updateBallOnPaddle(currentBall, this.paddle);
            
            // Update ball physics
            const ballLost = window.physics.updateBall(currentBall);
            
            if (ballLost) {
                this.balls.splice(i, 1);
                continue;
            }
            
            // Check paddle collision
            window.physics.checkPaddleBallCollision(currentBall, this.paddle);
            
            // Check brick collisions
            const collision = window.physics.checkBrickCollisions(currentBall, this.bricks, window.brickSystem.getAllBrickTypes());
            if (collision) {
                this.handleBrickCollision(collision, currentBall);
            }
            
            // Normalize ball velocity
            window.physics.normalizeBallVelocity(currentBall);
        }
        
        // Check if all balls are lost
        if (this.balls.length === 0) {
            this.loseLife();
        }
        
        // Update systems
        window.brickSystem.updateSpecialBricks(this.bricks);
        window.powerUpSystem.update(this.paddle);
        
        // Create ball trail effects
        window.visualEffects.createBallTrail(this.balls);
        
        // Check level completion
        if (window.brickSystem.isLevelComplete(this.bricks)) {
            this.completeLevel();
        }
        
        // Update UI
        this.updateUI();
    }

    // Handle brick collision
    handleBrickCollision(collision, ball) {
        const { brick, brickType } = collision;
        
        // Handle explosion bricks
        if (brickType.special === 'explosion') {
            const explosionRadius = 80;
            const result = window.brickSystem.getBricksInExplosionRadius(
                ball.x, ball.y, explosionRadius, this.bricks
            );
            
            this.score += result.totalPoints;
            window.soundManager.playExplosion();
            window.visualEffects.createExplosionParticles(ball.x, ball.y);
            window.visualEffects.addScreenShake(8, 300);
        } else {
            // Normal brick hit
            const result = window.brickSystem.hitBrick(brick, collision);
            this.score += result.points;
            
            // Chance to spawn power-up when brick is destroyed
            if (result.destroyed && (Math.random() < 0.2 || window.aiSystem.shouldSpawnHelpfulPowerUp())) {
                window.powerUpSystem.spawnPowerUp(
                    brick.x + brick.width / 2 - 15,
                    brick.y + brick.height
                );
            }
        }
    }

    // Lose a life
    loseLife() {
        this.lives--;
        window.aiSystem.recordBallLoss();
        window.soundManager.playLifeLost();
        window.visualEffects.addScreenShake(5, 200);
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.resetBallToPaddle();
        }
    }

    // Reset ball to paddle
    resetBallToPaddle() {
        // Clear all balls and reset to single ball
        this.balls.length = 0;
        window.physics.resetBallToPaddle(this.ball, this.paddle);
        this.balls.push(this.ball);
        
        this.gameState = 'waiting';
        window.gameState = this.gameState;
        window.soundManager.stopBackgroundMusic();
    }

    // Explode ball at current position
    explodeBall() {
        // Only allow explosion during active gameplay when ball is not on paddle
        if (this.gameState !== 'playing' || this.balls.some(ball => ball.onPaddle) || this.explosionState.active) {
            return;
        }
        
        // Don't explode if no balls exist
        if (this.balls.length === 0) return;
        
        const explosionRadius = 180;
        let totalPoints = 0;
        
        // Play explosion sound
        window.soundManager.playExplosion();
        
        // Create explosions at ALL ball positions for multiball support
        this.balls.forEach(ball => {
            // Create explosion visual effects for each ball
            window.visualEffects.createExplosionParticles(ball.x, ball.y, 25);
            
            // Get bricks in explosion radius and destroy them
            const result = window.brickSystem.getBricksInExplosionRadius(
                ball.x, ball.y, explosionRadius, this.bricks
            );
            
            totalPoints += result.totalPoints;
        });
        
        // Add intense screen shake for multiple explosions
        window.visualEffects.addScreenShake(12, 600);
        
        // Award points for all destroyed bricks
        this.score += totalPoints;
        
        // Set explosion state to delay game state changes
        this.explosionState.active = true;
        this.explosionState.timer = 0;
        
        // Check if level is complete BEFORE losing life
        if (window.brickSystem.isLevelComplete(this.bricks)) {
            // Level complete - advance to next level and reset lives to 3
            this.explosionState.callback = () => this.completeLevel();
        } else {
            // Level not complete - lose a life
            this.explosionState.callback = () => this.loseLife();
        }
    }

    // Complete current level
    completeLevel() {
        this.level++;
        this.lives = 3; // Reset lives to 3 when completing level
        this.createLevel();
        this.resetBallToPaddle();
        
        // Bonus points for completing level
        this.score += 100;
    }

    // Game over
    gameOver() {
        this.gameState = 'gameOver';
        window.gameState = this.gameState;
        window.soundManager.stopBackgroundMusic();
        window.soundManager.playEndGameSound();
        
        // Show game over screen
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = this.score;
        
        // Check if score qualifies for leaderboard
        if (this.isHighScore(this.score)) {
            document.getElementById('nameEntry').style.display = 'block';
            document.getElementById('playerName').focus();
        } else {
            document.getElementById('nameEntry').style.display = 'none';
        }
    }

    // Reset game
    resetGame() {
        this.gameState = 'waiting';
        window.gameState = this.gameState;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        // Reset systems
        window.aiSystem.resetMetrics();
        window.powerUpSystem.clearAllPowerUps();
        window.visualEffects.clearAllParticles();
        window.soundManager.stopBackgroundMusic();
        
        // Reset game objects
        this.setupGameObjects();
        
        // Hide game over screen
        document.getElementById('gameOver').style.display = 'none';
        
        this.updateUI();
    }

    // Submit score to leaderboard
    submitScore() {
        const name = document.getElementById('playerName').value.trim().toUpperCase();
        if (name.length > 0) {
            this.addToLeaderboard(name, this.score);
            this.saveLeaderboard();
            this.updateLeaderboard();
            
            // Clear the name input for next time
            document.getElementById('playerName').value = '';
            
            // Automatically restart the game
            this.resetGame();
        }
    }

    // Play again after game over
    playAgain() {
        this.resetGame();
    }

    // Render game
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply screen shake
        this.ctx.save();
        window.visualEffects.applyScreenShake(this.ctx);
        
        // If game over, show spooky face image instead of normal game
        if (this.gameState === 'gameOver') {
            const faceDrawn = window.visualEffects.drawGameOverFace(this.ctx, this.canvas.width, this.canvas.height);
            if (faceDrawn) {
                this.ctx.restore();
                return; // Don't draw normal game elements
            }
        }
        
        // Draw background image if loaded, otherwise use black background
        window.visualEffects.drawBackground(this.ctx, this.canvas.width, this.canvas.height);
        
        // Draw stars on top of background
        window.visualEffects.drawStars(this.ctx);
        
        // Draw floating ghosts (behind game elements but above background)
        window.visualEffects.drawFloatingGhosts();
        
        // Draw ball trail sparkles first (behind everything else)
        window.visualEffects.drawBallTrail(this.ctx);
        
        // Draw bricks
        window.brickSystem.drawBricks(this.ctx, this.bricks);
        
        // Draw paddle (black with white border)
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        
        // Add white border to paddle
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        
        // Draw balls (hollow with white border and glow)
        this.balls.forEach(currentBall => {
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(currentBall.x, currentBall.y, currentBall.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Add ball glow
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = 15;
            this.ctx.beginPath();
            this.ctx.arc(currentBall.x, currentBall.y, currentBall.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
        
        // Draw power-ups
        window.powerUpSystem.drawPowerUps(this.ctx);
        
        // Draw particles
        window.visualEffects.drawParticles(this.ctx);
        
        // Draw waiting message
        if (this.gameState === 'waiting') {
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = '26px ScaryFont, Courier New, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Press SPACE to launch ball', this.canvas.width / 2, this.canvas.height / 2);
        }
        
        // Draw pause message
        if (this.gameState === 'paused') {
            this.ctx.fillStyle = '#ff4444';
            this.ctx.font = '32px ScaryFont, Courier New, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = '18px ScaryFont, Courier New, monospace';
            this.ctx.fillText('Press P to resume', this.canvas.width / 2, this.canvas.height / 2 + 40);
        }
        
        // Draw developer mode indicator
        if (this.isDeveloperMode) {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.font = '16px ScaryFont, Courier New, monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText('DEV MODE', 10, 25);
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = '12px ScaryFont, Courier New, monospace';
            this.ctx.fillText('D=toggle +/-=lives [/]=level', 10, 45);
        }
        
        this.ctx.restore();
    }

    // Update UI elements
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
        
        // Update power-up timers
        window.powerUpSystem.updateTimersDisplay();
    }

    // Leaderboard management
    loadLeaderboard() {
        const saved = localStorage.getItem('breakoutLeaderboard');
        return saved ? JSON.parse(saved) : [];
    }

    saveLeaderboard() {
        localStorage.setItem('breakoutLeaderboard', JSON.stringify(this.leaderboard));
    }

    // Clear high scores from localStorage
    clearHighScores() {
        if (confirm('Are you sure you want to clear all high scores? This cannot be undone.')) {
            this.leaderboard = [];
            localStorage.removeItem('breakoutLeaderboard');
            this.updateLeaderboard();
            console.log('High scores cleared');
        }
    }

    isHighScore(score) {
        return this.leaderboard.length < 10 || score > this.leaderboard[this.leaderboard.length - 1].score;
    }

    addToLeaderboard(name, score) {
        this.leaderboard.push({ name, score });
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10);
    }

    updateLeaderboard() {
        const leaderboardDiv = document.getElementById('leaderboardEntries');
        leaderboardDiv.innerHTML = '';
        
        for (let i = 0; i < 10; i++) {
            const entry = this.leaderboard[i];
            const entryDiv = document.createElement('div');
            entryDiv.className = entry ? 'leaderboard-entry' : 'leaderboard-entry empty';
            
            entryDiv.innerHTML = `
                <span class="leaderboard-rank">${i + 1}.</span>
                <span class="leaderboard-name">${entry ? entry.name : '---'}</span>
                <span class="leaderboard-score">${entry ? entry.score : '---'}</span>
            `;
            
            leaderboardDiv.appendChild(entryDiv);
        }
    }

    // Toggle developer mode
    toggleDeveloperMode() {
        this.isDeveloperMode = !this.isDeveloperMode;
        console.log(`Developer Mode: ${this.isDeveloperMode ? 'ON' : 'OFF'}`);
        
        if (this.isDeveloperMode) {
            console.log('Developer Controls:');
            console.log('  +/- : Adjust lives (1-10)');
            console.log('  [/] : Adjust level difficulty');
            console.log('  D   : Toggle developer mode');
        }
        
        // Recreate level with new mode
        this.createLevel();
        this.updateUI();
    }

    // Adjust lives in developer mode
    adjustLives(change) {
        if (!this.isDeveloperMode) return;
        
        const newLives = Math.max(1, Math.min(10, this.lives + change));
        if (newLives !== this.lives) {
            this.lives = newLives;
            console.log(`Lives adjusted to: ${this.lives}`);
            this.updateUI();
        }
    }

    // Adjust level in developer mode
    adjustLevel(change) {
        if (!this.isDeveloperMode) return;
        
        const newLevel = Math.max(1, Math.min(99, this.level + change));
        if (newLevel !== this.level) {
            this.level = newLevel;
            console.log(`Level adjusted to: ${this.level}`);
            
            // Recreate level with new difficulty
            this.createLevel();
            this.updateUI();
        }
    }

    // Enable developer mode
    enableDeveloperMode() {
        this.isDeveloperMode = true;
        this.resetGame();
    }

    // Disable developer mode
    disableDeveloperMode() {
        this.isDeveloperMode = false;
        this.resetGame();
    }
}

// Create and initialize game when page loads
window.addEventListener('load', () => {
    window.game = new GameLogic();
    window.game.init();
    window.game.updateLeaderboard();
});
