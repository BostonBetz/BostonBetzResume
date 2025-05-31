// Crystal Particle Effect for background

(function() {
    const canvas = document.getElementById('crystalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Create particles
    const particles = [];
    const particleCount = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
            this.angle = 0;
            this.spin = Math.random() * 0.05 - 0.025;
            this.shape = Math.floor(Math.random() * 3);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.angle += this.spin;

            // Keep particles within canvas
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;

            // Draw different crystal-like shapes
            switch(this.shape) {
                case 0:
                    // Hexagon
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        ctx.lineTo(Math.cos(angle) * this.size * 2, Math.sin(angle) * this.size * 2);
                    }
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 1:
                    // Diamond
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 2);
                    ctx.lineTo(this.size * 2, 0);
                    ctx.lineTo(0, this.size * 2);
                    ctx.lineTo(-this.size * 2, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 2:
                    // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 2);
                    ctx.lineTo(this.size * 2, this.size * 2);
                    ctx.lineTo(-this.size * 2, this.size * 2);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }

            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.x;
        mouseY = e.y;
    });

    // Apply mouse effect to particles
    function interactWithParticles() {
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                const force = (mouseRadius - distance) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                const moveX = Math.cos(angle) * force * 5;
                const moveY = Math.sin(angle) * force * 5;

                particle.x -= moveX;
                particle.y -= moveY;
            }
        });

        requestAnimationFrame(interactWithParticles);
    }

    interactWithParticles();
})();<!-- Crystal Particle Canvas -->
<canvas id="crystalCanvas" class="crystal-canvas"></canvas>