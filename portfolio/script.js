document.addEventListener('DOMContentLoaded', function() {
    // Create starfield background
    const starfield = document.querySelector('.starfield');
    
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        
        starfield.appendChild(star);
    }

    for (let i = 0; i < 150; i++) {
        createStar();
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .social-link, .contact-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
    });

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            showSection(targetId);
        });
    });

    // Show section function
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top of section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Load projects if projects section
            if (sectionId === '#projects') {
                loadProjects();
            }
        }
    }

    // Load projects
    function loadProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        // Sample projects data
        const projects = [
            {
                title: "Job Search App",
                description: "This app allows users to search for job listings from various job boards and display them seamlessly.",
                tags: ["HTML", "CSS", "JavaScript", "React"],
                image: "https://i.imgur.com/abc123.jpg",
                demo: "#",
                code: "#"
            },
            {
                title: "Link Shortener",
                description: "A simple link shortener that allows users to input a URL and generates a shortened version of that URL.",
                tags: ["HTML", "CSS", "JavaScript", "Node.js"],
                image: "https://i.imgur.com/def456.jpg",
                demo: "#",
                code: "#"
            },
            {
                title: "Chess Game",
                description: "An interactive chess game where users can play against the computer or another player.",
                tags: ["HTML", "CSS", "JavaScript"],
                image: "https://i.imgur.com/ghi789.jpg",
                demo: "#",
                code: "#"
            },
            {
                title: "Dating App",
                description: "A basic dating app that allows users to view profiles and like or dislike them.",
                tags: ["React", "Node.js", "MongoDB"],
                image: "https://i.imgur.com/jkl012.jpg",
                demo: "#",
                code: "#"
            },
            {
                title: "User Activity Tracker",
                description: "This app tracks user activities and displays them in a user-friendly format.",
                tags: ["JavaScript", "Firebase", "Chart.js"],
                image: "https://i.imgur.com/mno345.jpg",
                demo: "#",
                code: "#"
            },
            {
                title: "Survey App",
                description: "A survey application that allows users to submit feedback and view the responses.",
                tags: ["React", "Express", "MongoDB"],
                image: "https://i.imgur.com/pqr678.jpg",
                demo: "#",
                code: "#"
            }
        ];
        
        // Create project cards
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demo}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.code}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            
            console.log('Form submitted:', data);
            
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    showSection('#home');
});