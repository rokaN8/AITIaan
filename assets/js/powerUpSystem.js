// Power-up System
// Handles power-up spawning, collection, effects, and management

class PowerUpSystem {
    constructor() {
        this.powerUps = [];
        this.activePowerUps = [];
        
        this.powerUpTypes = {
            widePaddle: { 
                duration: 15000, 
                color: '#cc0000',
                name: 'Wide Paddle'
            },
            slowBall: { 
                duration: 20000, 
                color: '#ff4444',
                name: 'Slow Ball'
            },
            multiball: {
                duration: 30000,
                color: '#ff8800',
                name: 'Multiball'
            }
        };
    }

    // Spawn power-up at specified location
    spawnPowerUp(x, y) {
        const types = Object.keys(this.powerUpTypes);
        let type;
        
        // Weighted selection: multiball is rarer (33% vs 50% each for others)
        const rand = Math.random();
        if (rand < 0.33) {
            type = 'multiball';
        } else if (rand < 0.665) {
            type = 'widePaddle';
        } else {
            type = 'slowBall';
        }
        
        this.powerUps.push({
            x: x,
            y: y,
            type: type,
            width: 30,
            height: 15,
            speed: 2
        });
    }

    // Update falling power-ups and active power-up timers
    update(paddle) {
        // Update falling power-ups
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            
            // Update position using physics system
            const offScreen = window.physics.updatePowerUp(powerUp);
            
            if (offScreen) {
                this.powerUps.splice(i, 1);
                continue;
            }
            
            // Check collision with paddle
            if (window.physics.checkPowerUpCollision(powerUp, paddle)) {
                this.collectPowerUp(powerUp);
                this.powerUps.splice(i, 1);
            }
        }
        
        // Update active power-ups
        const now = Date.now();
        for (let i = this.activePowerUps.length - 1; i >= 0; i--) {
            const powerUp = this.activePowerUps[i];
            if (now >= powerUp.endTime) {
                this.removePowerUpEffect(powerUp.type);
                this.activePowerUps.splice(i, 1);
            }
        }
    }

    // Collect power-up when paddle touches it
    collectPowerUp(powerUp) {
        this.applyPowerUpEffect(powerUp.type);
        window.visualEffects.addScreenShake(3, 150);
    }

    // Apply power-up effect
    applyPowerUpEffect(type) {
        const now = Date.now();
        const duration = this.powerUpTypes[type].duration;
        
        // Remove existing effect of same type
        for (let i = this.activePowerUps.length - 1; i >= 0; i--) {
            if (this.activePowerUps[i].type === type) {
                this.activePowerUps.splice(i, 1);
            }
        }
        
        // Add new effect
        this.activePowerUps.push({
            type: type,
            endTime: now + duration
        });
        
        // Apply immediate effects
        switch(type) {
            case 'widePaddle':
                window.paddle.width = window.paddle.originalWidth * 1.5;
                break;
            case 'slowBall':
                window.ball.speed = window.ball.originalSpeed * 0.7;
                // Adjust current velocity
                const currentSpeed = Math.sqrt(window.ball.vx * window.ball.vx + window.ball.vy * window.ball.vy);
                if (currentSpeed > 0) {
                    const ratio = window.ball.speed / currentSpeed;
                    window.ball.vx *= ratio;
                    window.ball.vy *= ratio;
                }
                break;
            case 'multiball':
                // Spawn 2 additional balls if we only have 1 ball
                if (window.balls.length === 1) {
                    for (let i = 0; i < 2; i++) {
                        const newBall = {
                            x: window.ball.x,
                            y: window.ball.y,
                            vx: (Math.random() - 0.5) * 6, // Random horizontal velocity
                            vy: -Math.abs(window.ball.vy), // Same upward velocity as main ball
                            radius: window.ball.radius,
                            speed: window.ball.speed,
                            originalSpeed: window.ball.originalSpeed,
                            onPaddle: false
                        };
                        window.balls.push(newBall);
                    }
                }
                break;
        }
    }

    // Remove power-up effect when it expires
    removePowerUpEffect(type) {
        switch(type) {
            case 'widePaddle':
                window.paddle.width = window.paddle.originalWidth;
                break;
            case 'slowBall':
                window.ball.speed = window.ball.originalSpeed;
                // Adjust current velocity
                const currentSpeed = Math.sqrt(window.ball.vx * window.ball.vx + window.ball.vy * window.ball.vy);
                if (currentSpeed > 0) {
                    const ratio = window.ball.speed / currentSpeed;
                    window.ball.vx *= ratio;
                    window.ball.vy *= ratio;
                }
                break;
        }
    }

    // Draw power-ups on canvas
    drawPowerUps(ctx) {
        this.powerUps.forEach(powerUp => {
            const centerX = powerUp.x + powerUp.width / 2;
            const centerY = powerUp.y + powerUp.height / 2;
            
            ctx.shadowColor = this.powerUpTypes[powerUp.type].color;
            ctx.shadowBlur = 10;
            
            if (powerUp.type === 'widePaddle') {
                // Wide paddle: Draw as wider rectangle with paddle-like appearance
                ctx.fillStyle = this.powerUpTypes[powerUp.type].color;
                ctx.fillRect(powerUp.x - 5, powerUp.y, powerUp.width + 10, powerUp.height);
                
                // Add white border to look like paddle
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(powerUp.x - 5, powerUp.y, powerUp.width + 10, powerUp.height);
                
            } else if (powerUp.type === 'slowBall') {
                // Slow ball: Draw as circle with clock markings
                const radius = Math.max(powerUp.width, powerUp.height) / 2;
                
                // Draw circle
                ctx.fillStyle = this.powerUpTypes[powerUp.type].color;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Add white border
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Add clock markings
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                // Top mark
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - radius + 2);
                ctx.lineTo(centerX, centerY - radius + 6);
                ctx.stroke();
                // Bottom mark
                ctx.beginPath();
                ctx.moveTo(centerX, centerY + radius - 2);
                ctx.lineTo(centerX, centerY + radius - 6);
                ctx.stroke();
                // Left mark
                ctx.beginPath();
                ctx.moveTo(centerX - radius + 2, centerY);
                ctx.lineTo(centerX - radius + 6, centerY);
                ctx.stroke();
                // Right mark
                ctx.beginPath();
                ctx.moveTo(centerX + radius - 2, centerY);
                ctx.lineTo(centerX + radius - 6, centerY);
                ctx.stroke();
                
            } else if (powerUp.type === 'multiball') {
                // Multiball: Draw as three circles in triangular formation
                const radius = 6;
                
                // Draw background rectangle
                ctx.fillStyle = this.powerUpTypes[powerUp.type].color;
                ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
                
                // Add border
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
                
                // Draw three balls in triangular formation
                ctx.fillStyle = '#ffffff';
                
                // Top ball
                ctx.beginPath();
                ctx.arc(centerX, centerY - 4, radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Bottom left ball
                ctx.beginPath();
                ctx.arc(centerX - 6, centerY + 4, radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Bottom right ball
                ctx.beginPath();
                ctx.arc(centerX + 6, centerY + 4, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.shadowBlur = 0;
        });
    }

    // Update power-up timers display
    updateTimersDisplay() {
        const timersDiv = document.getElementById('powerUpTimers');
        timersDiv.innerHTML = '';
        
        const now = Date.now();
        this.activePowerUps.forEach(powerUp => {
            const timeLeft = Math.max(0, powerUp.endTime - now);
            const seconds = Math.ceil(timeLeft / 1000);
            
            const timerDiv = document.createElement('div');
            timerDiv.className = 'power-up-timer';
            timerDiv.textContent = `${this.powerUpTypes[powerUp.type].name}: ${seconds}s`;
            timerDiv.style.borderColor = this.powerUpTypes[powerUp.type].color;
            timersDiv.appendChild(timerDiv);
        });
    }

    // Clear all power-ups (useful for game restart)
    clearAllPowerUps() {
        this.powerUps.length = 0;
        this.activePowerUps.length = 0;
        
        // Reset paddle and ball to original state
        if (window.paddle) {
            window.paddle.width = window.paddle.originalWidth;
        }
        if (window.ball) {
            window.ball.speed = window.ball.originalSpeed;
        }
    }

    // Get active power-ups for external use
    getActivePowerUps() {
        return [...this.activePowerUps];
    }

    // Get falling power-ups for external use
    getFallingPowerUps() {
        return [...this.powerUps];
    }

    // Check if specific power-up type is active
    isPowerUpActive(type) {
        return this.activePowerUps.some(powerUp => powerUp.type === type);
    }
}

// Create global power-up system instance
window.powerUpSystem = new PowerUpSystem();
