// Visual Effects System
// Handles particles, screen shake, ball trails, star animations, and image rendering

class VisualEffects {
    constructor() {
        this.particles = [];
        this.ballTrailParticles = [];
        this.screenShake = { x: 0, y: 0, intensity: 0, duration: 0 };
        this.stars = [];
        
        // Image system
        this.images = {
            background: null,
            gameOverFace: null,
            ghost: null
        };
        this.imageLoadStates = {
            background: false,
            gameOverFace: false,
            ghost: false
        };
        
        // Floating ghost system
        this.floatingGhosts = [];
        this.lastGhostSpawn = 0;
        this.lastGhostSound = 0;
        this.GHOST_SPAWN_INTERVAL = 8000; // 8 seconds between ghost spawns
        this.GHOST_SOUND_INTERVAL = 25000; // 25+ seconds between ghost sounds
        this.MAX_GHOSTS = 8; // Maximum number of floating ghosts
        
        this.initStars();
        this.loadImages();
    }

    // Initialize star field for spooky background
    initStars() {
        const CANVAS_WIDTH = 880;
        const CANVAS_HEIGHT = 660;
        
        for (let i = 0; i < 75; i++) {
            this.stars.push({
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.7 + 0.3,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    // Update star positions and twinkling
    updateStars() {
        const CANVAS_WIDTH = 880;
        const CANVAS_HEIGHT = 660;
        
        for (let star of this.stars) {
            star.x -= star.speed;
            star.twinklePhase += star.twinkleSpeed;
            star.opacity = 0.3 + 0.7 * (Math.sin(star.twinklePhase) * 0.5 + 0.5);
            
            // Wrap around when star exits left side
            if (star.x < -5) {
                star.x = CANVAS_WIDTH + 5;
                star.y = Math.random() * CANVAS_HEIGHT;
            }
        }
    }

    // Draw stars on canvas
    drawStars(ctx) {
        for (let star of this.stars) {
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    // Create explosion particles
    createParticles(x, y, color, count = 8) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                decay: 0.02,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }

    // Create explosion particles for ball explosion
    createExplosionParticles(x, y) {
        for (let i = 0; i < 25; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                life: 1.0,
                decay: 0.015,
                color: ['#ff4444', '#ff8800', '#ffaa00', '#cc0000'][Math.floor(Math.random() * 4)],
                size: Math.random() * 6 + 3
            });
        }
    }

    // Create vampire regeneration particles
    createVampireRegenParticles(x, y) {
        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 1,
                life: 1.0,
                decay: 0.025,
                color: '#cc0000',
                size: Math.random() * 3 + 2
            });
        }
    }

    // Create ball trail sparkles
    createBallTrail(balls) {
        // Create sparkle particles for each ball
        balls.forEach(currentBall => {
            if (currentBall.onPaddle) return;
            
            // Create sparkle particles at ball position
            const colors = ['#ffffff', '#ffdd00', '#88ccff', '#cc88ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.ballTrailParticles.push({
                x: currentBall.x + (Math.random() - 0.5) * 4,
                y: currentBall.y + (Math.random() - 0.5) * 4,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                decay: 0.03,
                color: color,
                size: Math.random() * 2 + 1,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.1 + 0.05
            });
        });
        
        // Limit trail particles to prevent performance issues
        if (this.ballTrailParticles.length > 100) { // Increased limit for multiple balls
            this.ballTrailParticles.splice(0, this.ballTrailParticles.length - 100);
        }
    }

    // Update ball trail particles
    updateBallTrail() {
        for (let i = this.ballTrailParticles.length - 1; i >= 0; i--) {
            const particle = this.ballTrailParticles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.99;
            particle.twinkle += particle.twinkleSpeed;
            
            // Add slight gravity
            particle.vy += 0.02;
            
            if (particle.life <= 0) {
                this.ballTrailParticles.splice(i, 1);
            }
        }
    }

    // Update regular particles
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.size *= 0.98;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // Add screen shake effect
    addScreenShake(intensity, duration) {
        this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
        this.screenShake.duration = Math.max(this.screenShake.duration, duration);
    }

    // Update screen shake
    updateScreenShake() {
        if (this.screenShake.duration > 0) {
            this.screenShake.x = (Math.random() - 0.5) * this.screenShake.intensity;
            this.screenShake.y = (Math.random() - 0.5) * this.screenShake.intensity;
            this.screenShake.duration -= 16; // Assuming 60fps
            this.screenShake.intensity *= 0.9;
        } else {
            this.screenShake.x = 0;
            this.screenShake.y = 0;
            this.screenShake.intensity = 0;
        }
    }

    // Draw ball trail sparkles
    drawBallTrail(ctx) {
        this.ballTrailParticles.forEach(particle => {
            const twinkleAlpha = particle.life * (0.5 + 0.5 * Math.sin(particle.twinkle));
            ctx.globalAlpha = twinkleAlpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    // Draw regular particles
    drawParticles(ctx) {
        this.particles.forEach(particle => {
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }

    // Load all game images
    loadImages() {
        // Load background image
        this.images.background = new Image();
        this.images.background.onload = () => {
            this.imageLoadStates.background = true;
            console.log('Background image loaded successfully');
        };
        this.images.background.onerror = () => {
            console.warn('Failed to load background image');
            this.imageLoadStates.background = false;
        };
        this.images.background.src = 'assets/sprites/backgroundImage.jpg';
        
        // Load game over face image
        this.images.gameOverFace = new Image();
        this.images.gameOverFace.onload = () => {
            this.imageLoadStates.gameOverFace = true;
            console.log('Game over face image loaded successfully');
        };
        this.images.gameOverFace.onerror = () => {
            console.warn('Failed to load game over face image');
            this.imageLoadStates.gameOverFace = false;
        };
        this.images.gameOverFace.src = 'assets/sprites/face.png';
        
        // Load ghost sprite
        this.images.ghost = new Image();
        this.images.ghost.onload = () => {
            this.imageLoadStates.ghost = true;
            console.log('Ghost sprite loaded successfully');
        };
        this.images.ghost.onerror = () => {
            console.warn('Failed to load ghost sprite');
            this.imageLoadStates.ghost = false;
        };
        this.images.ghost.src = 'assets/sprites/ghost.png';
    }

    // Draw background (image if loaded, otherwise black)
    drawBackground(ctx, canvasWidth, canvasHeight) {
        if (this.imageLoadStates.background && this.images.background) {
            ctx.drawImage(this.images.background, 0, 0, canvasWidth, canvasHeight);
        } else {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
    }

    // Draw game over face overlay
    drawGameOverFace(ctx, canvasWidth, canvasHeight) {
        if (this.imageLoadStates.gameOverFace && this.images.gameOverFace) {
            ctx.drawImage(this.images.gameOverFace, 0, 0, canvasWidth, canvasHeight);
            return true;
        }
        return false;
    }

    // Spawn floating ghost
    spawnFloatingGhost() {
        if (!this.imageLoadStates.ghost || this.floatingGhosts.length >= this.MAX_GHOSTS) return;
        
        const now = Date.now();
        if (now - this.lastGhostSpawn < this.GHOST_SPAWN_INTERVAL) return;
        
        // Get full page dimensions
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        
        // Spawn ghost at random edge of full page
        const spawnSide = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let x, y, vx, vy;
        
        switch(spawnSide) {
            case 0: // Top
                x = Math.random() * pageWidth;
                y = -50;
                vx = (Math.random() - 0.5) * 2;
                vy = Math.random() * 1 + 0.5;
                break;
            case 1: // Right
                x = pageWidth + 50;
                y = Math.random() * pageHeight;
                vx = -(Math.random() * 1 + 0.5);
                vy = (Math.random() - 0.5) * 2;
                break;
            case 2: // Bottom
                x = Math.random() * pageWidth;
                y = pageHeight + 50;
                vx = (Math.random() - 0.5) * 2;
                vy = -(Math.random() * 1 + 0.5);
                break;
            case 3: // Left
                x = -50;
                y = Math.random() * pageHeight;
                vx = Math.random() * 1 + 0.5;
                vy = (Math.random() - 0.5) * 2;
                break;
        }
        
        this.floatingGhosts.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            size: Math.random() * 60 + 80, // 80-140 pixels
            opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7 opacity
            floatPhase: Math.random() * Math.PI * 2,
            floatSpeed: Math.random() * 0.02 + 0.01,
            lifetime: 0,
            maxLifetime: Math.random() * 20000 + 15000, // 15-35 seconds
            id: Date.now() + Math.random() // Unique ID for DOM element
        });
        
        this.lastGhostSpawn = now;
    }

    // Update floating ghosts
    updateFloatingGhosts() {
        const now = Date.now();
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        
        // Update existing ghosts
        for (let i = this.floatingGhosts.length - 1; i >= 0; i--) {
            const ghost = this.floatingGhosts[i];
            
            // Update position
            ghost.x += ghost.vx;
            ghost.y += ghost.vy;
            
            // Update floating animation
            ghost.floatPhase += ghost.floatSpeed;
            ghost.lifetime += 16; // Assuming 60fps
            
            // Add some random drift to movement
            ghost.vx += (Math.random() - 0.5) * 0.1;
            ghost.vy += (Math.random() - 0.5) * 0.1;
            
            // Limit velocity
            const maxSpeed = 2;
            const speed = Math.sqrt(ghost.vx * ghost.vx + ghost.vy * ghost.vy);
            if (speed > maxSpeed) {
                ghost.vx = (ghost.vx / speed) * maxSpeed;
                ghost.vy = (ghost.vy / speed) * maxSpeed;
            }
            
            // Remove ghost if it's been alive too long or moved too far off full page
            if (ghost.lifetime > ghost.maxLifetime || 
                ghost.x < -200 || ghost.x > pageWidth + 200 ||
                ghost.y < -200 || ghost.y > pageHeight + 200) {
                
                // Clean up DOM element
                const ghostElement = document.getElementById(`floating-ghost-${ghost.id}`);
                if (ghostElement) {
                    ghostElement.remove();
                }
                
                this.floatingGhosts.splice(i, 1);
            }
        }
        
        // Spawn new ghosts
        this.spawnFloatingGhost();
        
        // Play ghost sound randomly
        if (now - this.lastGhostSound > this.GHOST_SOUND_INTERVAL) {
            // Add some randomness to the interval (25-35 seconds)
            const randomInterval = this.GHOST_SOUND_INTERVAL + Math.random() * 10000;
            if (now - this.lastGhostSound > randomInterval) {
                if (window.soundManager) {
                    window.soundManager.playGhostSound();
                }
                this.lastGhostSound = now;
            }
        }
    }

    // Draw floating ghosts using DOM elements for full page coverage
    drawFloatingGhosts() {
        if (!this.imageLoadStates.ghost || !this.images.ghost) return;
        
        this.floatingGhosts.forEach(ghost => {
            // Create or update ghost DOM element for full page coverage
            let ghostElement = document.getElementById(`floating-ghost-${ghost.id}`);
            
            if (!ghostElement) {
                ghostElement = document.createElement('div');
                ghostElement.id = `floating-ghost-${ghost.id}`;
                ghostElement.style.position = 'fixed';
                ghostElement.style.pointerEvents = 'none';
                ghostElement.style.zIndex = '10';
                ghostElement.style.backgroundImage = `url('assets/sprites/ghost.png')`;
                ghostElement.style.backgroundSize = 'contain';
                ghostElement.style.backgroundRepeat = 'no-repeat';
                ghostElement.style.filter = 'drop-shadow(0 0 15px #88ccff)';
                document.body.appendChild(ghostElement);
            }
            
            // Calculate position with floating animation
            const floatOffset = Math.sin(ghost.floatPhase) * 5;
            const drawX = ghost.x;
            const drawY = ghost.y + floatOffset;
            
            // Calculate rotation based on movement direction
            const angle = Math.atan2(ghost.vy, ghost.vx);
            const rotation = (angle * 180 / Math.PI) + 90; // +90 to align head with direction
            
            // Determine opacity based on game area overlap
            let opacity = ghost.opacity;
            const canvas = document.getElementById('gameCanvas');
            if (canvas) {
                const canvasRect = canvas.getBoundingClientRect();
                const gameAreaLeft = canvasRect.left + 39 - 20; // BRICK_OFFSET_LEFT
                const gameAreaRight = canvasRect.left + 39 + (9 * (83 + 6)) + 20; // BRICK_COLS * (BRICK_WIDTH + BRICK_PADDING)
                const gameAreaTop = canvasRect.top + 66 - 20; // BRICK_OFFSET_TOP
                const gameAreaBottom = canvasRect.top + 600 + 17 + 20; // paddle.y + paddle.height
                
                // If ghost overlaps with game area, reduce opacity significantly
                if (drawX + ghost.size > gameAreaLeft && drawX < gameAreaRight &&
                    drawY + ghost.size > gameAreaTop && drawY < gameAreaBottom) {
                    opacity *= 0.3; // Much more transparent when behind game
                }
            }
            
            // Update ghost element styles
            ghostElement.style.left = `${drawX}px`;
            ghostElement.style.top = `${drawY}px`;
            ghostElement.style.width = `${ghost.size}px`;
            ghostElement.style.height = `${ghost.size}px`;
            ghostElement.style.opacity = opacity;
            ghostElement.style.transform = `rotate(${rotation}deg)`;
        });
    }

    // Update all visual effects
    update() {
        this.updateStars();
        this.updateParticles();
        this.updateBallTrail();
        this.updateScreenShake();
        this.updateFloatingGhosts();
    }

    // Apply screen shake to canvas context
    applyScreenShake(ctx) {
        ctx.translate(this.screenShake.x, this.screenShake.y);
    }

    // Get screen shake values for external use
    getScreenShake() {
        return { ...this.screenShake };
    }

    // Clear all particles (useful for game restart)
    clearAllParticles() {
        this.particles.length = 0;
        this.ballTrailParticles.length = 0;
    }
}

// Create global visual effects instance
window.visualEffects = new VisualEffects();
