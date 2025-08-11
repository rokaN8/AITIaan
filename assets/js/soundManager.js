// Sound Manager System
// Handles all audio functionality including Web Audio API synthesis and HTML5 audio

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = true;
        this.backgroundMusic = null;
        this.endGameSound = null;
        this.explosionSound = null;
        this.ghostSound = null;
        this.musicStarted = false;
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.soundEnabled = false;
        }
        
        // Initialize HTML5 audio elements
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.endGameSound = document.getElementById('endGameSound');
        this.explosionSound = document.getElementById('explosionSound');
        this.ghostSound = document.getElementById('ghostSound');
        
        // Set volume levels
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = 0.3; // Lower volume for ambiance
        }
        if (this.endGameSound) {
            this.endGameSound.volume = 0.7; // Higher volume for dramatic effect
        }
        if (this.explosionSound) {
            this.explosionSound.volume = 0.8; // High volume for explosion impact
        }
        if (this.ghostSound) {
            this.ghostSound.volume = 0.15; // Half the volume of background music
        }
    }
    
    startBackgroundMusic() {
        if (!this.soundEnabled || !this.backgroundMusic || this.musicStarted) return;
        
        try {
            this.backgroundMusic.currentTime = 0;
            this.backgroundMusic.play().catch(e => {
                console.warn('Background music failed to play:', e);
            });
            this.musicStarted = true;
        } catch (e) {
            console.warn('Background music error:', e);
        }
    }
    
    stopBackgroundMusic() {
        if (!this.backgroundMusic) return;
        
        try {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
            this.musicStarted = false;
        } catch (e) {
            console.warn('Background music stop error:', e);
        }
    }
    
    playEndGameSound() {
        if (!this.soundEnabled || !this.endGameSound) return;
        
        try {
            this.endGameSound.currentTime = 0;
            this.endGameSound.play().catch(e => {
                console.warn('End game sound failed to play:', e);
            });
        } catch (e) {
            console.warn('End game sound error:', e);
        }
    }
    
    playBrickHit() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // Dull thump sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
        oscillator.type = 'square';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    playBrickBreak() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // Glass shattering sound
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const oscillator3 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        // Multiple high frequencies for glass-like sound
        oscillator1.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator3.frequency.setValueAtTime(1600, this.audioContext.currentTime);
        
        oscillator1.type = 'triangle';
        oscillator2.type = 'triangle';
        oscillator3.type = 'triangle';
        
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(400, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        oscillator3.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator1.start();
        oscillator2.start();
        oscillator3.start();
        
        oscillator1.stop(this.audioContext.currentTime + 0.3);
        oscillator2.stop(this.audioContext.currentTime + 0.3);
        oscillator3.stop(this.audioContext.currentTime + 0.3);
    }
    
    playLifeLost() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        // High pitch violin screech
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(2000, this.audioContext.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);
        filter.Q.setValueAtTime(10, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.8);
    }
    
    playExplosion() {
        if (!this.soundEnabled || !this.explosionSound) return;
        
        try {
            this.explosionSound.currentTime = 0;
            this.explosionSound.play().catch(e => {
                console.warn('Explosion sound failed to play:', e);
            });
        } catch (e) {
            console.warn('Explosion sound error:', e);
        }
    }
    
    playGhostSound() {
        if (!this.soundEnabled || !this.ghostSound) return;
        
        try {
            this.ghostSound.currentTime = 0;
            this.ghostSound.play().catch(e => {
                console.warn('Ghost sound failed to play:', e);
            });
        } catch (e) {
            console.warn('Ghost sound error:', e);
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        
        // Handle background music based on sound state
        if (!this.soundEnabled) {
            this.stopBackgroundMusic();
        } else if (window.gameState === 'playing' || window.gameState === 'waiting') {
            // Only restart music if we're in an active game state
            if (window.gameState === 'playing') {
                this.startBackgroundMusic();
            }
        }
        
        return this.soundEnabled;
    }
}

// Create global sound manager instance
window.soundManager = new SoundManager();
