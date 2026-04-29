// ============================================
// FUTURISTIC PORTFOLIO - COMPLETE JAVASCRIPT
// ============================================

class FuturisticPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.scrollY = 0;
        this.lerpScrollY = 0;
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        this.setupCanvas();
        this.setupNavigation();
        this.setupTypingAnimation();
        this.setupScrollAnimations();
        this.setupCursor();
        this.setupTiltEffect();
        this.setupSkillBars();
        this.setupStatsCounter();
        this.setupFormValidation();
        this.setupSmoothScroll();
        this.startAnimations();
    }

    // Canvas Particle Background
    setupCanvas() {
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Particle System
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.life = 1;
                this.decay = Math.random() * 0.01 + 0.005;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;

                if (this.x < 0 || this.x > canvas.width || 
                    this.y < 0 || this.y > canvas.height || 
                    this.life <= 0) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                const dynamicHue = (180 + window.scrollY * 0.05 + this.x * 0.1) % 360;
                ctx.fillStyle = `hsl(${dynamicHue}, 100%, 60%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 15;
                ctx.shadowColor = `hsl(${dynamicHue}, 100%, 50%)`;
                ctx.restore();
            }
        }

        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const lineHue = (180 + window.scrollY * 0.05) % 360;
                        ctx.strokeStyle = `hsla(${lineHue}, 100%, 50%, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Navigation
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        const cursor = document.querySelector('.typing-cursor');
        const text = "RACHIT SHARMA";
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                cursor.style.display = 'none';
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Smooth Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .skill-category, .stat-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Custom Cursor
    setupCursor() {
        const cursor = document.querySelector('.cursor');
        const cursor2 = document.querySelector('.cursor2');
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            cursor2.style.left = mouseX + 'px';
            cursor2.style.top = mouseY + 'px';
        });

        // Hover effects
        const hoverables = document.querySelectorAll('a, button, .project-card, .social-link');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor2.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor2.style.transform = 'scale(1)';
            });
        });
    }

    // 3D Tilt Effect
    setupTiltEffect() {
        const tiltCards = document.querySelectorAll('[data-tilt]');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width + '%';
                    skillBar.style.transition = 'width 2s ease-in-out';
                }
            });
        });

        skillBars.forEach(bar => observer.observe(bar));
    }

    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(current);
                    }, 20);
                    
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(number => observer.observe(number));
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                // Simulate form submission
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you! Your message has been sent. 🚀');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Smooth Scroll & Dynamic Pattern
    setupSmoothScroll() {
        const updateScroll = () => {
            this.lerpScrollY += (this.scrollY - this.lerpScrollY) * 0.08;
            
            // 1. Parallax
            const parallax = document.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${this.lerpScrollY * 0.4}px)`;
            }
            
            // 2. Dynamic Pattern/Color based on scroll
            const hue1 = (180 + this.lerpScrollY * 0.05) % 360;
            const hue2 = (270 + this.lerpScrollY * 0.08) % 360;
            const hue3 = (330 + this.lerpScrollY * 0.05) % 360;

            document.documentElement.style.setProperty('--primary-neon', `hsl(${hue1}, 100%, 50%)`);
            document.documentElement.style.setProperty('--secondary-neon', `hsl(${hue2}, 100%, 50%)`);
            document.documentElement.style.setProperty('--accent-neon', `hsl(${hue3}, 100%, 50%)`);
            
            // Update canvas background pattern dynamically
            document.documentElement.style.setProperty('--bg-grad-1', `hsla(${hue2}, 100%, 50%, 0.15)`);
            document.documentElement.style.setProperty('--bg-grad-2', `hsla(${hue1}, 100%, 50%, 0.1)`);
            document.documentElement.style.setProperty('--bg-pos-y', `${this.lerpScrollY * 0.5}px`);

            // Cursor glow dynamic color
            const cursor = document.querySelector('.cursor');
            const cursor2 = document.querySelector('.cursor2');
            if (cursor && cursor2) {
                cursor.style.backgroundColor = `hsl(${hue1}, 100%, 50%)`;
                cursor.style.boxShadow = `0 0 10px hsl(${hue1}, 100%, 50%)`;
                cursor2.style.borderColor = `hsla(${hue1}, 100%, 50%, 0.5)`;
                cursor2.style.backgroundColor = `hsla(${hue1}, 100%, 50%, 0.1)`;
            }

            requestAnimationFrame(updateScroll);
        };
        updateScroll();
    }

    // Start all animations
    startAnimations() {
        // Add initial animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FuturisticPortfolio();
});


window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});