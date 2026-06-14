
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


/* =========================================================
   ROAMING MINI CHARACTER
   - Hidden while the user is in the Intro section (big
     character is shown there instead)
   - Once scrolled past Intro, she appears and randomly
     wanders to new spots on screen every few seconds
   - Hovering over interactive elements (project cards,
     skill cards, timeline items, nav links, socials)
     triggers an expression change + speech bubble
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const miniChar = document.getElementById('mini-char');
    const miniEyes = document.getElementById('mini-eyes');
    const miniMouth = document.getElementById('mini-mouth');
    const miniBrows = document.getElementById('mini-brows');
    const miniBlushL = document.getElementById('mini-blush-l');
    const miniBlushR = document.getElementById('mini-blush-r');
    const miniThought = document.getElementById('mini-thought');
    const miniBubble = document.getElementById('mini-bubble');
    const introSection = document.getElementById('Intro');

    if (!miniChar || !miniEyes || !miniMouth) return;

    // Skip entirely on touch / small screens (CSS also hides it)
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const CHAR_W = 70;
    const CHAR_H = 102;
    const MARGIN = 20;

    let roamTimer = null;
    let isRoaming = false;
    let isHovering = false;
    let currentExpression = 'default';

    /* ---------- Expression templates ---------- */
    const expressions = {
        default: {
            eyes: `<circle cx="17" cy="60" r="2.5" fill="#2d1a0e"/><circle cx="35" cy="60" r="2.5" fill="#2d1a0e"/>`,
            mouth: `<path d="M19 68 Q26 73 33 68" stroke="#c47a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            brows: `<path d="M11 54 Q17 50 23 54" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <path d="M29 54 Q35 50 41 54" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
            blush: 0,
            thought: 0
        },
        smile: {
            eyes: `<path d="M12 60 Q17 55 22 60" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>
                   <path d="M30 60 Q35 55 40 60" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>`,
            mouth: `<path d="M17 67 Q26 76 35 67" stroke="#c47a5a" stroke-width="1.5" fill="#f9c99a" opacity="0.5"/>
                    <path d="M17 67 Q26 76 35 67" stroke="#c47a5a" stroke-width="1.5" fill="none"/>`,
            brows: `<path d="M11 53 Q17 49 23 52" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <path d="M29 52 Q35 49 41 53" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
            blush: 0.6,
            thought: 0
        },
        wow: {
            eyes: `<circle cx="17" cy="60" r="4" fill="#7B4A2D"/><circle cx="35" cy="60" r="4" fill="#7B4A2D"/>
                   <circle cx="17" cy="60" r="2.2" fill="#1a0a02"/><circle cx="35" cy="60" r="2.2" fill="#1a0a02"/>
                   <circle cx="18.5" cy="58.5" r="1.2" fill="white" opacity="0.9"/><circle cx="36.5" cy="58.5" r="1.2" fill="white" opacity="0.9"/>`,
            mouth: `<ellipse cx="26" cy="69" rx="4" ry="5" fill="none" stroke="#c47a5a" stroke-width="1.5"/>`,
            brows: `<path d="M10 50 Q17 46 24 50" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <path d="M28 50 Q35 46 42 50" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
            blush: 0.45,
            thought: 0
        },
        thinking: {
            eyes: `<circle cx="17" cy="61" r="2.5" fill="#2d1a0e"/><circle cx="35" cy="61" r="2.5" fill="#2d1a0e"/>
                   <line x1="10" y1="53" x2="22" y2="51" stroke="#f5c5a3" stroke-width="2.5"/>`,
            mouth: `<path d="M19 68 Q23 65 26 68 Q29 71 33 68" stroke="#c47a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            brows: `<path d="M9 52 Q17 47 24 51" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <path d="M29 54 Q35 51 41 54" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
            blush: 0.15,
            thought: 1
        },
        wave: {
            eyes: `<path d="M12 60 Q17 55 22 60" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>
                   <path d="M30 60 Q35 55 40 60" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>`,
            mouth: `<path d="M17 67 Q26 76 35 67" stroke="#c47a5a" stroke-width="1.5" fill="#f9c99a" opacity="0.5"/>
                    <path d="M17 67 Q26 76 35 67" stroke="#c47a5a" stroke-width="1.5" fill="none"/>`,
            brows: `<path d="M11 53 Q17 49 23 52" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    <path d="M29 52 Q35 49 41 53" stroke="#1a1a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
            blush: 0.6,
            thought: 0
        }
    };

    function setExpression(name) {
        const exp = expressions[name] || expressions.default;
        currentExpression = name;
        miniEyes.innerHTML = exp.eyes;
        miniMouth.innerHTML = exp.mouth;
        if (miniBrows) miniBrows.innerHTML = exp.brows;
        if (miniBlushL) miniBlushL.setAttribute('opacity', exp.blush);
        if (miniBlushR) miniBlushR.setAttribute('opacity', exp.blush);
        if (miniThought) miniThought.setAttribute('opacity', exp.thought);
    }

    function showBubble(text, duration) {
        if (!miniBubble) return;
        miniBubble.textContent = text;
        miniBubble.classList.add('show');
        clearTimeout(miniBubble._timeout);
        miniBubble._timeout = setTimeout(() => {
            miniBubble.classList.remove('show');
        }, duration || 1600);
    }

    /* ---------- Position helpers ---------- */
    function setPosition(x, y) {
        // Clamp within viewport
        const maxX = window.innerWidth - CHAR_W - MARGIN;
        const maxY = window.innerHeight - CHAR_H - MARGIN;
        const clampedX = Math.max(MARGIN, Math.min(x, maxX));
        const clampedY = Math.max(MARGIN, Math.min(y, maxY));

        miniChar.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

        // Flip bubble if too close to the right edge
        if (clampedX > window.innerWidth - 220) {
            miniChar.classList.add('flip-bubble');
        } else {
            miniChar.classList.remove('flip-bubble');
        }
    }

    function randomPosition() {
        const maxX = window.innerWidth - CHAR_W - MARGIN;
        const maxY = window.innerHeight - CHAR_H - MARGIN;
        const x = MARGIN + Math.random() * Math.max(0, maxX - MARGIN);
        const y = MARGIN + Math.random() * Math.max(0, maxY - MARGIN);
        return { x, y };
    }

    /* ---------- Roaming loop ---------- */
    function roam() {
        if (isHovering) {
            // try again shortly if currently engaged with something
            roamTimer = setTimeout(roam, 1500);
            return;
        }
        const { x, y } = randomPosition();
        setPosition(x, y);

        // occasional little reaction while wandering
        if (Math.random() < 0.25) {
            const moods = ['smile', 'thinking', 'wow'];
            const mood = moods[Math.floor(Math.random() * moods.length)];
            setExpression(mood);
            setTimeout(() => {
                if (!isHovering) setExpression('default');
            }, 1400);
        }

        const nextDelay = 3000 + Math.random() * 3000; // 3-6s
        roamTimer = setTimeout(roam, nextDelay);
    }

    function startRoaming() {
        if (isRoaming) return;
        isRoaming = true;
        miniChar.classList.add('visible', 'bobbing');
        const { x, y } = randomPosition();
        setPosition(x, y);
        setExpression('wave');
        showBubble("hi there! 👋", 1800);
        setTimeout(() => {
            if (!isHovering) setExpression('default');
        }, 2000);
        roamTimer = setTimeout(roam, 4000);
    }

    function stopRoaming() {
        if (!isRoaming) return;
        isRoaming = false;
        miniChar.classList.remove('visible', 'bobbing');
        clearTimeout(roamTimer);
    }

    /* ---------- Scroll listener: show/hide based on Intro ---------- */
    let hasGreeted = false;
    window.addEventListener('scroll', () => {
        if (!introSection) return;
        const introBottom = introSection.offsetTop + introSection.offsetHeight;
        const pastIntro = window.scrollY > introBottom - window.innerHeight * 0.5;

        if (pastIntro) {
            startRoaming();
            hasGreeted = true;
        } else {
            stopRoaming();
        }
    });

    /* ---------- Hover reactions ---------- */
    function attachHover(selector, mood, bubbleText) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!isRoaming) return;
                isHovering = true;
                clearTimeout(roamTimer);
                miniChar.classList.remove('bobbing');

                // Move near the hovered element (offset so it doesn't cover it)
                const rect = el.getBoundingClientRect();
                let targetX = rect.right + 16;
                let targetY = rect.top + rect.height / 2 - CHAR_H / 2;

                // If too close to right edge, place to the left instead
                if (targetX + CHAR_W > window.innerWidth - MARGIN) {
                    targetX = rect.left - CHAR_W - 16;
                }
                if (targetX < MARGIN) targetX = MARGIN;

                setPosition(targetX, targetY);
                setExpression(mood);
                if (bubbleText) showBubble(bubbleText, 2200);
            });

            el.addEventListener('mouseleave', () => {
                isHovering = false;
                miniChar.classList.add('bobbing');
                setExpression('default');
                if (isRoaming) {
                    clearTimeout(roamTimer);
                    roamTimer = setTimeout(roam, 1200);
                }
            });
        });
    }

    attachHover('.project-card', 'wow', "nice project! ✨");
    attachHover('.skill-card', 'thinking', "hmm, useful!");
    attachHover('.timeline-body', 'smile', "good times 😊");
    attachHover('.nav-link', 'smile', null);
    attachHover('.fixed-sidebar a', 'wow', "let's connect!");
    attachHover('.contact-logos a', 'wave', "say hi! 👋");

    // Initial state
    setExpression('default');

    // In case the page is already scrolled on load (e.g. refresh mid-page)
    if (window.scrollY > 0) {
        const introBottom = introSection ? introSection.offsetTop + introSection.offsetHeight : 0;
        if (window.scrollY > introBottom - window.innerHeight * 0.5) {
            startRoaming();
        }
    }

    // Re-clamp position on resize
    window.addEventListener('resize', () => {
        if (!isRoaming) return;
        const { x, y } = randomPosition();
        setPosition(x, y);
    });
});
