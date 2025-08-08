# System Patterns

## Architecture Overview
**Single-file HTML5 Canvas game** with modular JavaScript architecture. Game loop pattern with separated update/render cycles, event-driven input handling, and rule-based AI system for adaptive difficulty.

## Key Design Patterns

### Game Loop Pattern
- **RequestAnimationFrame**: Smooth 60fps rendering
- **Delta time tracking**: Consistent timing across different frame rates
- **Separated concerns**: Update logic separate from rendering
- **State machine**: Clean transitions between waiting/playing/gameOver states

### Object-Oriented Game Entities
- **Game objects**: Paddle, ball, bricks, power-ups as structured objects
- **Component pattern**: Separate position, velocity, collision, and visual properties
- **Factory pattern**: Brick creation and power-up spawning

### AI Assistance System
- **Strategy pattern**: Different assistance levels with specific behaviors
- **Observer pattern**: Performance metrics tracking player actions
- **Rule-based logic**: Conditional assistance based on performance thresholds

## Component Relationships

### Core Game Loop
```
gameLoop() → update() → render() → requestAnimationFrame()
    ↓
update() calls:
- handleInput()
- updatePaddle()
- updateBall() → applyPhysicsAssistance()
- updatePowerUps()
- updateParticles()
- updateScreenShake()
- updateStars()
```

### Sound System Integration
```
Game Events → Sound Manager → Web Audio API/HTML5 Audio → Audio Output
    ↓
Sound Events:
- Brick Hit → playBrickHit() → Low-frequency thump
- Brick Break → playBrickBreak() → High-frequency glass shatter
- Life Lost → playLifeLost() → Violin screech sweep
- Explosion → playExplosion() → External MP3 explosion sound
- Sound Toggle → toggleSound() → Enable/disable all effects
```

### Explosion System Integration
```
"B" Key Press → explodeBall() → Radius Calculation → Brick Destruction → Visual/Audio Effects
    ↓
Explosion Process:
1. Check game state (playing, ball not on paddle)
2. Play explosion sound (assets/audio/explosion.mp3)
3. Create 25 explosion particles with red/orange colors
4. Apply intense screen shake (8 intensity, 400ms duration)
5. Calculate 180-pixel radius from ball position
6. Destroy all bricks within radius and award points
7. Check level completion before losing life
8. Apply life cost or advance to next level
```

### Developer Mode System Integration
```
"D" Key Press → activateDeveloperMode() → Game State Reset → createDeveloperLevel() → Testing Environment
    ↓
Developer Mode Process:
1. Set developerMode flag to true
2. Reset game state (lives=3, score=0, waiting state)
3. Reset all metrics and power-ups
4. Create full brick layout then randomly select 5 visible bricks
5. Reset ball to paddle position
6. Hide game over screen if visible
7. Provide console logging for debug feedback
8. Prevent high score saving when game ends
```

### AI System Integration
```
Player Actions → Performance Metrics → Struggle Analysis → Assistance Level
    ↓
Assistance Applied:
- Physics magnetism (subtle ball attraction)
- Collision expansion (larger paddle hit area)
- Power-up frequency (increased spawn rates)
```

### Collision Detection Chain
```
Ball Movement → Wall Collisions → Paddle Collision → Brick Collisions
    ↓
Each collision:
1. Check AI assistance first
2. Apply normal physics if no assistance
3. Update metrics and visual effects
```

## Data Flow

### Performance Tracking
```
Game Events → playerMetrics object → AI Analysis Functions → Assistance Decisions
    ↓
Metrics tracked:
- ballsLost, bricksHit, paddleHits/Misses
- consecutiveDeaths, timeSpentOnLevel
- Real-time accuracy calculations
```

### Visual Effects Pipeline
```
Game Events → Effect Triggers → Particle/Shake Systems → Render Loop
    ↓
Effects include:
- Particle explosions on brick destruction
- Screen shake on impacts and power-ups
- Glowing effects on all game elements
```

## Critical Implementation Paths

### AI Assistance Decision Tree
1. **calculateAccuracy()** - Determines hit/miss ratio
2. **getStruggleLevel()** - Analyzes multiple struggle indicators
3. **applyPhysicsAssistance()** - Subtle ball magnetism
4. **applyCollisionAssistance()** - Expanded paddle collision
5. **shouldSpawnHelpfulPowerUp()** - Increased power-up frequency

### Game State Management
1. **'waiting'** - Ball on paddle, space to launch
2. **'playing'** - Active gameplay with physics
3. **'gameOver'** - Display final score, restart option

### Power-up System Flow
1. **Brick destruction** → **AI spawn decision** → **Power-up creation**
2. **Falling animation** → **Paddle collision** → **Effect application**
3. **Timer management** → **Effect removal** → **Visual cleanup**

## Design Decisions

### Single File Architecture
- **Rationale**: Maximum portability and simplicity
- **Trade-off**: Larger file size vs. zero dependencies
- **Benefit**: Instant playability without setup

### Rule-based AI vs Machine Learning
- **Rationale**: Predictable, debuggable, no external dependencies
- **Implementation**: Conditional logic based on performance thresholds
- **Advantage**: Transparent assistance that feels natural

### Canvas vs DOM/CSS
- **Rationale**: Better performance for 60fps gameplay
- **Benefits**: Pixel-perfect control, efficient particle systems
- **Trade-off**: More complex rendering code vs. better performance

## Integration Points

### Browser APIs Used
- **HTML5 Canvas**: Core rendering and game display
- **RequestAnimationFrame**: Smooth animation timing
- **Event listeners**: Keyboard and mouse input handling
- **No external services**: Completely self-contained

### Input System Integration
- **Keyboard events**: Arrow keys for paddle movement
- **Mouse events**: Alternative paddle control
- **Event prevention**: Stops default browser behaviors
- **State switching**: Mouse/keyboard mode detection

## Supernatural Brick System (v1.9.0)

### Enhanced Brick Type Definition
```javascript
const brickTypes = {
    // Regular bricks
    white: { hits: 1, points: 10, color: '#ffffff' },
    lightGray: { hits: 1, points: 20, color: '#cccccc' },
    darkGray: { hits: 2, points: 30, color: '#666666' },
    bloodRed: { hits: 2, points: 40, color: '#cc0000' },
    // Supernatural bricks
    ghost: { hits: 1, points: 50, color: '#88ccff', special: 'ghost' },
    vampire: { hits: 2, points: 60, color: '#660033', special: 'vampire' }
};
```

### Special Brick Properties
```javascript
// Ghost brick additional properties
{
    phaseTimer: number,      // Phase cycle timing
    isPhased: boolean,       // Current phase state
    floatOffset: number      // Floating animation offset
}

// Vampire brick additional properties
{
    regenerationTimer: number,  // Regeneration timing
    lastRegenTime: number      // Last regeneration timestamp
}
```

### Supernatural Systems Integration
```
Level Creation → Special Brick Spawning (15% chance from level 3+)
    ↓
Ghost Bricks: Phase Cycle (3s visible, 2s invisible) + Floating Animation
Vampire Bricks: Health Regeneration (every 8s) + Pulsing Effects
    ↓
Enhanced Collision Detection → Skip Phased Ghost Bricks
Special Rendering → Transparency, Glows, Animations
```

### Ball Trail System
```javascript
// Trail particle structure
{
    x: number, y: number,           // Position
    vx: number, vy: number,         // Velocity with gravity
    life: number, decay: number,    // Fade lifecycle
    color: string,                  // Random sparkle color
    size: number,                   // Particle size
    twinkle: number,                // Twinkle animation phase
    twinkleSpeed: number            // Twinkle rate
}
```

### Trail Particle Flow
```
Ball Movement → createBallTrail() → Sparkle Generation → updateBallTrail() → Render with Twinkle
    ↓
Performance Limits: Max 50 particles, automatic cleanup, gravity effects
Colors: ['#ffffff', '#ffdd00', '#88ccff', '#cc88ff'] (white, gold, cyan, purple)
```

## Performance Considerations

### Rendering Optimizations
- **Object pooling**: Reuse particle objects to reduce garbage collection
- **Efficient collision detection**: Early exits and bounding box checks
- **Minimal DOM manipulation**: Canvas rendering vs. DOM updates
- **Shadow/glow effects**: Applied efficiently without performance impact
- **Particle limits**: Ball trail capped at 50 particles for performance
- **Special brick updates**: Efficient timer-based phase and regeneration cycles

### Memory Management
- **Particle cleanup**: Remove expired particles from arrays
- **Power-up cleanup**: Remove off-screen power-ups
- **Event listener management**: Proper cleanup to prevent memory leaks
- **State reset**: Clean object reinitialization on game restart
- **Trail particle management**: Automatic array splicing when limit exceeded
- **Special brick state**: Proper timer reset and property initialization

---
*This architecture successfully balances performance, maintainability, and feature richness while maintaining the constraint of a single HTML file.*
