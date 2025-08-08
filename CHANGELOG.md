# Changelog

All notable changes to Adaptive Breakout will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- **1.2.0** (2025-08-08): Spooky sound system with atmospheric effects
- **1.1.0** (2025-08-08): Dark spooky theme with moving starry background
- **1.0.0** (2025-01-08): Initial release with complete game and AI system
