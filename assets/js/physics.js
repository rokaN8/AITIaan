// Physics System
// Handles ball movement, collision detection, and paddle mechanics

class Physics {
    constructor() {
        this.CANVAS_WIDTH = 880;
        this.CANVAS_HEIGHT = 660;
        this.BALL_RADIUS = 9;
    }

    // Update paddle position based on input
    updatePaddle(paddle, keys, mouseX, useMouseControl) {
        if (useMouseControl) {
            paddle.x = mouseX - paddle.width / 2;
        } else {
            if (keys.left && paddle.x > 0) {
                paddle.x -= paddle.speed;
            }
            if (keys.right && paddle.x < this.CANVAS_WIDTH - paddle.width) {
                paddle.x += paddle.speed;
            }
        }
        
        // Keep paddle in bounds
        paddle.x = Math.max(0, Math.min(this.CANVAS_WIDTH - paddle.width, paddle.x));
    }

    // Update ball position and handle wall collisions
    updateBall(ball) {
        if (ball.onPaddle) return;

        // Apply AI physics assistance (only to main ball)
        if (ball === window.ball) {
            window.aiSystem.applyPhysicsAssistance(ball, window.paddle);
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= this.CANVAS_WIDTH) {
            ball.vx = -ball.vx;
            ball.x = Math.max(ball.radius, Math.min(this.CANVAS_WIDTH - ball.radius, ball.x));
            window.aiSystem.recordBallBounce();
        }

        if (ball.y - ball.radius <= 0) {
            ball.vy = -ball.vy;
            ball.y = ball.radius;
            window.aiSystem.recordBallBounce();
        }

        // Ball fell off bottom - return true to indicate ball should be removed
        if (ball.y - ball.radius > this.CANVAS_HEIGHT) {
            return true;
        }

        return false;
    }

    // Check paddle-ball collision
    checkPaddleBallCollision(ball, paddle) {
        // First try AI assistance for struggling players (only for main ball)
        if (ball === window.ball && window.aiSystem.applyCollisionAssistance(ball, paddle)) {
            return true; // AI assistance handled the collision
        }

        // Normal collision detection
        if (ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width) {
            
            // Calculate hit position on paddle (-1 to 1)
            const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            
            // Adjust ball angle based on hit position
            ball.vx = hitPos * 5;
            ball.vy = -Math.abs(ball.vy);
            
            // Ensure minimum upward velocity
            if (Math.abs(ball.vy) < 3) {
                ball.vy = -3;
            }
            
            ball.y = paddle.y - ball.radius;
            window.aiSystem.recordPaddleHit();
            
            return true;
        }

        return false;
    }

    // Check brick collisions for a single ball
    checkBrickCollisions(ball, bricks, brickTypes) {
        const BRICK_ROWS = 6;
        const BRICK_COLS = 9;

        for (let row = 0; row < BRICK_ROWS; row++) {
            for (let col = 0; col < BRICK_COLS; col++) {
                const brick = bricks[row][col];
                if (!brick.visible) continue;
                
                // Skip ghost bricks when they're phased out
                if (brickTypes[brick.type].special === 'ghost' && brick.isPhased) {
                    continue;
                }
                
                if (ball.x + ball.radius >= brick.x &&
                    ball.x - ball.radius <= brick.x + brick.width &&
                    ball.y + ball.radius >= brick.y &&
                    ball.y - ball.radius <= brick.y + brick.height) {
                    
                    // Determine collision side
                    const overlapLeft = (ball.x + ball.radius) - brick.x;
                    const overlapRight = (brick.x + brick.width) - (ball.x - ball.radius);
                    const overlapTop = (ball.y + ball.radius) - brick.y;
                    const overlapBottom = (brick.y + brick.height) - (ball.y - ball.radius);
                    
                    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                    
                    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                        ball.vx = -ball.vx;
                    } else {
                        ball.vy = -ball.vy;
                    }
                    
                    // Return collision info for game logic to handle
                    return {
                        brick: brick,
                        row: row,
                        col: col,
                        brickType: brickTypes[brick.type]
                    };
                }
            }
        }
        
        return null; // No collision
    }

    // Check if ball is within explosion radius
    isInExplosionRadius(ballX, ballY, brickX, brickY, brickWidth, brickHeight, radius) {
        const brickCenterX = brickX + brickWidth / 2;
        const brickCenterY = brickY + brickHeight / 2;
        const distance = Math.sqrt(
            Math.pow(ballX - brickCenterX, 2) + 
            Math.pow(ballY - brickCenterY, 2)
        );
        
        return distance <= radius;
    }

    // Reset ball to paddle position
    resetBallToPaddle(ball, paddle) {
        ball.x = paddle.x + paddle.width / 2;
        ball.y = paddle.y - ball.radius - 1;
        ball.vx = 0;
        ball.vy = 0;
        ball.onPaddle = true;
    }

    // Launch ball from paddle
    launchBall(ball) {
        if (ball.onPaddle) {
            ball.onPaddle = false;
            ball.vx = (Math.random() - 0.5) * 4;
            ball.vy = -ball.speed;
            return true;
        }
        return false;
    }

    // Update ball position when on paddle
    updateBallOnPaddle(ball, paddle) {
        if (ball.onPaddle) {
            ball.x = paddle.x + paddle.width / 2;
        }
    }

    // Check power-up collision with paddle
    checkPowerUpCollision(powerUp, paddle) {
        return (powerUp.y + powerUp.height >= paddle.y &&
                powerUp.y <= paddle.y + paddle.height &&
                powerUp.x + powerUp.width >= paddle.x &&
                powerUp.x <= paddle.x + paddle.width);
    }

    // Update power-up position
    updatePowerUp(powerUp) {
        powerUp.y += powerUp.speed;
        
        // Return true if power-up is off screen
        return powerUp.y > this.CANVAS_HEIGHT;
    }

    // Get ball speed (magnitude of velocity vector)
    getBallSpeed(ball) {
        return Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    }

    // Set ball speed while maintaining direction
    setBallSpeed(ball, newSpeed) {
        const currentSpeed = this.getBallSpeed(ball);
        if (currentSpeed > 0) {
            const ratio = newSpeed / currentSpeed;
            ball.vx *= ratio;
            ball.vy *= ratio;
        }
    }

    // Normalize ball velocity to prevent it from getting too fast or slow
    normalizeBallVelocity(ball, minSpeed = 2, maxSpeed = 8) {
        const currentSpeed = this.getBallSpeed(ball);
        
        if (currentSpeed < minSpeed) {
            this.setBallSpeed(ball, minSpeed);
        } else if (currentSpeed > maxSpeed) {
            this.setBallSpeed(ball, maxSpeed);
        }
    }

    // Check if point is within canvas bounds
    isInBounds(x, y) {
        return x >= 0 && x <= this.CANVAS_WIDTH && y >= 0 && y <= this.CANVAS_HEIGHT;
    }

    // Get distance between two points
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}

// Create global physics instance
window.physics = new Physics();
