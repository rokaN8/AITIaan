# Version Management

## Current Version
**1.8.0** - Spooky Breakout with developer mode testing system

## Versioning Strategy

This project follows [Semantic Versioning (SemVer)](https://semver.org/) principles:

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR** (X.0.0): Breaking changes, fundamental architecture changes
- **MINOR** (1.X.0): New features, enhancements, backward-compatible additions
- **PATCH** (1.0.X): Bug fixes, performance optimizations, small tweaks

## Version Examples for This Project

### Major Version Changes (2.0.0, 3.0.0, etc.)
- Complete game engine rewrite
- Breaking changes to game mechanics
- Fundamental architecture overhaul
- Change from single-file to multi-file structure

### Minor Version Changes (1.1.0, 1.2.0, etc.)
- **Touch controls** for mobile devices → 1.1.0
- **Sound system** with effects and music → 1.2.0
- **New power-up types** (Multi-ball, Laser Paddle) → 1.3.0
- **Additional brick types** or special mechanics → 1.4.0
- **Leaderboard system** with localStorage → 1.5.0
- **AI assistance improvements** or new levels → 1.6.0
- **Visual theme options** or customization → 1.7.0

### Patch Version Changes (1.0.1, 1.0.2, etc.)
- **Bug fixes** in collision detection → 1.0.1
- **Performance optimizations** → 1.0.2
- **Visual polish** improvements → 1.0.3
- **AI assistance tuning** → 1.0.4
- **Cross-browser compatibility** fixes → 1.0.5

## Git Commit Convention

All commits should reference the version being worked on:

### Format
```
<type>(v<version>): <description>

Examples:
feat(v1.1.0): add touch controls for mobile devices
fix(v1.0.1): resolve paddle collision detection edge case
docs(v1.0.0): update changelog for initial release
perf(v1.0.2): optimize particle system performance
style(v1.0.3): improve visual effects and animations
```

### Commit Types
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **perf**: Performance improvements
- **style**: Visual/styling changes
- **refactor**: Code refactoring
- **test**: Testing additions
- **chore**: Maintenance tasks

## Version Tracking

### In Code
- Version constant: `const GAME_VERSION = '1.0.0';`
- Console logging: Version displayed on game initialization
- UI display: Version shown in game interface

### In Documentation
- **CHANGELOG.md**: Comprehensive change tracking
- **VERSION.md**: This versioning strategy document
- **Memory Bank**: Version references in project documentation

### In Git
- **Commit messages**: Version-referenced conventional commits
- **Tags**: Release tags for significant versions
- **Branches**: Version-specific development branches if needed

## Release Process

1. **Determine version impact** (major/minor/patch)
2. **Update version constant** in index.html
3. **Update CHANGELOG.md** with new entry
4. **Update Memory Bank** documentation if needed
5. **Commit with version-referenced message**
6. **Tag release** for significant versions
7. **Push to repository**

## Version History

- **1.8.0** (2025-08-08): Developer mode testing system for endgame scenarios
  - Developer mode activated by "D" key for quick endgame scenario testing
  - Isolated testing environment with 5 randomly selected bricks and 3 lives
  - High score protection prevents developer mode scores from affecting leaderboard integrity
  - Clear visual feedback with "DEVELOPER MODE - NO SCORE SAVED" warning message
  - Random brick selection algorithm provides varied testing scenarios on each activation
  - Developer mode state properly managed through game restart cycle
  - UI integration with developer mode instruction added to control panel
  - Console logging provides debug feedback for development workflow
  - Enhanced testing capabilities for explosion mechanics, AI assistance, and power-ups

- **1.7.0** (2025-08-08): Explosion powerup feature with enhanced UI
  - Explosion powerup triggered by "B" key during active gameplay
  - 180-pixel explosion radius destroys all bricks within range
  - Ball destruction mechanic costs a life but can complete levels on 0 lives
  - Enhanced visual effects with 25 explosion particles and intense screen shake
  - Explosion sound integration with assets/audio/explosion.mp3
  - UI reorganization: instructions moved to leaderboard sidebar in bullet-point format
  - Life cost warning added to instructions: "Press B to explode ball (costs a life!)"
  - Strategic risk/reward gameplay mechanic for clearing difficult brick formations

- **1.6.0** (2025-08-08): Spooky Breakout with leaderboard system and font integration
  - Game renamed from "Adaptive Breakout" to "Spooky Breakout"
  - ScaryFont integration throughout entire game interface
  - Leaderboard system with top 10 high scores stored in localStorage
  - Name entry system for high scores (3-character maximum)
  - Power-up timers moved from above game to inside leaderboard
  - Reset button to clear leaderboard with confirmation dialog
  - Always show all 10 leaderboard slots (empty slots show "---")
  - localStorage migration from old key to new "spookyBreakoutLeaderboard"
  - Enhanced UI layout with left-side leaderboard positioning

- **1.5.0** (2025-08-08): UI reorganization and enhanced leaderboard features
  - Power-up timer relocation to leaderboard area
  - Leaderboard reset functionality with confirmation
  - Improved empty slot display system
  - Enhanced localStorage error handling

- **1.4.0** (2025-08-08): Core leaderboard system implementation
  - localStorage-based high score tracking
  - Top 10 leaderboard with persistent storage
  - High score detection and name entry system
  - Leaderboard display with rank, name, and score

- **1.3.0** (2025-08-08): Hybrid audio & visual horror system with external assets
  - External MP3 audio files for rich atmospheric experience
  - Background ambient music (assets/audio/background.mp3) with looping and volume control
  - Dramatic end game sound (assets/audio/endgame.mp3) for frightening climax
  - Spooky game over image (assets/sprites/face.png) replacing entire canvas
  - Image preloading system with error handling and state management
  - Multi-file architecture transition while maintaining core functionality
  - Audio timing coordination (music starts on ball launch, stops on game over)
  - Complete sensory horror experience combining audio and visual shock elements

- **1.2.0** (2025-08-08): Spooky sound system with atmospheric effects
  - Web Audio API-based sound manager with programmatic sound generation
  - Three atmospheric sound effects: dull thump (brick hit), glass shattering (brick break), violin screech (life lost)
  - Sound toggle controls with button (🔊/🔇) and M key shortcut
  - Background music removal per user preference (event-based sounds only)
  - Efficient audio synthesis without external dependencies
  - Graceful fallback for browsers without Web Audio API support
  - Performance optimization maintaining 60fps with audio processing

- **1.1.0** (2025-08-08): Dark spooky theme with moving starry background
  - Moving starry background with 75 twinkling stars
  - Complete color scheme transformation to white/black/red theme
  - Gothic brick design with spooky gradient (white → gray → red)
  - Red glowing effects throughout UI and game elements
  - Layout fixes: reduced to 9 brick columns for proper fit
  - Ball size reduced from 12px to 8px radius
  - Performance-optimized star system with smooth animation
  - Maintained all AI assistance and gameplay features

- **1.0.0** (2025-01-08): Initial release with complete adaptive breakout game
  - AI assistance system with 3 levels
  - Power-up system (Wide Paddle, Slow Ball)
  - Visual effects and modern UI
  - Cross-browser compatibility
  - Single-file architecture
  - Memory bank documentation system

---

*This versioning system ensures clear tracking of changes and maintains professional development standards for the Adaptive Breakout project.*
