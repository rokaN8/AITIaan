# Changelog

All notable changes to Spooky Breakout will be documented in this file.

## [1.16.1] - 2025-01-11

### Restored Features
- **Version Number Display**: Added "Version: v1.16.0" to game-info section alongside Score, Lives, and Level
- **Attribution Link**: Added proper credit link for DeepAI.org background image at bottom-right of page
- **Post-Modularization Fixes**: Identified and restored features that were lost during v1.15.0 modularization process

### UI Improvements
- **Consistent Integration**: Both features positioned with existing spooky theme aesthetic and color scheme
- **Unobtrusive Design**: Attribution link positioned at bottom-right with subtle opacity (60%) and small font size (10px)
- **Theme Consistency**: All new elements use spooky red/black/white color scheme with gray to red hover transitions

### Technical Enhancements
- **CSS Styling**: Added .attribution class with fixed positioning, hover effects, and proper z-index (100)
- **Accessibility**: Attribution opens in new tab with security attributes (target="_blank" rel="noopener noreferrer")
- **Clean Integration**: HTML structure updates integrated seamlessly into modular file system without affecting functionality
- **Complete Restoration**: Full UI feature parity achieved with enhanced modular architecture

## [1.16.0] - 2025-01-11

### Critical Bug Fixes
- **Explosion Timing Bug**: Fixed critical issue where game would pause and particles wouldn't update during bomb explosions
- **Multi-ball Explosion Support**: Enhanced explodeBall() function to create explosions at ALL ball positions when multiball is active
- **Game Over Input Conflicts**: Resolved keyboard shortcut conflicts during game over screen name entry

### Enhanced Visual Effects
- **Multiple Particle Systems**: Each ball now creates its own explosion with 25 particles per explosion
- **Increased Screen Shake**: Enhanced from intensity 8 to 12 for more dramatic explosion feedback

### Game Title Update
- **Simplified Branding**: Changed from "AITIaan - Spooky Breakout" to just "Spooky Breakout"
- **Consistent Naming**: Updated both browser tab title and main page heading
- **Unified Identity**: Game now uses clean, consistent "Spooky Breakout" branding throughout

### Technical Improvements
- **Explosion State Object**: Added timing management with callback system for proper action sequencing
- **Input Filtering**: Conditional logic prevents unwanted key presses during game over screen
- **Enhanced Spectacle**: Spectacular multi-ball explosions with increased particle count and screen shake
- **Performance**: Maintained 60fps performance with enhanced visual effects

## [1.15.0] - 2025-01-11

### Major Modularization
- **Complete Modularization**: Split monolithic game into 7 specialized JavaScript modules
- **CSS Extraction**: Moved all styles from index.html to assets/css/styles.css for better organization
- **System Separation**: Created dedicated modules for gameLogic, soundManager, aiSystem, visualEffects, physics, brickSystem, powerUpSystem

### Critical Bug Fixes
- **Missing Images Restored**: Fixed background image, game over face, and floating ghost sprites that were lost during modularization
- **Ball/Paddle Styling Fixed**: Restored hollow balls with glow effects and black paddle with white borders
- **Paddle Movement Enhancement**: Players can now position paddle while ball is waiting to launch
- **Auto-restart Feature**: Game automatically resets to level 1 after high score submission

### Developer Mode Enhancement
- **'D' Key Activation**: Toggle developer mode with visual indicator and console feedback
- **Lives Control**: '+/-' keys adjust lives between 1-10 with real-time UI updates
- **Level Control**: '[/]' keys adjust level difficulty between 1-99 with automatic level recreation
- **Visual Feedback**: "DEV MODE" indicator with control hints displayed on canvas
- **Quick Testing**: Developer mode creates 5 random bricks for rapid testing scenarios

### Technical Improvements
- **Modular Architecture**: Clean separation of concerns while maintaining all functionality
- **Performance**: Maintained 60fps performance across all modular systems
- **Code Organization**: Enhanced maintainability and extensibility through proper module structure

## [1.14.1] - 2025-01-08

### Fixed
- **Critical Ball Respawn Bug**: Fixed issue where ball wouldn't respawn on paddle after first miss
- **resetBall() Function**: Complete rewrite with proper balls array reinitialization
- **Ball Reference Management**: Ensured main ball pointer stays valid after array changes
- **Memory Management**: Proper cleanup of balls when they fall off screen

### Improved
- **Game Stability**: Critical stability improvement ensuring reliable gameplay continuation after ball loss
- **Ball System Reliability**: Enhanced ball system robustness for multiball scenarios

## [1.14.0] - 2025-01-08

### Added
- **Multiball Power-up**: New power-up that spawns 2 additional balls for 30 seconds
- **Multiball Visual Design**: Three circles in triangular formation with orange-to-yellow gradient
- **Multiball Legend Entry**: Added to legend panel with animated icon showing three circles
- **Multiple Ball Physics**: Independent collision detection and physics for each ball
- **Enhanced Ball Trail**: Supports multiple balls with increased particle limit (50→100)

### Changed
- **AI Assistance Simplified**: Removed level 2 active assistance, now binary system (no help/subtle help)
- **Struggle Detection**: Simplified to single threshold for cleaner, more predictable assistance
- **Power-up Balance**: Multiball has 33% spawn probability vs 50% each for Wide Paddle and Slow Ball
- **Lives System**: Only lose life when ALL balls fall off screen during multiball

### Improved
- **Ball Rendering**: All balls now render with individual trails and collision detection
- **Performance**: Optimized multi-ball systems while maintaining 60fps
- **User Experience**: Clearer AI assistance behavior with binary on/off system

## [1.13.0] - 2025-01-08

### Added
- **Legend Panel**: Comprehensive legend panel on right side of screen showing power-ups and special blocks
- **Power-up Descriptions**: Wide Paddle and Slow Ball with detailed descriptions and animated icons
- **Special Block Descriptions**: Ghost Brick and Vampire Brick with mechanics explanations
- **Animated Legend Icons**: Ghost brick icon with ethereal pulsing, vampire brick with blood-red effects
- **Enhanced Power-up Visuals**: Wide Paddle appears as wider rectangle with paddle design, Slow Ball as circle with clock markings

### Changed
- **Special Block Availability**: Ghost and vampire bricks now start from level 1 instead of level 2
- **Lives System**: Lives now reset to 3 at the start of each new level for better progression
- **Power-up Identification**: Unique visual styles make power-ups instantly recognizable during gameplay

### Improved
- **User Experience**: Legend panel provides clear visual guidance for all game elements
- **Gameplay Balance**: Earlier introduction of special blocks creates more engaging gameplay from start
- **Accessibility**: Lives reset system provides fresh start for each level while maintaining challenge

## [1.12.1] - 2025-01-08

### Enhanced
- **Floating Ghost System**: Dramatically improved with doubled ghost size (80-140 pixels)
- **Ghost Population**: Increased from 4 to 8 simultaneous ghosts for enhanced atmosphere
- **Full Page Coverage**: Ghosts now float across entire browser window using DOM rendering
- **Directional Movement**: Ghosts rotate to face their movement direction for realistic behavior
- **Smart Opacity**: Ghosts become transparent when overlapping game area to avoid obscuring gameplay
- **Ghost Audio**: Random ghost sounds every 25+ seconds at half background music volume

### Technical
- **Performance**: Efficient DOM-based rendering with CSS transforms and automatic cleanup
- **Atmosphere**: Complete haunted webpage environment while maintaining 60fps

## [1.12.0] - 2025-01-08

### Added
- **Background Image**: Atmospheric spooky forest background from deepai.org with proper attribution
- **Game Scaling**: Increased entire game by 10% for better readability on modern screens
- **Canvas Expansion**: Upgraded from 800x600 to 880x660 pixels with proportional scaling

### Changed
- **Ball Speed**: Reduced by 20% (from 5 to 4 units) for improved accessibility and player comfort
- **UI Scaling**: Font sizes increased (18px→20px main UI, 24px→26px canvas text)
- **Leaderboard**: Width increased from 250px to 275px for better proportions

### Technical
- **Performance**: Maintained smooth 60fps with larger canvas and background image processing
- **Compatibility**: All elements scaled proportionally for consistent experience

## [1.11.0] - 2025-01-08

### Enhanced
- **Developer Mode**: Added level navigation with +/- keys for comprehensive testing
- **Life Management**: Added [/] keys for life adjustment (0-10 range) in developer mode
- **Special Block Balance**: Changed special bricks to appear from level 2+ instead of level 3+

### Added
- **Full Level Testing**: Developer mode now provides complete level layouts instead of limited 5-brick setup
- **Debug Logging**: Console feedback for level changes and life adjustments
- **UI Instructions**: Updated control instructions to include new developer mode features

## [1.10.0] - 2025-01-08

### Added
- **Ghost Bricks**: Phase in/out mechanics every 5 seconds (3s visible, 2s invisible)
- **Vampire Bricks**: Regenerate health every 8 seconds if damaged below maximum
- **Ball Trail System**: Magical sparkle trail with twinkling particles in multiple colors
- **Special Visual Effects**: Floating ghost bricks with ethereal glow, pulsing vampire bricks
- **Blood Drip Effects**: Particle effects when vampire bricks regenerate health

### Changed
- **Special Brick Progression**: 15% chance for supernatural bricks from level 3+ onwards
- **Scoring System**: Higher points for supernatural bricks (50 ghost, 60 vampire)

### Technical
- **Enhanced Collision**: System skips phased-out ghost bricks
- **Performance**: Particle limits (max 50 trail particles) maintaining 60fps
- **Gravity Effects**: Ball trail particles with natural fade-out over time

## [1.9.0] - 2025-01-08

### Added
- **Developer Mode**: Activated by 'D' key for quick endgame scenario testing
- **Explosion Powerup**: 'B' key triggers 180-pixel destruction radius explosion
- **Strategic Mechanics**: Explosion costs a life but can complete levels on 0 lives
- **Enhanced Effects**: 25 explosion particles with intense screen shake and sound

### Changed
- **UI Layout**: Instructions moved to leaderboard sidebar in bullet-point format
- **High Score Protection**: Developer mode scores don't affect leaderboard integrity
- **Testing Environment**: Isolated 5-brick setup with 3 lives for quick testing

### Technical
- **Smart Logic**: Prevents unfair game over when explosion completes level
- **Console Logging**: Debug feedback for development workflow
- **State Management**: Developer mode properly managed through game restart cycle

## [1.8.0] - 2025-01-08

### Major Changes
- **Game Rename**: Transformed from "Adaptive Breakout" to "Spooky Breakout"
- **Font Integration**: ScaryFont applied throughout entire game interface
- **Leaderboard System**: Comprehensive top 10 high scores with localStorage persistence

### Added
- **Name Entry**: 3-character validation system for high scores
- **Data Migration**: Automatic migration from old Adaptive Breakout scores
- **Reset Functionality**: Confirmation dialog to clear all leaderboard data
- **UI Reorganization**: Left-side leaderboard with power-up timers below scores

### Technical
- **Storage Enhancement**: Error handling and seamless data migration
- **Always Display**: All 10 leaderboard slots with "---" placeholders for empty positions
- **Version Sync**: Synchronized versioning across all files and documentation

## [1.7.0] - 2025-01-08

### Added
- **External Audio**: MP3 files for rich atmospheric experience
- **Background Music**: Looping ambient music (assets/audio/background.mp3)
- **End Game Sound**: Dramatic climax sound (assets/audio/endgame.mp3)
- **Game Over Image**: Spooky face image replacing entire canvas on game over
- **Image Preloading**: System with error handling and state management

### Changed
- **Architecture**: Transition to multi-file structure with organized assets folder
- **Audio Timing**: Music starts on ball launch, stops on game over
- **Volume Control**: Balanced audio levels for optimal experience

### Technical
- **Complete Horror Experience**: Combined audio and visual shock elements
- **Asset Management**: Organized file structure while maintaining core functionality

## [1.6.0] - 2025-01-08

### Added
- **Web Audio API**: Advanced sound manager with programmatic sound generation
- **Sound Effects**: Three atmospheric effects (dull thump, glass shattering, violin screech)
- **Sound Controls**: Toggle button (🔊/🔇) and M key shortcut
- **Audio Synthesis**: Efficient sound generation without external dependencies

### Technical
- **Graceful Fallback**: Support for browsers without Web Audio API
- **Performance**: Optimized audio processing maintaining 60fps
- **Memory Management**: Proper audio context handling and cleanup

## [1.5.0] - 2025-01-08

### Major Visual Overhaul
- **Dark Spooky Theme**: Complete transformation from cyberpunk to horror aesthetic
- **Moving Stars**: 75 twinkling stars with horizontal scrolling animation
- **Color Scheme**: White/black/red throughout entire interface
- **Gothic Bricks**: Spooky gradient progression (white → gray → red)

### Technical Changes
- **Ball Optimization**: Reduced from 12 to 8 pixels for better proportions
- **Layout**: Reduced brick columns from 10 to 9 for perfect canvas fit
- **Performance**: Maintained 60fps with new star system and visual effects
- **Red Glowing**: Updated all visual elements to match spooky theme

## [1.4.0] - 2025-01-08

### Development Infrastructure
- **Git Repository**: Setup and GitHub integration (https://github.com/rokaN8/AITIaan.git)
- **Version Control**: Conventional commits and upstream tracking configured
- **Documentation**: Memory bank system established for project continuity
- **Semantic Versioning**: Professional versioning system implemented

### Workflow
- **Commit History**: Comprehensive project history established
- **Collaboration**: Ready for collaborative development and deployment

## [1.3.0] - 2025-01-08

### Accessibility
- **Ball Size**: Increased for better visibility and improved playability
- **Player Comfort**: Enhanced accessibility for players of different skill levels
- **Visual Clarity**: Better game element visibility

## [1.2.0] - 2025-01-08

### Visual Effects
- **Particle System**: Explosion effects for brick destruction
- **Screen Shake**: Impact feedback for collisions and power-ups
- **Glowing Effects**: Red-themed visual enhancements
- **Object Pooling**: Efficient memory management for particles

### Performance
- **60fps Maintained**: Smooth gameplay with new visual systems
- **Memory Optimization**: Proper particle cleanup and reuse

## [1.1.0] - 2025-01-08

### Power-up System
- **Wide Paddle**: 15-second duration paddle expansion
- **Slow Ball**: 20-second ball speed reduction
- **Visual Timers**: Real-time effect duration display
- **AI Integration**: Smart spawning based on player performance

### Game Balance
- **Assistance Integration**: Power-ups spawn more frequently for struggling players
- **Visual Feedback**: Clear indication of active
