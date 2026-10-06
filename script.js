document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .skill-category, .project-card, .timeline-item, .list-item, .reference-item, .contact-card, .about-content p');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        const delay = (index % 10) * 0.1;
        el.style.transition = `opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`;
        observer.observe(el);
    });

    // Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-contact-modal');
    const closeBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contact-form');

    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            contactForm.reset();
            if (modal) modal.classList.remove('show');
        });
    }

    // Background Canvas Animation (AI/Automation Neural Network effect)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            // Calculate responsive particle count based on screen width (max 80 for performance)
            const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.6)'; // accent-color
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw connecting lines (neural network effect)
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        // opacity based on distance
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - distance / 1000})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();
        
        window.addEventListener('resize', () => {
            init();
        });
    }

    // Orbit Skills Interactive Logic
    const skillsDataElem = document.getElementById('skills-data-json');
    if (skillsDataElem) {
        try {
            const skillsData = JSON.parse(skillsDataElem.textContent);
            const nodes = document.querySelectorAll('.planet-node');
            const placeholder = document.getElementById('details-placeholder');
            const content = document.getElementById('details-content');
            const detailTitle = document.getElementById('detail-title');
            const detailIcon = document.getElementById('detail-icon');
            const detailTags = document.getElementById('detail-tags');

            nodes.forEach(node => {
                node.addEventListener('click', () => {
                    nodes.forEach(n => n.classList.remove('active'));
                    node.classList.add('active');

                    const category = node.getAttribute('data-category');
                    const data = skillsData[category];

                    if (data) {
                        placeholder.classList.add('hidden');
                        content.classList.remove('hidden');
                        
                        detailTitle.innerText = data.title;
                        detailIcon.className = 'fas ' + data.icon;
                        
                        detailTags.innerHTML = '';
                        data.tags.forEach(tagText => {
                            const span = document.createElement('span');
                            span.innerText = tagText;
                            detailTags.appendChild(span);
                        });
                    }
                });
            });
        } catch (e) {
            console.error("Error parsing skills data", e);
        }
    }

    // Coverflow Logic
    const coverflowItems = document.querySelectorAll('.coverflow-item');
    const prevBtn = document.getElementById('coverflow-prev');
    const nextBtn = document.getElementById('coverflow-next');
    
    if (coverflowItems.length > 0) {
        let currentIndex = 0;

        function updateCoverflow() {
            coverflowItems.forEach((item, index) => {
                item.className = 'coverflow-item'; // Reset classes
                
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === currentIndex - 1 || (currentIndex === 0 && index === coverflowItems.length - 1)) {
                    item.classList.add('prev-1');
                } else if (index === currentIndex + 1 || (currentIndex === coverflowItems.length - 1 && index === 0)) {
                    item.classList.add('next-1');
                } else if (index === currentIndex - 2 || 
                          (currentIndex === 1 && index === coverflowItems.length - 1) || 
                          (currentIndex === 0 && index === coverflowItems.length - 2)) {
                    item.classList.add('prev-2');
                } else if (index === currentIndex + 2 || 
                          (currentIndex === coverflowItems.length - 2 && index === 0) || 
                          (currentIndex === coverflowItems.length - 1 && index === 1)) {
                    item.classList.add('next-2');
                } else {
                    item.classList.add('hidden');
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? coverflowItems.length - 1 : currentIndex - 1;
                updateCoverflow();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === coverflowItems.length - 1) ? 0 : currentIndex + 1;
                updateCoverflow();
            });
        }
        
        coverflowItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (currentIndex !== index) {
                    currentIndex = index;
                    updateCoverflow();
                }
            });
        });

        // Initialize
        updateCoverflow();
    }
});
