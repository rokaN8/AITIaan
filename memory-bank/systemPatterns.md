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

## Performance Considerations

### Rendering Optimizations
- **Object pooling**: Reuse particle objects to reduce garbage collection
- **Efficient collision detection**: Early exits and bounding box checks
- **Minimal DOM manipulation**: Canvas rendering vs. DOM updates
- **Shadow/glow effects**: Applied efficiently without performance impact

### Memory Management
- **Particle cleanup**: Remove expired particles from arrays
- **Power-up cleanup**: Remove off-screen power-ups
- **Event listener management**: Proper cleanup to prevent memory leaks
- **State reset**: Clean object reinitialization on game restart

---
*This architecture successfully balances performance, maintainability, and feature richness while maintaining the constraint of a single HTML file.*
