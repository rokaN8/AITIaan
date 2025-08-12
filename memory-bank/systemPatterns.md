# System Patterns

## Architecture Overview
**Modular HTML5 Canvas game** with 7 specialized JavaScript modules and extracted CSS. Features comprehensive game loop pattern with separated update/render cycles, event-driven input handling, and rule-based AI system for adaptive difficulty. Organized asset management with structured folder hierarchy.

## Key Design Patterns

### **Modular Architecture Pattern**
- **Module Separation**: 7 specialized JavaScript modules with clear responsibilities
- **Dependency Management**: Modules communicate through global window object and direct references
- **Asset Organization**: Structured folders (audio, css, font, js, sprites) for maintainability
- **CSS Extraction**: Complete styling system separated from HTML structure

### **Game Loop Pattern**
- **RequestAnimationFrame**: Smooth 60fps rendering with consistent timing
- **Delta time independence**: Consistent behavior across different frame rates
- **Separated concerns**: Update logic completely separate from rendering
- **State machine**: Clean transitions between waiting/playing/paused/gameOver states
- **Explosion state management**: Delayed state changes with visual effect timing

### **Object-Oriented Game Entities**
- **Game objects**: Paddle, balls array, bricks, power-ups as structured objects
- **Component pattern**: Separate position, velocity, collision, and visual properties
- **Factory pattern**: Brick creation, power-up spawning, and particle generation
- **Multi-ball support**: Independent physics and collision for multiple ball entities

### **AI Assistance System**
- **Strategy pattern**: Different assistance levels (none/subtle/active) with specific behaviors
- **Observer pattern**: Performance metrics tracking all player actions
- **Rule-based logic**: Conditional assistance based on performance thresholds
- **Non-intrusive help**: Physics magnetism and collision expansion feel natural

## Component Relationships

### **Core Game Loop Integration**
```
GameLogic.gameLoop() → update() → render() → requestAnimationFrame()
    ↓
update() coordinates:
- physics.updatePaddle() → Paddle movement and positioning
- physics.updateBall() → Ball physics for each ball in array
- brickSystem.updateSpecialBricks() → Ghost phasing, vampire regeneration
- powerUpSystem.update() → Power-up effects and timer management
- visualEffects.update() → Particles, screen shake, floating ghosts
- aiSystem performance tracking → Assistance level calculation
```

### **Modular System Communication**
```
gameLogic.js (Coordinator)
├── physics.js → Ball/paddle physics, collision detection
├── brickSystem.js → Brick management, special types, level generation
├── powerUpSystem.js → Power-up spawning, effects, timer display
├── visualEffects.js → Particles, screen shake, floating ghosts, stars
├── soundManager.js → Audio system, music, sound effects
├── aiSystem.js → Performance tracking, assistance calculation
└── styles.css → Complete visual styling system
```

### **Sound System Integration**
```
Game Events → SoundManager → Audio APIs → Audio Output
    ↓
Audio Sources:
- MP3 Files: background.mp3, explosion.mp3, endgame.mp3, ghostsound.mp3
- Web Audio API: Synthesized brick hits, breaks, life lost sounds
- State Management: Background music continues during pause
- Volume Control: Balanced levels across all audio sources
```

### **Explosion System Integration**
```
"B" Key Press → explodeBall() → Multi-Ball Support → Radius Calculation → Visual/Audio Effects
    ↓
Enhanced Explosion Process:
1. Check game state (playing, balls not on paddle)
2. Create explosions at ALL ball positions (multi-ball support)
3. Play explosion sound (assets/audio/explosion.mp3)
4. Generate 25 particles per ball with red/orange colors
5. Apply intense screen shake (12 intensity, 600ms duration)
6. Calculate 180-pixel radius from each ball position
7. Destroy all bricks within any radius and award points
8. Set explosion state with 1-second delay for visual effects
9. Check level completion before applying life cost
10. Execute callback: advance level or lose life
```

### **Developer Mode System Integration**
```
"D" Key Press → toggleDeveloperMode() → Visual Indicator → Enhanced Controls
    ↓
Developer Mode Features:
- Visual "DEV MODE" indicator on canvas with control hints
- "+/-" Keys → adjustLives() → Live adjustment (1-10 range) with UI updates
- "[/]" Keys → adjustLevel() → Level difficulty (1-99) with automatic recreation
- Full level layouts instead of limited brick testing setup
- Console logging for all developer actions and state changes
- High score protection (developer mode scores don't affect leaderboard)
```

### **AI System Integration**
```
Player Actions → Performance Metrics → Struggle Analysis → Assistance Level → Physics Modifications
    ↓
AI Assistance Pipeline:
- Performance tracking: accuracy, consecutive deaths, time per level
- Struggle detection: Multiple metrics combined for assistance level
- Physics assistance: Subtle ball magnetism toward paddle
- Collision assistance: Expanded paddle hit detection area
- Power-up assistance: Increased spawn frequency for struggling players
- Natural feel: All assistance designed to feel like "lucky breaks"
```

### **Multi-Ball Physics Integration**
```
Ball Array Management → Independent Physics → Collision Detection → Life Management
    ↓
Multi-Ball System:
- balls[] array maintains all active balls with independent physics
- Each ball has separate collision detection with paddle and bricks
- Ball trail system supports multiple balls with increased particle limit
- Life loss only occurs when ALL balls fall off screen
- Explosion system creates effects at ALL ball positions
- Main ball reference maintained for paddle positioning
```

### **Collision Detection Chain**
```
Ball Movement → Wall Collisions → Paddle Collision → Brick Collisions → Special Brick Logic
    ↓
Enhanced Collision System:
1. AI assistance check first (magnetism, expanded collision)
2. Wall boundary collision with proper reflection
3. Paddle collision with angle-based deflection
4. Brick collision with special type handling:
   - Ghost bricks: Skip if phased out
   - Vampire bricks: Health regeneration logic
   - Explosion bricks: Radius destruction
5. Visual and audio feedback for all collision types
```

## Data Flow Patterns

### **Performance Tracking Flow**
```
Game Events → playerMetrics object → AI Analysis Functions → Assistance Decisions
    ↓
Comprehensive Metrics:
- ballsLost, bricksHit, paddleHits/Misses for accuracy calculation
- consecutiveDeaths, timeSpentOnLevel for struggle detection
- Real-time performance analysis with assistance level adjustment
- Non-obvious help through physics tweaks and power-up spawning
```

### **Visual Effects Pipeline**
```
Game Events → Effect Triggers → Particle/Shake Systems → Render Integration
    ↓
Comprehensive Effects:
- Particle explosions: Brick destruction, bomb explosions, vampire regeneration
- Screen shake: Impacts, power-ups, explosions with varying intensity
- Ball trails: Magical sparkles with twinkling effects and gravity
- Floating ghosts: Full-page DOM elements with directional rotation
- Background elements: Twinkling stars, atmospheric forest background
```

### **Power-Up System Flow**
```
Brick Destruction → AI Spawn Decision → Power-Up Creation → Collection → Effect Application
    ↓
Power-Up Pipeline:
1. 20% base spawn chance, increased by AI for struggling players
2. Falling animation with collision detection
3. Paddle collection triggers effect and visual feedback
4. Timer management with visual display in leaderboard
5. Effect application: Wide Paddle, Slow Ball, or Multiball
6. Automatic cleanup when effects expire
```

## Critical Implementation Paths

### **Modular Initialization Sequence**
1. **HTML loads** → Module scripts loaded in dependency order
2. **GameLogic.init()** → Canvas setup, system initialization
3. **SoundManager.init()** → Audio context and sound system setup
4. **Game object creation** → Paddle, ball, bricks with proper references
5. **Event listener setup** → Keyboard, mouse, UI button handlers
6. **Game loop start** → RequestAnimationFrame cycle begins
7. **UI updates** → Leaderboard, legend panel, control instructions

### **Level Progression System**
1. **Level completion check** → All destructible bricks destroyed
2. **Level advancement** → Increment level, reset lives to 3
3. **Brick generation** → New layout with increased difficulty
4. **Special brick spawning** → Ghost/vampire bricks from level 1+
5. **Ball reset** → Return to paddle, waiting state
6. **Bonus scoring** → 100 points for level completion

### **Game State Management**
1. **'waiting'** - Ball on paddle, space to launch, paddle movement allowed
2. **'playing'** - Active gameplay with full physics and systems
3. **'paused'** - Game frozen, background music continues
4. **'gameOver'** - Score submission, spooky face display, restart options
5. **'explosion'** - Special state for bomb explosion visual effects

### **Asset Loading and Error Handling**
1. **Image preloading** → Background, face, ghost sprites with error fallbacks
2. **Audio loading** → MP3 files with graceful degradation if unavailable
3. **Font loading** → ScaryFont with fallback to system fonts
4. **Error recovery** → Graceful fallbacks maintain functionality

## Design Decisions

### **Modular Architecture Benefits**
- **Maintainability**: Clear separation of concerns across 7 modules
- **Extensibility**: Easy to add new features without affecting existing systems
- **Debugging**: Isolated systems easier to test and troubleshoot
- **Performance**: Efficient loading and execution with organized structure

### **Multi-Ball vs Single Ball**
- **Implementation**: Array-based system supporting 1-N balls
- **Physics**: Independent collision detection and movement for each ball
- **User experience**: Only lose life when ALL balls are lost
- **Performance**: Optimized trail system and collision detection

### **AI Assistance Philosophy**
- **Subtle over obvious**: Physics tweaks feel more natural than direct intervention
- **Performance-based**: Assistance triggered by actual struggle, not arbitrary timing
- **Graduated response**: Three assistance levels provide appropriate help
- **Preservation of challenge**: Skilled players receive no unwanted assistance

### **Audio System Design**
- **Hybrid approach**: MP3 files for rich atmosphere, Web Audio API for responsive effects
- **Atmospheric continuity**: Background music continues during pause
- **Performance optimization**: Efficient audio context management
- **User control**: Complete sound toggle with visual feedback

## Integration Points

### **Browser APIs Utilized**
- **HTML5 Canvas**: Core rendering with 2D context for all visual elements
- **RequestAnimationFrame**: Smooth animation timing and game loop
- **Web Audio API**: Synthesized sound effects with proper context management
- **HTML5 Audio**: MP3 file playback for atmospheric music and effects
- **LocalStorage**: Persistent high score data with error handling
- **DOM Events**: Keyboard, mouse, and UI interaction handling

### **Cross-Module Communication**
- **Global references**: window object provides module access
- **Direct method calls**: Modules call each other's public methods
- **Shared state**: Game objects accessible across relevant modules
- **Event coordination**: Centralized event handling in gameLogic module

### **Performance Optimization Patterns**
- **Object pooling**: Particle systems reuse objects to reduce garbage collection
- **Efficient rendering**: Canvas state management with save/restore
- **Memory cleanup**: Proper cleanup of expired particles, power-ups, effects
- **Frame rate targeting**: 60fps maintained with complex visual systems

## Enhanced System Features

### **Legend Panel Integration**
```
UI System → Legend Panel → Animated Icons → User Guidance
    ↓
Legend Features:
- Right-side panel with power-up and special block descriptions
- Animated icons matching in-game visual effects
- Real-time visual guidance for complex game mechanics
- Integrated with overall spooky theme and typography
```

### **Leaderboard System Integration**
```
Score Events → High Score Check → Name Entry → LocalStorage → UI Update
    ↓
Leaderboard Features:
- Top 10 persistent scores with localStorage backup
- 3-character name entry with validation
- Automatic ranking and placeholder display
- Reset functionality separate from game reset
- Error handling and data migration support
```

### **Floating Ghost System**
```
DOM Management → CSS Positioning → Directional Rotation → Opacity Management
    ↓
Ghost System Features:
- 8 large ghosts (80-140px) with full webpage coverage
- Directional rotation using Math.atan2 for realistic movement
- Smart opacity reduction when overlapping game area
- Random ghost sounds every 25+ seconds for atmosphere
- Efficient DOM-based rendering with automatic cleanup
```

---
*This modular architecture successfully balances performance, maintainability, and feature richness while supporting complex atmospheric effects, intelligent AI assistance, and comprehensive gameplay systems.*
