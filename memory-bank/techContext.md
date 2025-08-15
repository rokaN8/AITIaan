# Tech Context

## Technology Stack
- **HTML5**: Structure and Canvas element for game rendering with modular script loading
- **CSS3**: Complete styling system extracted to assets/css/styles.css with spooky theme
- **JavaScript (ES6+)**: 7 specialized modules for game logic, physics, AI, audio, and visual effects
- **HTML5 Canvas API**: 2D rendering, particle effects, multi-ball physics, visual elements
- **Web Audio API**: Programmatic sound synthesis for responsive game effects
- **HTML5 Audio**: MP3 file playback for atmospheric music and rich sound effects
- **Web APIs**: RequestAnimationFrame, Event listeners, DOM manipulation, LocalStorage

## Development Environment
- **Modular development**: 7 JavaScript modules + extracted CSS for organized codebase
- **No build process**: Direct browser execution with organized asset loading
- **No package manager**: Zero external dependencies with structured local assets
- **Cross-browser compatibility**: Modern browser support (Chrome, Firefox, Safari, Edge)
- **Development tools**: Browser DevTools + integrated developer mode for testing

## Dependencies
**Zero external dependencies** - completely self-contained with organized structure:
- No JavaScript frameworks (React, Vue, Angular)
- No game engines (Phaser, Three.js, Babylon.js)
- No CSS frameworks (Bootstrap, Tailwind)
- No build tools (Webpack, Vite, Parcel)
- No package managers (npm, yarn)
- No external APIs or services

## Build Process
**No build process required** - organized modular loading:
1. HTML file loads CSS and JavaScript modules in dependency order
2. Assets organized in structured folders (audio, css, font, js, sprites)
3. Open directly in browser to run with all features
4. No compilation, bundling, or preprocessing needed
5. Instant deployment - copy entire project folder

## Development Workflow
1. **Edit**: Modify code in appropriate module files
2. **Test**: Refresh browser to see changes with developer mode available
3. **Debug**: Use browser DevTools + integrated developer controls
4. **Deploy**: Copy entire project folder to any web server or local directory
5. **Share**: Send project folder or Git repository to anyone

## Technical Constraints
- **Project size**: ~100KB total including all assets and modules
- **Browser requirements**: Modern browsers with HTML5 Canvas and Audio support
- **Performance target**: 60fps gameplay with complex visual effects
- **Memory usage**: Efficient with object pooling and proper cleanup
- **Network**: Zero network dependencies after initial load

## File Structure & Organization

### **Project Architecture**
```
AITIaan/
├── index.html                 # Main HTML structure and module loading
├── assets/
│   ├── css/
│   │   └── styles.css        # Complete styling system
│   ├── js/                   # JavaScript modules
│   │   ├── gameLogic.js      # Core game loop and coordination
│   │   ├── physics.js        # Ball/paddle physics and collision
│   │   ├── brickSystem.js    # Brick management and special types
│   │   ├── powerUpSystem.js  # Power-up spawning and effects
│   │   ├── visualEffects.js  # Particles, screen shake, ghosts
│   │   ├── soundManager.js   # Audio system and sound effects
│   │   └── aiSystem.js       # AI assistance and performance tracking
│   ├── audio/                # Sound files
│   │   ├── background.mp3    # Atmospheric background music
│   │   ├── explosion.mp3     # Bomb explosion sound effects
│   │   ├── endgame.mp3       # Game over dramatic audio
│   │   └── ghostsound.mp3    # Ghost atmospheric effects
│   ├── sprites/              # Image assets
│   │   ├── backgroundImage.jpg # Spooky forest background
│   │   ├── face.png          # Game over spooky face
│   │   └── ghost.png         # Floating ghost sprite
│   └── font/
│       └── scaryfont.ttf     # Horror-themed typography
├── memory-bank/              # Documentation system
└── VERSION.md, CHANGELOG.md  # Version control and history
```

### **Module Dependencies**
```
index.html
├── assets/css/styles.css (styling)
├── assets/js/soundManager.js (audio system)
├── assets/js/aiSystem.js (AI assistance)
├── assets/js/visualEffects.js (particles, effects)
├── assets/js/physics.js (ball/paddle physics)
├── assets/js/brickSystem.js (brick management)
├── assets/js/powerUpSystem.js (power-up system)
└── assets/js/gameLogic.js (main coordinator)
```

## Tool Usage Patterns

### **Modular Canvas Rendering**
```javascript
// Efficient rendering with modular system coordination
class GameLogic {
    render() {
        this.ctx.save();
        visualEffects.applyScreenShake(this.ctx);
        visualEffects.drawBackground(this.ctx, width, height);
        brickSystem.drawBricks(this.ctx, this.bricks);
        // ... other rendering calls
        this.ctx.restore();
    }
}
```

### **Cross-Module Communication**
```javascript
// Global window object provides module access
window.soundManager = new SoundManager();
window.aiSystem = new AISystem();
// Modules can call each other's methods directly
window.soundManager.playExplosion();
window.aiSystem.shouldSpawnHelpfulPowerUp();
```

### **Performance Optimization Patterns**
```javascript
// Object pooling across modules
particles.splice(i, 1); // Remove expired particles
// Efficient multi-ball physics
balls.forEach(ball => physics.updateBall(ball));
// RequestAnimationFrame coordination
requestAnimationFrame(() => this.gameLoop());
```

### **Asset Loading and Error Handling**
```javascript
// Graceful asset loading with fallbacks
const backgroundImage = new Image();
backgroundImage.onload = () => this.backgroundLoaded = true;
backgroundImage.onerror = () => console.warn('Background image failed to load');
backgroundImage.src = 'assets/sprites/backgroundImage.jpg';
```

## Environment Configuration

### **Browser Compatibility**
- **Chrome**: Full support, optimal performance with all features
- **Firefox**: Full support, excellent performance with audio/visual effects
- **Safari**: Full support, good performance with proper audio handling
- **Edge**: Full support, good performance with modern web standards
- **Mobile browsers**: Basic support (touch controls not implemented)

### **Performance Profiles**
- **Desktop**: 60fps target with full visual effects, floating ghosts, particles
- **Laptop**: 60fps target with efficient rendering and audio processing
- **Older hardware**: Graceful degradation while maintaining core functionality

### **Audio System Configuration**
```javascript
// Hybrid audio approach
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const backgroundMusic = document.getElementById('backgroundMusic');
// MP3 files for rich atmosphere, Web Audio API for responsive effects
```

## Testing Strategy

### **Manual Testing Approach**
- **Functionality**: All game mechanics work correctly across modules
- **Performance**: Smooth 60fps gameplay with complex effects
- **AI behavior**: Assistance triggers appropriately based on performance
- **Visual effects**: Particles, floating ghosts, screen shake work properly
- **Audio integration**: All sound effects and music function correctly
- **Cross-browser**: Test in multiple browsers for consistency

### **Developer Mode Testing**
- **Live adjustments**: +/- keys for lives, [/] keys for levels
- **State testing**: Developer mode provides controlled testing environment
- **Performance monitoring**: Console logging for debug feedback
- **Feature isolation**: Test individual systems without full gameplay

### **Performance Testing**
- **Frame rate monitoring**: Browser DevTools performance tab
- **Memory usage**: Check for leaks during extended play with multiple systems
- **Asset loading**: Verify all audio, image, and font assets load properly
- **Multi-ball performance**: Test complex scenarios with multiple balls and effects

### **User Experience Testing**
- **Accessibility**: Game playable by different skill levels with AI assistance
- **Controls**: Mouse, keyboard, and developer controls work smoothly
- **Visual clarity**: All elements clearly visible with atmospheric effects
- **Audio experience**: Balanced sound levels and atmospheric immersion

## Development Patterns

### **Modular Code Organization**
```javascript
// Each module follows consistent patterns
class ModuleName {
    constructor() {
        // Initialize module state
    }
    
    init() {
        // Setup module systems
    }
    
    update() {
        // Update module logic
    }
    
    // Public methods for cross-module communication
}

// Global registration
window.moduleName = new ModuleName();
```

### **AI System Implementation**
```javascript
// Performance tracking across modules
const playerMetrics = {
    ballsLost: 0,
    bricksHit: 0,
    // ... other metrics
};

// Analysis and assistance application
function applyPhysicsAssistance(ball) {
    if (getStruggleLevel() > 0) {
        // Subtle magnetism toward paddle
    }
}
```

### **Visual Effects Architecture**
```javascript
// Comprehensive particle system
class VisualEffects {
    createExplosionParticles(x, y, count = 25) {
        // Generate particles with physics
    }
    
    updateFloatingGhosts() {
        // DOM-based ghost management
    }
    
    drawBallTrail(ctx) {
        // Multi-ball trail support
    }
}
```

### **Audio System Architecture**
```javascript
// Hybrid audio management
class SoundManager {
    init() {
        this.audioContext = new AudioContext();
        this.setupMP3Audio();
    }
    
    playBrickHit() {
        // Web Audio API synthesis
    }
    
    startBackgroundMusic() {
        // HTML5 Audio for MP3 files
    }
}
```

## Deployment Considerations

### **File Distribution**
- **Organized structure**: Easy to understand and modify
- **No server requirements**: Can run from file:// protocol
- **CDN friendly**: All assets in organized folders for web hosting
- **Version control**: Git repository with comprehensive history

### **Performance Optimization**
- **Asset organization**: Efficient loading with structured folders
- **Modular loading**: JavaScript modules loaded in optimal order
- **Compression**: Gzip compression available on web servers
- **Caching**: Organized assets easy to cache effectively
- **Loading optimization**: Preloading critical assets with error handling

### **Development Environment Setup**
```bash
# Simple development workflow
git clone https://github.com/rokaN8/AITIaan.git
cd AITIaan
# Open index.html in browser - no build step required
# Use developer mode (D key) for testing and debugging
```

## Advanced Technical Features

### **Multi-Ball Physics System**
- **Independent collision detection**: Each ball has separate physics
- **Performance optimization**: Efficient array management and cleanup
- **Trail system scaling**: Particle limits adjusted for multiple balls
- **Life management**: Only lose life when ALL balls are lost

### **Explosion State Management**
- **Multi-ball support**: Explosions at all ball positions
- **State callbacks**: Proper sequencing of game state changes
- **Visual effect integration**: Particles continue during state transitions

### **Developer Mode Integration**
- **Live adjustment**: Real-time modification of game parameters
- **Visual feedback**: On-screen indicators and console logging
- **Testing isolation**: Controlled environments for specific scenarios
- **High score protection**: Developer scores don't affect leaderboard

### **Floating Ghost System**
- **DOM-based rendering**: Full webpage coverage with CSS positioning
- **Directional rotation**: Ghosts face movement direction realistically
- **Smart opacity**: Reduced transparency over gameplay area
- **Performance optimization**: Efficient cleanup and management

---
*This technical foundation enables sophisticated gameplay features, atmospheric effects, and intelligent systems while maintaining zero external dependencies and excellent performance across modern browsers.*
