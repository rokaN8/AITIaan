# Changelog

All notable changes to Spooky Breakout will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0] - 2025-08-08

### Added
- **Enhanced developer mode controls** for level navigation using +/- keys
- **Developer mode life management** with [ and ] keys (0-10 lives range)
- **Improved debugging capabilities** for gameplay testing and balancing
- **Full level layouts** available in developer mode for comprehensive testing

### Changed
- **Special bricks appearance level** - now appear from level 2 instead of level 3 (15% chance)
- **UI instructions updated** to include new developer mode controls
- **Developer mode functionality** expanded beyond basic 5-brick testing

### Technical Details
- **Level navigation system**: +/- keys change levels in developer mode with full brick layouts
- **Life adjustment system**: [ and ] keys modify lives with bounds checking (0-10 range)
- **Enhanced testing environment**: Full level generation instead of limited 5-brick setup
- **Console logging**: Debug feedback for level changes and life adjustments
- **Game balance improvement**: Earlier special brick introduction for better progression

## [1.9.0] - 2025-08-08

### Added
- **Ghost Bricks**: Semi-transparent supernatural bricks that phase in/out every 5 seconds (3s visible, 2s invisible)
- **Vampire Bricks**: Dark red/purple bricks that regenerate health every 8 seconds if damaged below maximum
- **Magical Ball Trail**: Continuous sparkle particles with twinkling effects in multiple colors (white, gold, cyan, purple)
- **Enhanced Collision System**: Ball passes through phased-out ghost bricks completely
- **Special Visual Effects**: Floating ghost bricks with ethereal glow, pulsing vampire bricks when regenerating
- **Blood Drip Particles**: Visual effects when vampire bricks regenerate health
- **Progressive Difficulty**: 15% chance for special bricks from level 3+ onwards for natural progression
- **Balanced Scoring**: Higher point values for supernatural bricks (50 for ghost, 60 for vampire)

### Changed
- **Brick Type System**: Extended to support special properties and behaviors for supernatural bricks
- **Level Generation**: Enhanced algorithm to include special brick spawning with progressive difficulty
- **Particle Systems**: Added separate ball trail particle system with gravity effects and performance limits
- **Rendering Pipeline**: Enhanced to handle transparency, glows, floating animations, and special effects
- **Update Loop**: Added updateBallTrail() and updateSpecialBricks() functions for new systems

### Technical
- **Performance Optimization**: Ball trail particles limited to 50 maximum with automatic cleanup
- **Memory Management**: Efficient particle lifecycle management with proper array splicing
- **Visual Effects**: Twinkle animations, ethereal glows, and pulsing effects maintain 60fps performance
- **Code Architecture**: Clean separation of regular and supernatural brick logic
- **Collision Detection**: Enhanced to skip phased-out ghost bricks while maintaining accuracy

### Fixed
- **Collision Accuracy**: Ghost bricks properly phase out of collision detection when invisible
- **Performance**: Particle systems optimized to prevent memory leaks and maintain smooth gameplay
- **Visual Consistency**: All supernatural effects integrated seamlessly with existing spooky theme

## [1.8.0] - 2025-08-08

### Added
- **Developer mode testing system** activated by "D" key for quick endgame scenario testing
- **Isolated testing environment** with 5 randomly selected bricks and 3 lives for rapid testing
- **High score protection** prevents developer mode scores from affecting leaderboard integrity
- **Clear visual feedback** with "DEVELOPER MODE - NO SCORE SAVED" warning message on game over
- **Random brick selection algorithm** provides varied testing scenarios on each activation
- **UI integration** with developer mode instruction added to control panel
- **Console logging** provides debug feedback for development workflow

### Changed
- **Game over screen enhancement** - dynamic content based on developer mode state
- **High score system modification** - conditional high score checking excludes developer mode
- **Game restart behavior** - developer mode flag properly reset on game restart
- **Testing workflow improvement** - enhanced capabilities for testing explosion mechanics, AI assistance, and power-ups

### Technical Details
- **Developer mode state management**: Boolean flag tracks developer mode activation
- **Random brick distribution**: Algorithm shuffles all brick positions and selects first 5 for visibility
- **Score system isolation**: Developer mode scores completely separated from legitimate gameplay
- **State persistence**: Developer mode persists until manual game restart
- **Debug integration**: Console logging confirms activation and provides development feedback
- **UI responsiveness**: Instructions panel updated to include developer mode control

## [1.7.0] - 2025-08-08

### Added
- **Explosion powerup feature** triggered by "B" key during active gameplay
- **180-pixel explosion radius** that destroys all bricks within range (doubled from initial 90px)
- **Strategic risk/reward mechanic** - explosion costs a life but can complete levels on 0 lives
- **Enhanced visual effects** with 25 explosion particles in red/orange colors and intense screen shake
- **Explosion sound integration** using `assets/audio/explosion.mp3` with high volume (0.8)
- **Life cost warning** prominently displayed in instructions: "Press B to explode ball (costs a life!)"

### Changed
- **UI reorganization** - instructions moved from below game to leaderboard sidebar for better layout
- **Instruction format** - converted to clean bullet-point format with each control on separate line
- **Enhanced game logic** - level completion check occurs before life loss, allowing victory on 0 lives
- **Sound system expansion** - added explosion sound to existing audio architecture
- **Strategic gameplay** - explosion provides powerful area-of-effect brick clearing for difficult situations

### Technical Details
- **Explosion mechanics**: Radius-based brick destruction with distance calculation from ball center
- **Particle system enhancement**: 25 explosion particles with varied colors and enhanced decay
- **Screen shake intensification**: 8 intensity, 400ms duration for dramatic explosion feedback
- **Audio integration**: Explosion sound properly integrated with sound toggle functionality
- **Game state management**: Smart level completion logic prevents unfair game over scenarios
- **UI layout optimization**: Instructions positioned in leaderboard sidebar with proper styling

## [1.3.0] - 2025-08-08

### Added
- **Hybrid audio system** combining external MP3 files with Web Audio API programmatic sounds
- **Background ambient music** from `assets/audio/background.mp3` with looping and volume control (0.3)
- **Dramatic end game sound** from `assets/audio/endgame.mp3` for frightening climax (0.7 volume)
- **Spooky game over image** from `assets/sprites/face.png` that replaces entire canvas on game over
- **Image preloading system** with proper error handling and loading state management
- **Multi-file architecture** with organized asset folder structure (HTML + assets)
- **Audio timing coordination** - background music starts on ball launch, stops on game over

### Changed
- **Architecture transition** from single-file to multi-file distribution with asset dependencies
- **Game over experience** now features dramatic visual shock with full-canvas face image
- **Audio experience** enhanced with rich external audio files alongside existing sound effects
- **Distribution method** now requires HTML file + assets folder for complete experience

### Technical Details
- **HTML5 Audio API integration** for external MP3 file playback with volume control
- **Image loading management** with preload, error handling, and state tracking
- **Canvas rendering enhancement** for full-screen image display during game over
- **Asset organization** with logical folder structure for audio and sprite files
- **Performance maintained** - 60fps gameplay preserved with additional audio and image processing

## [1.2.0] - 2025-08-08

### Added
- **Spooky sound system** with Web Audio API-based programmatic sound generation
- **Three atmospheric sound effects**: Dull thump (brick hit), glass shattering (brick break), high-pitch violin screech (life lost)
- **Sound toggle controls** with visual button (🔊/🔇) and M key shortcut for quick muting
- **Graceful audio fallback** for browsers without Web Audio API support
- **Performance-optimized audio** maintaining 60fps gameplay with sound processing

### Changed
- **Background music removed** per user preference - now features event-based sound effects only
- **Sound integration** seamlessly woven into existing game events and collision system
- **Version updated** to 1.2.0 to reflect sound system addition

### Technical Details
- **Web Audio API implementation**: Oscillators, gain nodes, and filters for realistic sound synthesis
- **Zero external dependencies**: All sounds generated programmatically, no audio files required
- **Efficient audio processing**: Sounds created on-demand without memory leaks
- **Cross-browser compatibility**: Maintains compatibility with graceful degradation
- **Single-file architecture preserved**: Audio system integrated without breaking portability

## [1.1.0] - 2025-08-08

### Added
- **Moving starry background** with 75 twinkling white stars that scroll horizontally
- **Dark spooky theme** with complete white/black/red color transformation
- **Gothic brick design** with spooky gradient progression (white → light gray → dark gray → blood red)
- **Red glowing effects** throughout all UI elements and game components
- **Performance-optimized star system** with efficient twinkling animation and wrapping
- **Enhanced atmospheric experience** while maintaining smooth 60fps gameplay

### Changed
- **Color scheme transformation**: Complete visual overhaul from cyberpunk cyan to spooky red theme
- **Brick layout optimization**: Reduced from 10 to 9 columns to ensure proper fit within canvas
- **Ball size adjustment**: Reduced radius from 12px back to 8px for better proportions
- **Paddle appearance**: White paddle with red glow instead of cyan
- **Power-up colors**: Updated to red theme variants for consistency
- **Canvas border**: Red glowing border instead of cyan
- **UI accents**: All interface elements now use red accent colors

### Technical Details
- **Star system architecture**: 75 star objects with individual twinkling phases and speeds
- **Performance maintained**: All visual enhancements preserve 60fps target
- **Memory efficiency**: Star system uses minimal computational overhead
- **Animation smoothness**: Stars move at varying speeds for depth perception
- **Theme consistency**: All visual elements unified under spooky aesthetic

## [1.0.0] - 2025-01-08

### Added
- Complete adaptive breakout game with AI assistance system
- Three-level AI assistance system (none, subtle, active) based on player performance
- Performance tracking system monitoring accuracy, deaths, and struggle indicators
- Physics assistance with subtle ball magnetism for struggling players
- Collision assistance with expanded paddle hit detection when needed
- Smart power-up spawning with increased frequency based on player performance
- Power-up system with Wide Paddle and Slow Ball effects
- Visual timer system for active power-ups
- Particle explosion effects on brick destruction
- Screen shake effects for enhanced feedback
- Dark cyberpunk visual theme with neon glowing effects
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Single HTML file architecture with zero external dependencies
- Offline functionality - works completely in browser
- Smooth 60fps gameplay with HTML5 Canvas rendering
- Four brick types (red, orange, yellow, green) with different hit points and scores
- Score tracking and lives system with level progression
- Mouse and keyboard controls (arrow keys and mouse movement)
- Game state management (waiting, playing, gameOver)
- Enhanced ball visibility with 12-pixel radius for accessibility
- Object pooling for efficient particle system memory management
- Responsive paddle physics with proper collision detection
- Infinite level progression with increasing challenge
- Memory bank documentation system for project continuity

### Technical Details
- **File Size**: ~67KB single HTML file
- **Performance**: 60fps target with RequestAnimationFrame
- **Architecture**: Modular JavaScript with separated update/render cycles
- **AI System**: Rule-based conditional logic (no external services)
- **Rendering**: HTML5 Canvas API with efficient state management
- **Input**: Event-driven keyboard and mouse handling
- **Effects**: Object-pooled particle system with cleanup
- **Compatibility**: Modern browsers with Canvas support

### Game Features
- **Paddle**: Responsive controls with visual feedback
- **Ball**: Enhanced 12px radius with physics-based movement
- **Bricks**: 4 types requiring 1-4 hits each with different point values
- **Power-ups**: Wide Paddle (doubles width) and Slow Ball (reduces speed)
- **AI Assistance**: Invisible help system that adapts to player skill
- **Visual Effects**: Particle explosions, screen shake, glowing elements
- **Scoring**: Points vary by brick type (10-40 points each)
- **Lives**: 3 lives system with game over screen
- **Levels**: Infinite progression with brick layout regeneration

---

## Version History

- **1.9.0** (2025-08-08): Supernatural bricks and magical ball trail system
- **1.8.0** (2025-08-08): Developer mode testing system for endgame scenarios
- **1.7.0** (2025-08-08): Explosion powerup feature with enhanced UI
- **1.3.0** (2025-08-08): Hybrid audio & visual horror system with external assets
- **1.2.0** (2025-08-08): Spooky sound system with atmospheric effects
- **1.1.0** (2025-08-08): Dark spooky theme with moving starry background
- **1.0.0** (2025-01-08): Initial release with complete game and AI system
