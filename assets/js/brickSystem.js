// Brick System
// Handles brick creation, special brick behaviors, and level generation

class BrickSystem {
    constructor() {
        this.BRICK_WIDTH = 83;
        this.BRICK_HEIGHT = 22;
        this.BRICK_ROWS = 6;
        this.BRICK_COLS = 9;
        this.BRICK_PADDING = 6;
        this.BRICK_OFFSET_TOP = 66;
        this.BRICK_OFFSET_LEFT = 39;
        
        this.brickTypes = {
            white: { hits: 1, points: 10, color: '#ffffff' },
            lightGray: { hits: 1, points: 20, color: '#cccccc' },
            darkGray: { hits: 2, points: 30, color: '#666666' },
            bloodRed: { hits: 2, points: 40, color: '#cc0000' },
            ghost: { hits: 1, points: 50, color: '#88ccff', special: 'ghost' },
            vampire: { hits: 2, points: 60, color: '#660033', special: 'vampire' }
        };
    }

    // Create level with bricks
    createLevel(levelNum) {
        const bricks = [];
        const regularTypes = ['white', 'lightGray', 'darkGray', 'bloodRed'];
        const specialTypes = ['ghost', 'vampire'];
        
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            bricks[row] = [];
            for (let col = 0; col < this.BRICK_COLS; col++) {
                let type;
                
                // Determine brick type based on level and position
                if (levelNum >= 1 && Math.random() < 0.15) {
                    // 15% chance for special bricks from level 1+
                    type = specialTypes[Math.floor(Math.random() * specialTypes.length)];
                } else {
                    // Regular brick progression
                    const typeIndex = Math.min(row, regularTypes.length - 1);
                    type = regularTypes[typeIndex];
                }
                
                const brick = {
                    x: col * (this.BRICK_WIDTH + this.BRICK_PADDING) + this.BRICK_OFFSET_LEFT,
                    y: row * (this.BRICK_HEIGHT + this.BRICK_PADDING) + this.BRICK_OFFSET_TOP,
                    width: this.BRICK_WIDTH,
                    height: this.BRICK_HEIGHT,
                    type: type,
                    hits: this.brickTypes[type].hits,
                    maxHits: this.brickTypes[type].hits,
                    visible: true
                };
                
                // Add special properties for supernatural bricks
                if (this.brickTypes[type].special === 'ghost') {
                    brick.phaseTimer = 0;
                    brick.isPhased = false;
                    brick.floatOffset = Math.random() * Math.PI * 2;
                } else if (this.brickTypes[type].special === 'vampire') {
                    brick.regenerationTimer = 0;
                    brick.lastRegenTime = Date.now();
                }
                
                bricks[row][col] = brick;
            }
        }
        
        return bricks;
    }

    // Create developer level with only 5 random bricks
    createDeveloperLevel() {
        // First create a full level
        const bricks = this.createLevel(1);
        
        // Get all brick positions
        const allBricks = [];
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                allBricks.push({ row, col });
            }
        }
        
        // Shuffle the array to randomize selection
        for (let i = allBricks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allBricks[i], allBricks[j]] = [allBricks[j], allBricks[i]];
        }
        
        // Hide all bricks first
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                bricks[row][col].visible = false;
            }
        }
        
        // Show only the first 5 random bricks
        for (let i = 0; i < Math.min(5, allBricks.length); i++) {
            const { row, col } = allBricks[i];
            bricks[row][col].visible = true;
        }
        
        return bricks;
    }

    // Update special bricks (ghost phasing, vampire regeneration)
    updateSpecialBricks(bricks) {
        const now = Date.now();
        
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                const brick = bricks[row][col];
                if (!brick.visible) continue;
                
                // Update ghost bricks
                if (this.brickTypes[brick.type].special === 'ghost') {
                    brick.phaseTimer += 16; // Assuming 60fps
                    brick.floatOffset += 0.02;
                    
                    // Phase cycle: 3 seconds visible, 2 seconds invisible
                    const cycleTime = 5000; // 5 seconds total
                    const visibleTime = 3000; // 3 seconds visible
                    
                    const cyclePosition = brick.phaseTimer % cycleTime;
                    brick.isPhased = cyclePosition > visibleTime;
                }
                
                // Update vampire bricks
                else if (this.brickTypes[brick.type].special === 'vampire') {
                    brick.regenerationTimer += 16;
                    
                    // Regenerate 1 hit point every 8 seconds if not at max health
                    if (brick.regenerationTimer >= 8000 && brick.hits < brick.maxHits) {
                        brick.hits++;
                        brick.regenerationTimer = 0;
                        
                        // Create blood drip particles
                        window.visualEffects.createVampireRegenParticles(
                            brick.x + brick.width / 2, 
                            brick.y + brick.height
                        );
                    }
                }
            }
        }
    }

    // Check if level is complete
    isLevelComplete(bricks) {
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                if (bricks[row][col].visible) {
                    return false;
                }
            }
        }
        return true;
    }

    // Handle brick hit (damage and destruction)
    hitBrick(brick, collision) {
        brick.hits--;
        window.aiSystem.recordBrickHit();
        
        let points = 0;
        let destroyed = false;
        
        if (brick.hits <= 0) {
            brick.visible = false;
            points = this.brickTypes[brick.type].points;
            destroyed = true;
            
            // Play glass shattering sound for brick break
            window.soundManager.playBrickBreak();
            
            // Create particles
            window.visualEffects.createParticles(
                brick.x + brick.width / 2, 
                brick.y + brick.height / 2, 
                this.brickTypes[brick.type].color
            );
            
            // Screen shake
            window.visualEffects.addScreenShake(2, 100);
        } else {
            // Play dull thump sound for brick hit (not destroyed)
            window.soundManager.playBrickHit();
        }
        
        return { points, destroyed };
    }

    // Get bricks within explosion radius
    getBricksInExplosionRadius(ballX, ballY, radius, bricks) {
        const destroyedBricks = [];
        let totalPoints = 0;
        
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                const brick = bricks[row][col];
                if (!brick.visible) continue;
                
                // Calculate distance from explosion center to brick center
                const brickCenterX = brick.x + brick.width / 2;
                const brickCenterY = brick.y + brick.height / 2;
                const distance = Math.sqrt(
                    Math.pow(ballX - brickCenterX, 2) + 
                    Math.pow(ballY - brickCenterY, 2)
                );
                
                // Destroy brick if within explosion radius
                if (distance <= radius) {
                    brick.visible = false;
                    totalPoints += this.brickTypes[brick.type].points;
                    destroyedBricks.push({
                        brick: brick,
                        centerX: brickCenterX,
                        centerY: brickCenterY
                    });
                    
                    // Create particles for each destroyed brick
                    window.visualEffects.createParticles(
                        brickCenterX, 
                        brickCenterY, 
                        this.brickTypes[brick.type].color
                    );
                }
            }
        }
        
        // Update AI metrics
        window.aiSystem.playerMetrics.bricksHit += destroyedBricks.length;
        
        return { destroyedBricks, totalPoints };
    }

    // Draw bricks on canvas
    drawBricks(ctx, bricks) {
        for (let row = 0; row < this.BRICK_ROWS; row++) {
            for (let col = 0; col < this.BRICK_COLS; col++) {
                const brick = bricks[row][col];
                if (!brick.visible) continue;
                
                let alpha = brick.hits / brick.maxHits;
                const color = this.brickTypes[brick.type].color;
                let brickY = brick.y;
                
                // Special rendering for ghost bricks
                if (this.brickTypes[brick.type].special === 'ghost') {
                    // Floating animation
                    brickY += Math.sin(brick.floatOffset) * 3;
                    
                    // Phase in/out effect
                    if (brick.isPhased) {
                        alpha *= 0.2; // Very transparent when phased
                    } else {
                        alpha *= 0.7; // Semi-transparent when visible
                    }
                    
                    // Add ethereal glow
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 15;
                }
                
                // Special rendering for vampire bricks
                else if (this.brickTypes[brick.type].special === 'vampire') {
                    // Pulsing effect when regenerating
                    if (brick.regenerationTimer > 7000) { // Last second before regen
                        const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
                        alpha *= pulse;
                        
                        // Add red glow when regenerating
                        ctx.shadowColor = '#cc0000';
                        ctx.shadowBlur = 10;
                    }
                }
                
                ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                ctx.fillRect(brick.x, brickY, brick.width, brick.height);
                
                // Reset shadow
                ctx.shadowBlur = 0;
                
                // Add border
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.strokeRect(brick.x, brickY, brick.width, brick.height);
            }
        }
    }

    // Get brick type definition
    getBrickType(typeName) {
        return this.brickTypes[typeName];
    }

    // Get all brick types
    getAllBrickTypes() {
        return { ...this.brickTypes };
    }
}

// Create global brick system instance
window.brickSystem = new BrickSystem();
