# Version History

## v1.16.1 - Missing UI Features Restoration (2025-01-11)
- **RESTORED**: Version number display added to game-info section alongside Score, Lives, and Level
- **RESTORED**: Attribution link for DeepAI.org background image at bottom-right of page
- **POST-MODULARIZATION**: Identified and fixed features lost during v1.15.0 modularization process
- **UI INTEGRATION**: Both features positioned consistently with existing spooky theme aesthetic
- **CSS STYLING**: Added .attribution class with fixed positioning, hover effects, and proper z-index
- **UNOBTRUSIVE DESIGN**: Attribution positioned at bottom-right with subtle opacity (60%) and small font (10px)
- **ACCESSIBILITY**: Attribution opens in new tab with security attributes (target="_blank" rel="noopener noreferrer")
- **THEME CONSISTENCY**: All elements use spooky red/black/white color scheme with gray to red hover transitions
- **CLEAN INTEGRATION**: HTML structure updates integrated into modular file system without affecting functionality
- **COMPLETE RESTORATION**: Full UI feature parity achieved with enhanced modular architecture

## v1.16.0 - Bomb Explosion Bug Fixes & Title Update (2025-01-11)
- **CRITICAL FIX**: Fixed explosion timing bug - added 1-second delay for particle animation
- **ENHANCED**: Multi-ball explosion support - creates explosions at ALL ball positions
- **BUG FIX**: Game over input conflict resolved - prevents keyboard shortcuts during name entry
- **VISUAL**: Enhanced explosion effects with multiple particle systems and increased screen shake (12 vs 8)
- **TIMING**: Delayed state changes allow visual effects to complete before game state transitions
- **BRANDING**: Game title simplified from "AITIaan - Spooky Breakout" to just "Spooky Breakout"
- **UI**: Updated both browser tab title and page heading for consistent branding
- **ARCHITECTURE**: Added explosion state object with timing management and callback system
- **INPUT**: Conditional logic prevents unwanted key presses during game over screen
- **SPECTACLE**: Increased particle count (25 per ball) for more dramatic explosion effects
- **PERFORMANCE**: Maintained 60fps performance with enhanced visual effects

## v1.15.0 - Modularization & Bug Fixes (2025-01-11)
- **MODULARIZATION**: Split monolithic game into 7 specialized JavaScript modules
- **ARCHITECTURE**: Extracted CSS to assets/css/styles.css for better organization
- **MODULES**: gameLogic, soundManager, aiSystem, visualEffects, physics, brickSystem, powerUpSystem
- **BUG FIX**: Restored missing background image, game over face, and floating ghost sprites
- **BUG FIX**: Fixed ball/paddle styling - hollow balls with glow, black paddle with white borders
- **ENHANCEMENT**: Paddle movement now allowed during ball reset for better positioning
- **ENHANCEMENT**: Auto-restart after high score submission returns to level 1
- **DEVELOPER**: Full developer mode restoration with enhanced features
- **CONTROLS**: 'D' key toggles developer mode with visual indicator and console feedback
- **CONTROLS**: '+/-' keys adjust lives (1-10) with real-time UI updates in developer mode
- **CONTROLS**: '[/]' keys adjust level difficulty (1-99) with automatic recreation in developer mode
- **UI**: Visual "DEV MODE" indicator with control hints displayed on canvas
- **TESTING**: Developer mode creates 5 random bricks for quick testing scenarios
- **PERFORMANCE**: Maintained 60fps performance across all modular systems

## v1.14.1 - Ball Respawn Bug Fix (2025-01-08)
- **CRITICAL FIX**: Fixed ball respawn bug where ball wouldn't respawn on paddle after first miss
- **ENHANCED**: Complete rewrite of resetBall() function with proper balls array reinitialization
- **STABILITY**: Ball reference management ensuring main ball pointer stays valid after array changes
- **RELIABILITY**: Proper memory management with cleanup of balls when they fall off screen
- **GAMEPLAY**: Critical stability improvement ensuring reliable gameplay continuation after ball loss

## v1.14.0 - AI Simplification & Multiball Power-up (2025-01-08)
- **SIMPLIFIED**: Removed level 2 AI assistance, now binary system (no help/subtle help)
- **AI**: Simplified struggle detection to single threshold for cleaner assistance
- **NEW**: Multiball power-up spawns 2 additional balls for 30 seconds
- **NEW**: Multiball visual design with three circles in triangular formation
- **NEW**: Added multiball to legend panel with animated icon
- **ENHANCED**: Multiple ball physics system with independent collision detection
- **ENHANCED**: Ball trail system supports multiple balls with increased particle limit
- **BALANCE**: Multiball has 33% spawn probability vs 50% for other power-ups
- **GAMEPLAY**: Only lose life when ALL balls fall off screen during multiball
- **PERFORMANCE**: Optimized multi-ball rendering and collision systems

## v1.13.0 - Legend Panel & Enhanced Gameplay (2025-01-08)
- **NEW**: Added comprehensive legend panel on right side of screen
- **NEW**: Legend shows power-ups (Wide Paddle, Slow Ball) with descriptions and animated icons
- **NEW**: Legend shows special blocks (Ghost Brick, Vampire Brick) with descriptions and effects
- **ENHANCED**: Power-up visual styling - Wide Paddle appears as wider rectangle with paddle-like design
- **ENHANCED**: Slow Ball power-ups appear as circles with clock markings for easy identification
- **IMPROVED**: Special blocks (ghost/vampire) now start from level 1 instead of level 2
- **IMPROVED**: Lives reset to 3 at the start of each new level for better progression
- **UI**: Legend panel styled with spooky theme, animated ghost and vampire brick icons
- **BALANCE**: Enhanced gameplay accessibility with earlier special block introduction

## v1.12.1 - Enhanced Floating Ghost System (2025-01-08)
- **ENHANCED**: Dramatically improved floating ghost system with doubled ghost size (80-140 pixels)
- **ENHANCED**: Increased maximum ghost population from 4 to 8 simultaneous ghosts
- **NEW**: Full webpage coverage with ghosts floating across entire browser window
- **NEW**: Directional rotation system with ghosts facing their movement direction
- **NEW**: Smart opacity management reducing transparency when ghosts overlap game area
- **NEW**: Ghost audio integration with random ghost sounds every 25+ seconds
- **PERFORMANCE**: Efficient DOM-based rendering with CSS transforms and automatic cleanup
- **ATMOSPHERE**: Complete haunted webpage environment while maintaining 60fps performance

## v1.12.0 - Background Image & Accessibility (2025-01-08)
- **NEW**: Atmospheric spooky forest background from deepai.org with proper attribution
- **ACCESSIBILITY**: Ball speed reduced by 20% (5→4 units) for improved player comfort
- **SCALE**: Game increased by 10% for better readability on modern screens
- **CANVAS**: Dimensions expanded from 800x600 to 880x660 pixels
- **UI**: All elements scaled proportionally, font sizes increased
- **PERFORMANCE**: Maintained 60fps with larger canvas and background processing

## v1.11.0 - Developer Mode Enhancements (2025-01-08)
- **ENHANCED**: Developer mode with level navigation (+/- keys)
- **ENHANCED**: Life management in developer mode ([/] keys, 0-10 range)
- **IMPROVED**: Special bricks now appear from level 2+ instead of level 3+
- **UI**: Updated instructions for new developer controls
- **TESTING**: Full level layouts available in developer mode
- **DEBUG**: Console logging for level changes and life adjustments

## v1.10.0 - Supernatural Bricks & Ball Trail (2025-01-08)
- **NEW**: Ghost bricks with phase in/out mechanics (3s visible, 2s invisible)
- **NEW**: Vampire bricks that regenerate health every 8 seconds
- **NEW**: Magical sparkle ball trail with twinkling particles
- **ENHANCED**: Special visual effects for supernatural bricks
- **BALANCE**: 15% chance for special bricks from level 3+ onwards
- **PERFORMANCE**: Particle limits maintaining 60fps

## v1.9.0 - Developer Mode & Explosion System (2025-01-08)
- **NEW**: Developer mode activated by 'D' key for testing
- **NEW**: Explosion powerup with 'B' key (180-pixel destruction radius)
- **ENHANCED**: Strategic risk/reward explosion mechanic
- **UI**: Reorganized instructions in leaderboard sidebar
- **TESTING**: Isolated 5-brick testing environment
- **PROTECTION**: High score protection in developer mode

## v1.8.0 - Spooky Transformation & Leaderboard (2025-01-08)
- **RENAMED**: Game transformed to "Spooky Breakout"
- **NEW**: ScaryFont integration throughout interface
- **NEW**: Comprehensive top 10 leaderboard system
- **NEW**: Name entry system for high scores
- **STORAGE**: localStorage persistence with data migration
- **UI**: Complete interface reorganization

## v1.7.0 - Hybrid Audio & Visual Horror (2025-01-08)
- **NEW**: External MP3 audio files for rich atmospheric experience
- **NEW**: Background ambient music with looping
- **NEW**: Dramatic end game sound for climax
- **NEW**: Spooky game over image replacing canvas
- **ARCHITECTURE**: Multi-file structure with organized assets
- **HORROR**: Complete sensory experience

## v1.6.0 - Enhanced Sound System (2025-01-08)
- **NEW**: Web Audio API-based sound manager
- **NEW**: Three atmospheric sound effects (thump, shatter, screech)
- **NEW**: Sound toggle controls (button + M key)
- **PERFORMANCE**: Efficient audio synthesis
- **FALLBACK**: Graceful degradation for unsupported browsers

## v1.5.0 - Dark Spooky Theme (2025-01-08)
- **THEME**: Complete transformation to dark spooky aesthetic
- **NEW**: Moving starry background with 75 twinkling stars
- **COLORS**: White/black/red color scheme throughout
- **DESIGN**: Gothic brick progression and red glowing effects
- **OPTIMIZATION**: Layout and ball size adjustments
- **PERFORMANCE**: 60fps maintained with new visual systems

## v1.4.0 - Version Control & Deployment (2025-01-08)
- **GIT**: Repository setup and GitHub integration
- **WORKFLOW**: Conventional commits and upstream tracking
- **DOCS**: Memory bank documentation system
- **VERSIONING**: Semantic versioning implementation

## v1.3.0 - Accessibility Enhancement (2025-01-08)
- **ACCESSIBILITY**: Larger ball size for better visibility
- **BALANCE**: Improved gameplay for all skill levels

## v1.2.0 - Visual Effects System (2025-01-08)
- **NEW**: Particle explosion system for brick destruction
- **NEW**: Screen shake effects for impacts
- **NEW**: Red-themed glowing visual effects
- **PERFORMANCE**: Object pooling for efficient memory management

## v1.1.0 - Power-up System (2025-01-08)
- **NEW**: Wide Paddle power-up (15 second duration)
- **NEW**: Slow Ball power-up (20 second duration)
- **NEW**: Visual timers and effect management
- **AI**: Smart AI-driven power-up spawning based on player performance

## v1.0.0 - Core AI-Enhanced Breakout (2025-01-08)
- **CORE**: Complete Breakout game mechanics
- **AI**: 3-level assistance system (none/subtle/active)
- **TRACKING**: Performance metrics and struggle analysis
- **PHYSICS**: Subtle ball magnetism and collision assistance
- **ARCHITECTURE**: Single HTML file with zero dependencies
- **PERFORMANCE**: Smooth 60fps gameplay
- **COMPATIBILITY**: Cross-browser support
