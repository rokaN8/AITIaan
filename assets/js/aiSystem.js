// AI Assistance System
// Handles player performance tracking and adaptive assistance

class AISystem {
    constructor() {
        this.playerMetrics = {
            ballsLost: 0,
            bricksHit: 0,
            totalBallBounces: 0,
            paddleHits: 0,
            paddleMisses: 0,
            timeSpentOnLevel: 0,
            consecutiveDeaths: 0,
            levelStartTime: Date.now(),
            lastBallLoss: 0,
            recentPerformance: [] // Track recent performance windows
        };
    }

    // Reset metrics for new level or game restart
    resetMetrics() {
        Object.keys(this.playerMetrics).forEach(key => {
            if (typeof this.playerMetrics[key] === 'number') {
                this.playerMetrics[key] = 0;
            }
        });
        this.playerMetrics.levelStartTime = Date.now();
        this.playerMetrics.recentPerformance = [];
    }

    // Calculate player accuracy
    calculateAccuracy() {
        const totalAttempts = this.playerMetrics.paddleHits + this.playerMetrics.paddleMisses;
        if (totalAttempts === 0) return 1.0;
        return this.playerMetrics.paddleHits / totalAttempts;
    }

    // Determine struggle level (0 = no struggle, 1 = struggling)
    getStruggleLevel() {
        const accuracy = this.calculateAccuracy();
        const timeSinceStart = Date.now() - this.playerMetrics.levelStartTime;
        const avgTimePerBrick = timeSinceStart / Math.max(1, this.playerMetrics.bricksHit);
        
        // Struggle indicators (simplified to binary system)
        if (this.playerMetrics.consecutiveDeaths >= 2 || accuracy < 0.6 || avgTimePerBrick > 10000) {
            return 1;
        }
        
        // No struggle
        return 0;
    }

    // Get current assistance level
    getAssistanceLevel() {
        return this.getStruggleLevel();
    }

    // Determine if helpful power-up should spawn
    shouldSpawnHelpfulPowerUp() {
        const struggleLevel = this.getStruggleLevel();
        const baseChance = 0.1;
        
        // Increase power-up chance based on struggle (simplified to binary system)
        switch(struggleLevel) {
            case 1: return Math.random() < baseChance * 2; // 20% chance
            default: return Math.random() < baseChance;    // 10% chance
        }
    }

    // Apply physics assistance to ball movement
    applyPhysicsAssistance(ball, paddle) {
        const assistanceLevel = this.getAssistanceLevel();
        
        if (assistanceLevel === 0) return; // No help needed
        
        // Subtle paddle magnetism for struggling players
        if (assistanceLevel >= 1 && !ball.onPaddle) {
            const paddleCenter = paddle.x + paddle.width / 2;
            const ballToPaddle = paddleCenter - ball.x;
            const distance = Math.abs(ballToPaddle);
            
            // Only apply if ball is reasonably close and moving toward paddle
            if (distance < 100 && ball.vy > 0 && ball.y > paddle.y - 100) {
                const magnetStrength = 0.15; // Fixed subtle assistance
                ball.vx += (ballToPaddle > 0 ? magnetStrength : -magnetStrength);
            }
        }
    }

    // Apply collision assistance for paddle hits
    applyCollisionAssistance(ball, paddle) {
        const assistanceLevel = this.getAssistanceLevel();
        
        if (assistanceLevel === 0) return false; // No help
        
        // Expand collision detection for struggling players
        const expansion = 4; // Fixed subtle assistance
        
        // Check expanded paddle collision
        if (ball.y + ball.radius >= paddle.y - expansion &&
            ball.y - ball.radius <= paddle.y + paddle.height + expansion &&
            ball.x + ball.radius >= paddle.x - expansion &&
            ball.x - ball.radius <= paddle.x + paddle.width + expansion) {
            
            // Only help if ball would have missed normally
            if (!(ball.y + ball.radius >= paddle.y &&
                  ball.y - ball.radius <= paddle.y + paddle.height &&
                  ball.x >= paddle.x &&
                  ball.x <= paddle.x + paddle.width)) {
                
                // Apply helpful bounce
                const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
                ball.vx = hitPos * 4;
                ball.vy = -Math.abs(ball.vy);
                
                if (Math.abs(ball.vy) < 3) {
                    ball.vy = -3;
                }
                
                ball.y = paddle.y - ball.radius;
                this.playerMetrics.paddleHits++;
                this.playerMetrics.totalBallBounces++;
                
                return true; // Assistance was applied
            }
        }
        
        return false;
    }

    // Record ball loss event
    recordBallLoss() {
        this.playerMetrics.ballsLost++;
        this.playerMetrics.paddleMisses++;
        
        const now = Date.now();
        if (now - this.playerMetrics.lastBallLoss < 5000) {
            this.playerMetrics.consecutiveDeaths++;
        } else {
            this.playerMetrics.consecutiveDeaths = 1;
        }
        this.playerMetrics.lastBallLoss = now;
    }

    // Record brick hit
    recordBrickHit() {
        this.playerMetrics.bricksHit++;
    }

    // Record paddle hit
    recordPaddleHit() {
        this.playerMetrics.paddleHits++;
        this.playerMetrics.totalBallBounces++;
    }

    // Record ball bounce
    recordBallBounce() {
        this.playerMetrics.totalBallBounces++;
    }

    // Start new level tracking
    startNewLevel() {
        this.playerMetrics.levelStartTime = Date.now();
    }

    // Get performance summary for debugging
    getPerformanceSummary() {
        return {
            accuracy: this.calculateAccuracy(),
            struggleLevel: this.getStruggleLevel(),
            assistanceLevel: this.getAssistanceLevel(),
            metrics: { ...this.playerMetrics }
        };
    }
}

// Create global AI system instance
window.aiSystem = new AISystem();
