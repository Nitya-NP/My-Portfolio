
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } }
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Skills toggle functionality
    const toggleSwitch = document.querySelector('.toggle-switch');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const skillSections = document.querySelectorAll('.skills-section');

    toggleOptions.forEach(option => {
        option.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            if (targetId === 'tech-skills') {
                toggleSwitch.classList.remove('softskills-active');
                toggleSwitch.classList.add('techskills-active');
            } else {
                toggleSwitch.classList.remove('techskills-active');
                toggleSwitch.classList.add('softskills-active');
            }

            // Show/hide 
            skillSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });
});