// Animation system for the website
class AnimationManager {
    constructor() {
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        this.createFloatingParticles();
        this.initializeAnimations();
        this.isInitialized = true;
    }

    createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        // Create additional floating elements
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${5 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    createFireworks(canvas) {
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fireworks = [];
        const particles = [];

        class Firework {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.coordinates = [];
                this.coordinateCount = 5;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 10 + 1;
                this.friction = 0.95;
                this.gravity = 1;
                this.hue = Math.random() * 360;
                this.brightness = Math.random() * 80 + 50;
                this.alpha = 1;
                this.decay = Math.random() * 0.03 + 0.01;
            }

            update(index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);
                
                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;

                if (this.alpha <= this.decay) {
                    fireworks.splice(index, 1);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], 
                          this.coordinates[this.coordinates.length - 1][1]);
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                ctx.stroke();
            }
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.coordinates = [];
                this.coordinateCount = 5;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 10 + 1;
                this.friction = 0.95;
                this.gravity = 1;
                this.hue = Math.random() * 360;
                this.brightness = Math.random() * 80 + 50;
                this.alpha = 1;
                this.decay = Math.random() * 0.03 + 0.01;
            }

            update(index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);
                
                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;

                if (this.alpha <= this.decay) {
                    particles.splice(index, 1);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                ctx.fill();
            }
        }

        function createFirework(x, y) {
            let particleCount = 30;
            while (particleCount--) {
                particles.push(new Particle(x, y));
            }
        }

        function loop() {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            let i = fireworks.length;
            while (i--) {
                fireworks[i].draw();
                fireworks[i].update(i);
            }

            let j = particles.length;
            while (j--) {
                particles[j].draw();
                particles[j].update(j);
            }

            if (Math.random() < 0.05) {
                fireworks.push(new Firework(
                    canvas.width * Math.random(),
                    canvas.height + 10
                ));
            }

            requestAnimationFrame(loop);
        }

        // Auto-create some fireworks
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFirework(
                        Math.random() * canvas.width,
                        Math.random() * (canvas.height / 2)
                    );
                }, i * 1000);
            }
        }, 1000);

        loop();
    }

    createBalloons() {
        const balloonsContainer = document.querySelector('.balloons-container');
        if (!balloonsContainer) return;

        const balloonEmojis = ['🎈', '🎉', '🎊', '✨', '🌟', '💫', '🎆'];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.color = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
            balloon.style.animationDelay = Math.random() * 2 + 's';
            
            balloonsContainer.appendChild(balloon);
            
            // Remove balloon after animation
            setTimeout(() => {
                if (balloonsContainer.contains(balloon)) {
                    balloonsContainer.removeChild(balloon);
                }
            }, 8000);
        }

        // Create balloons periodically
        const interval = setInterval(createBalloon, 800);
        
        // Stop after 10 seconds
        setTimeout(() => {
            clearInterval(interval);
        }, 10000);
        
        // Create initial balloons
        for (let i = 0; i < 5; i++) {
            setTimeout(createBalloon, i * 200);
        }
    }

    initializePageAnimations(page) {
        switch (page) {
            case 'welcome':
                this.createBalloons();
                const fireworksCanvas = document.getElementById('fireworks');
                if (fireworksCanvas) {
                    this.createFireworks(fireworksCanvas);
                }
                break;
                
            case 'certificate':
                this.createCelebrationAnimation();
                break;
        }
    }

    createCelebrationAnimation() {
        const canvas = document.getElementById('celebrationCanvas');
        if (!canvas) return;

        // Use canvas-confetti library if available
        if (typeof confetti !== 'undefined') {
            // Create multiple confetti bursts
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);
        } else {
            // Fallback celebration animation
            this.createSimpleCelebration(canvas);
        }
    }

    createSimpleCelebration(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];

        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 5 + 2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confetti.forEach((piece, index) => {
                piece.y += piece.speed;
                piece.rotation += piece.rotationSpeed;
                
                ctx.save();
                ctx.translate(piece.x + piece.width / 2, piece.y + piece.height / 2);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                ctx.restore();
                
                if (piece.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });
            
            if (confetti.length > 0) {
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }

    initializeAnimations() {
        // Add entrance animations for cards
        const cards = document.querySelectorAll('.glass-card, .choice-card, .habit-item, .stage-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Add dynamic particle effects
        this.addDynamicEffects();
    }

    addDynamicEffects() {
        // Mouse trail effect
        let mouseX = 0, mouseY = 0;
        const trail = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            trail.push({ x: mouseX, y: mouseY, time: Date.now() });
            
            // Limit trail length
            while (trail.length > 20) {
                trail.shift();
            }
        });

        // Create trail particles
        const trailCanvas = document.createElement('canvas');
        trailCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(trailCanvas);

        const trailCtx = trailCanvas.getContext('2d');

        function animateTrail() {
            trailCanvas.width = window.innerWidth;
            trailCanvas.height = window.innerHeight;
            
            const now = Date.now();
            trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            
            trail.forEach((point, index) => {
                const age = now - point.time;
                const opacity = Math.max(0, 1 - age / 1000);
                const size = Math.max(0, 10 - index);
                
                if (opacity > 0) {
                    trailCtx.globalAlpha = opacity;
                    trailCtx.fillStyle = '#ffd700';
                    trailCtx.beginPath();
                    trailCtx.arc(point.x, point.y, size, 0, Math.PI * 2);
                    trailCtx.fill();
                }
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }
}

// CSS for particle animation
const particleCSS = `
    @keyframes particle-float {
        0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Inject particle CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize animation manager
const animationManager = new AnimationManager();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animationManager.init();
});

// Export globally
window.animationManager = animationManager;