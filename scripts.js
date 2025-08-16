document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update active class
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.fixed-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Animation on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Here you would typically send the data to a server
      // For demo purposes, we'll just show a success message
      showNotification(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`, 'success');
      this.reset();
    });
  }
  
  // Button event listeners
  document.querySelector('.contact-btn')?.addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.querySelector('.portfolio-btn')?.addEventListener('click', function() {
    window.open('https://github.com/Swikriti-Bhusal', '_blank');
  });
  
  // Load projects dynamically
  loadProjects();
  
  // Helper functions
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Sample projects data - replace with your actual projects
    const projects = [
      {
        title: "E-Commerce Website",
        description: "A full-featured e-commerce platform built with Django and React with payment integration.",
        tags: ["Django", "React", "Stripe", "PostgreSQL"],
        image: "images/project1.jpg",
        demo: "#",
        code: "#"
      },
      {
        title: "Task Management App",
        description: "A productivity application for managing tasks with drag-and-drop functionality.",
        tags: ["JavaScript", "HTML/CSS", "Firebase"],
        image: "images/project2.jpg",
        demo: "#",
        code: "#"
      },
      {
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing my work and skills.",
        tags: ["HTML/CSS", "JavaScript", "Responsive Design"],
        image: "images/project3.jpg",
        demo: "#",
        code: "#"
      }
    ];
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card animate-on-scroll';
      
      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="${project.code}" target="_blank"><i class="fab fa-github"></i> View Code</a>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(projectCard);
    });
    
    // Observe the newly added project cards
    document.querySelectorAll('.project-card.animate-on-scroll').forEach(card => {
      observer.observe(card);
    });
  }
});