
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
   LOADING SCREEN
   - Shows the mini character "booting up" the site
   - Animated progress bar + code lines drawing in
   - Fades out once load completes (minimum display time
     so it doesn't just flash)
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderBarFill = document.querySelector('.loader-bar-fill');
    const loaderLine1 = document.getElementById('loader-line1');
    const loaderLine2 = document.getElementById('loader-line2');

    if (!loadingScreen) return;

    const MIN_DISPLAY_MS = 1400;
    const startTime = Date.now();

    // Animate progress bar and "typing" code lines on the laptop
    requestAnimationFrame(() => {
        if (loaderBarFill) loaderBarFill.style.width = '100%';
        if (loaderLine1) {
            loaderLine1.style.transition = 'width 0.8s ease 0.2s';
            loaderLine1.setAttribute('width', '14');
        }
        if (loaderLine2) {
            loaderLine2.style.transition = 'width 0.8s ease 0.6s';
            loaderLine2.setAttribute('width', '22');
        }
    });

    function hideLoader() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition for cleanliness
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 700);
        }, remaining);
    }

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
        // Fallback in case 'load' takes too long
        setTimeout(hideLoader, 4000);
    }
});


/* =========================================================
   THEME TOGGLE (dark / light)
   - Persists choice for the session
   - Mini character "puts on sunglasses" in light mode
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const miniGlasses = document.getElementById('mini-glasses');
    const miniSunglasses = document.getElementById('mini-sunglasses');
    const bigGlasses = document.getElementById('big-glasses');
    const bigSunglasses = document.getElementById('big-sunglasses');
    const miniBubble = document.getElementById('mini-bubble');
    const miniChar = document.getElementById('mini-char');

    if (!themeToggle) return;

    let storedTheme = 'dark';
    try {
        storedTheme = sessionStorage.getItem('portfolio-theme') || 'dark';
    } catch (e) {
        storedTheme = 'dark';
    }

    function applyTheme(theme, announce) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            if (miniGlasses) miniGlasses.setAttribute('opacity', '0');
            if (miniSunglasses) miniSunglasses.setAttribute('opacity', '1');
            if (bigGlasses) bigGlasses.setAttribute('opacity', '0');
            if (bigSunglasses) bigSunglasses.setAttribute('opacity', '1');
            if (announce && miniBubble && miniChar && miniChar.classList.contains('visible')) {
                miniBubble.textContent = "ooh bright! 😎";
                miniBubble.classList.add('show');
                clearTimeout(miniBubble._timeout);
                miniBubble._timeout = setTimeout(() => miniBubble.classList.remove('show'), 1800);
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            if (miniGlasses) miniGlasses.setAttribute('opacity', '1');
            if (miniSunglasses) miniSunglasses.setAttribute('opacity', '0');
            if (bigGlasses) bigGlasses.setAttribute('opacity', '1');
            if (bigSunglasses) bigSunglasses.setAttribute('opacity', '0');
            if (announce && miniBubble && miniChar && miniChar.classList.contains('visible')) {
                miniBubble.textContent = "cozy dark mode";
                miniBubble.classList.add('show');
                clearTimeout(miniBubble._timeout);
                miniBubble._timeout = setTimeout(() => miniBubble.classList.remove('show'), 1800);
            }
        }
        try {
            sessionStorage.setItem('portfolio-theme', theme);
        } catch (e) { /* ignore */ }
    }

    applyTheme(storedTheme, false);

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        applyTheme(isLight ? 'dark' : 'light', true);
    });
});


/* =========================================================
   RESUME HOVER PREVIEW — fallback handling
   - If resume.pdf can't be loaded (404), show a friendly
     placeholder instead of a broken embed
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const embed = document.querySelector('.resume-embed');
    const inner = document.querySelector('.resume-preview-inner');
    const wrapper = document.querySelector('.resume-wrapper');
    if (!embed || !inner || !wrapper) return;

    function showFallback() {
        inner.classList.add('no-pdf');
        inner.innerHTML = `<i class="fas fa-file-pdf"></i><span>Resume preview unavailable — click "Resume" to open the file directly.</span>`;
    }

    // fetch() over file:// is blocked by browsers (CORS), so don't rely on it.
    // Instead: try loading the PDF as a blob via XHR when running on http(s),
    // and for file:// just let the <embed> attempt to render — if the
    // browser can't show PDFs inline (or the file is missing), swap to fallback
    // after a short delay if nothing rendered.
    if (location.protocol === 'file:') {
        // Can't reliably detect 404 on file://; show preview only on hover
        // and fall back gracefully if the embed reports an error.
        embed.addEventListener('error', showFallback);

        // Heuristic: if embed has zero natural size after load attempt, fallback
        wrapper.addEventListener('mouseenter', () => {
            setTimeout(() => {
                if (embed.offsetHeight === 0 || !embed.getSVGDocument) {
                    // can't fully verify on file://, leave embed as-is;
                    // most browsers will show their native "can't display" UI
                    // inside the embed itself, which is acceptable.
                }
            }, 300);
        }, { once: true });
    } else {
        fetch('resume.pdf', { method: 'HEAD' })
            .then(res => {
                if (!res.ok) throw new Error('not found');
            })
            .catch(showFallback);
    }
});


/* =========================================================
   KONAMI CODE EASTER EGG
   ↑ ↑ ↓ ↓ ← → ← → B A  →  confetti + character celebration
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const konamiMsg = document.getElementById('konami-msg');
    const canvas = document.getElementById('confetti-canvas');
    const miniChar = document.getElementById('mini-char');
    const miniBubble = document.getElementById('mini-bubble');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const KONAMI_SEQUENCE = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let progress = 0;

    const confettiColors = ['#5cc3ff', '#ff72da', '#a0ffb0', '#ffd700', '#ffffff'];
    let confettiPieces = [];
    let confettiAnimationId = null;

    function spawnConfetti() {
        confettiPieces = [];
        const count = 140;
        for (let i = 0; i < count; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * canvas.height * 0.5,
                size: 4 + Math.random() * 6,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                speedY: 2 + Math.random() * 3,
                speedX: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }
        if (!confettiAnimationId) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let stillActive = false;

        confettiPieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            if (p.y < canvas.height + 20) stillActive = true;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        if (stillActive) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiAnimationId = null;
        }
    }

    function triggerKonami() {
        spawnConfetti();

        if (konamiMsg) {
            konamiMsg.classList.add('show');
            setTimeout(() => konamiMsg.classList.remove('show'), 3500);
        }

        if (miniChar && miniChar.classList.contains('visible')) {
            miniChar.classList.remove('bobbing');
            miniChar.classList.add('celebrate');
            if (miniBubble) {
                miniBubble.textContent = "you found it! 🎉";
                miniBubble.classList.add('show');
                clearTimeout(miniBubble._timeout);
                miniBubble._timeout = setTimeout(() => miniBubble.classList.remove('show'), 3000);
            }
            setTimeout(() => {
                miniChar.classList.remove('celebrate');
                miniChar.classList.add('bobbing');
            }, 1800);
        }
    }

    window.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const expected = KONAMI_SEQUENCE[progress];

        if (key === expected) {
            progress++;
            if (progress === KONAMI_SEQUENCE.length) {
                triggerKonami();
                progress = 0;
            }
        } else {
            // Allow restarting the sequence if the first key matches
            progress = (key === KONAMI_SEQUENCE[0]) ? 1 : 0;
        }
    });
});


/* =========================================================
   PERCHED MINI CHARACTER
   - Hidden while in the Intro section (big character shown there)
   - Once scrolled past Intro, she appears perched on a
     section (top corner of Projects, edge of Skills toggle,
     side of an Experience item, etc.) depending on what's
     in view
   - Hovering/clicking interactive elements (project cards,
     skill cards, timeline items, skills toggle, nav links,
     socials) triggers an expression change + speech bubble
   - Clicking the character herself 10 times makes her dizzy
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const miniChar = document.getElementById('mini-char');
    const miniEyes = document.getElementById('mini-eyes');
    const miniMouth = document.getElementById('mini-mouth');
    const miniBrows = document.getElementById('mini-brows');
    const miniBlushL = document.getElementById('mini-blush-l');
    const miniBlushR = document.getElementById('mini-blush-r');
    const miniThought = document.getElementById('mini-thought');
    const miniDizzy = document.getElementById('mini-dizzy');
    const miniBubble = document.getElementById('mini-bubble');
    const introSection = document.getElementById('Intro');

    if (!miniChar || !miniEyes || !miniMouth) return;

    // Skip entirely on touch / small screens (CSS also hides it)
    if (window.matchMedia('(max-width: 768px)').matches) return;

    if (miniChar.parentElement !== document.body) {
        document.body.appendChild(miniChar);
    }
    document.body.style.position = document.body.style.position || 'relative';

    let isHovering = false;
    let isVisible = false;
    let currentExpression = 'default';
    let perchTimeout = null;
    let clickCount = 0;
    let isDizzy = false;

    /* ---------- Expression templates ---------- */
    const expressions = {
        default: {
            eyes: `<circle cx="16.5" cy="35" r="2.5" fill="#2d1a0e"/><circle cx="35.5" cy="35" r="2.5" fill="#2d1a0e"/>`,
            mouth: `<path d="M18 44 Q26 50 34 44" stroke="#c47a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            brows: `<path d="M10 29 L23 31" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M29 31 L42 29" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0,
            thought: 0
        },
        smile: {
            eyes: `<path d="M11 35 Q16.5 30 22 35" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>
                   <path d="M30 35 Q35.5 30 40 35" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>`,
            mouth: `<path d="M17 43 Q26 52 35 43" stroke="#c47a5a" stroke-width="1.5" fill="#f9c99a" opacity="0.5"/>
                    <path d="M17 43 Q26 52 35 43" stroke="#c47a5a" stroke-width="1.5" fill="none"/>`,
            brows: `<path d="M10 28 Q16.5 24 23 27" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M29 27 Q35.5 24 42 28" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0.6,
            thought: 0
        },
        wow: {
            eyes: `<circle cx="16.5" cy="35" r="4" fill="#7B4A2D"/><circle cx="35.5" cy="35" r="4" fill="#7B4A2D"/>
                   <circle cx="16.5" cy="35" r="2.2" fill="#1a0a02"/><circle cx="35.5" cy="35" r="2.2" fill="#1a0a02"/>
                   <circle cx="18" cy="33.5" r="1.2" fill="white" opacity="0.9"/><circle cx="37" cy="33.5" r="1.2" fill="white" opacity="0.9"/>`,
            mouth: `<ellipse cx="26" cy="45" rx="4" ry="5" fill="none" stroke="#c47a5a" stroke-width="1.5"/>`,
            brows: `<path d="M9 25 Q16.5 21 24 25" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M28 25 Q35.5 21 43 25" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0.45,
            thought: 0
        },
        thinking: {
            eyes: `<circle cx="16.5" cy="36" r="2.5" fill="#2d1a0e"/><circle cx="35.5" cy="36" r="2.5" fill="#2d1a0e"/>
                   <line x1="9" y1="28" x2="21" y2="26" stroke="#f5c5a3" stroke-width="2.5"/>`,
            mouth: `<path d="M18 44 Q22 41 26 44 Q30 47 34 44" stroke="#c47a5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            brows: `<path d="M8 27 Q16.5 22 24 26" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M29 30 L42 30" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0.15,
            thought: 1
        },
        wave: {
            eyes: `<path d="M11 35 Q16.5 30 22 35" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>
                   <path d="M30 35 Q35.5 30 40 35" stroke="#2d1a0e" stroke-width="2" fill="none" stroke-linecap="round"/>`,
            mouth: `<path d="M17 43 Q26 52 35 43" stroke="#c47a5a" stroke-width="1.5" fill="#f9c99a" opacity="0.5"/>
                    <path d="M17 43 Q26 52 35 43" stroke="#c47a5a" stroke-width="1.5" fill="none"/>`,
            brows: `<path d="M10 28 Q16.5 24 23 27" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M29 27 Q35.5 24 42 28" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0.6,
            thought: 0
        },
        dizzy: {
            eyes: `<path d="M13 33 L20 38 M20 33 L13 38" stroke="#2d1a0e" stroke-width="1.8" stroke-linecap="round"/>
                   <path d="M32 33 L39 38 M39 33 L32 38" stroke="#2d1a0e" stroke-width="1.8" stroke-linecap="round"/>`,
            mouth: `<ellipse cx="26" cy="45" rx="5" ry="3" fill="none" stroke="#c47a5a" stroke-width="1.5"/>`,
            brows: `<path d="M9 27 Q16.5 23 24 27" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                    <path d="M28 27 Q35.5 23 43 27" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
            blush: 0.5,
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

    /* ---------- Perch position helper ---------- */
    function perchOn(el, opts) {
        if (!el) return;
        opts = opts || {};
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        let top = rect.top + scrollY + (opts.offsetY || 0);
        let left;

        if (opts.side === 'right') {
            left = rect.right + scrollX + (opts.offsetX || 8);
            miniChar.style.left = `${left}px`;
            miniChar.style.right = 'auto';
            miniChar.classList.remove('flip-bubble');
        } else if (opts.side === 'left') {
            left = rect.left + scrollX - 58 - (opts.offsetX || 8);
            miniChar.style.left = `${left}px`;
            miniChar.style.right = 'auto';
            miniChar.classList.add('flip-bubble');
        } else {
            left = rect.right + scrollX - 44;
            miniChar.style.left = `${left}px`;
            miniChar.style.right = 'auto';
            miniChar.classList.remove('flip-bubble');
        }

        miniChar.style.top = `${top}px`;
    }

    function showMini() {
        if (isVisible) return;
        isVisible = true;
        miniChar.classList.add('visible', 'bobbing');
    }

    function hideMini() {
        if (!isVisible) return;
        isVisible = false;
        miniChar.classList.remove('visible', 'bobbing');
    }

    /* ---------- Decide where to perch based on scroll position ---------- */
    const sections = [
        { el: document.getElementById('Projects'), anchor: () => document.querySelector('.projects-grid .project-card:first-child'), opts: { side: 'right', offsetX: 10, offsetY: -10 } },
        { el: document.getElementById('Experiences'), anchor: () => document.querySelector('.timeline-grid .timeline-item:first-child .timeline-body'), opts: { side: 'right', offsetX: 10, offsetY: -10 } },
        { el: document.getElementById('Skills'), anchor: () => document.querySelector('.toggle-switch'), opts: { side: 'right', offsetX: 14, offsetY: -30 } },
        { el: document.getElementById('Contact'), anchor: () => document.querySelector('.contact-logos'), opts: { side: 'right', offsetX: 14, offsetY: -20 } }
    ];

    let currentSection = null;

    function updatePerch() {
        if (!introSection) return;
        const introBottom = introSection.offsetTop + introSection.offsetHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportMid = scrollY + window.innerHeight / 2;

        if (scrollY < introBottom - window.innerHeight * 0.5) {
            hideMini();
            currentSection = null;
            return;
        }

        let active = null;
        for (const s of sections) {
            if (!s.el) continue;
            const top = s.el.offsetTop;
            const bottom = top + s.el.offsetHeight;
            if (viewportMid >= top && viewportMid < bottom) {
                active = s;
                break;
            }
        }

        if (!active) {
            active = sections[sections.length - 1];
        }

        if (active !== currentSection) {
            currentSection = active;
            const anchorEl = active.anchor ? active.anchor() : active.el;
            if (anchorEl) {
                perchOn(anchorEl, active.opts);
                showMini();
                if (!isHovering && !isDizzy) {
                    setExpression('wave');
                    showBubble("hi! 👋", 1500);
                    setTimeout(() => {
                        if (!isHovering && !isDizzy) setExpression('default');
                    }, 1600);
                }
            }
        }
    }

    window.addEventListener('scroll', () => {
        clearTimeout(perchTimeout);
        perchTimeout = setTimeout(updatePerch, 80);
    });
    window.addEventListener('resize', () => {
        if (currentSection) {
            const anchorEl = currentSection.anchor ? currentSection.anchor() : currentSection.el;
            if (anchorEl) perchOn(anchorEl, currentSection.opts);
        }
    });

    /* ---------- Hover / click reactions on page elements ---------- */
    function attachReaction(selector, mood, bubbleText) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!isVisible || isDizzy) return;
                isHovering = true;
                miniChar.classList.remove('bobbing');
                setExpression(mood);
                if (bubbleText) showBubble(bubbleText, 2200);
            });

            el.addEventListener('mouseleave', () => {
                isHovering = false;
                if (!isDizzy) {
                    miniChar.classList.add('bobbing');
                    setExpression('default');
                }
            });

            el.addEventListener('click', () => {
                if (!isVisible || isDizzy) return;
                setExpression(mood);
                if (bubbleText) showBubble(bubbleText, 2000);
                setTimeout(() => {
                    if (!isHovering && !isDizzy) setExpression('default');
                }, 2000);
            });
        });
    }

    attachReaction('.project-card', 'wow', "nice project! ✨");
    attachReaction('.skill-card', 'thinking', "hmm, useful!");
    attachReaction('.timeline-body', 'smile', "good times 😊");
    attachReaction('.toggle-option', 'thinking', "let's switch!");
    attachReaction('.nav-link', 'smile', null);
    attachReaction('.fixed-sidebar a', 'wow', "let's connect!");
    attachReaction('.contact-logos a', 'wave', "say hi! 👋");

    /* ---------- Click counter on the character herself ---------- */
    const dizzyBubbleLines = [
        "hey! 😄",
        "tickles!",
        "hehe stop~",
        "okay that's a lot...",
        "getting dizzy...",
        "whoaaa 😵"
    ];

    miniChar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isVisible || isDizzy) return;

        clickCount++;

        if (clickCount < dizzyBubbleLines.length) {
            showBubble(dizzyBubbleLines[clickCount - 1], 1200);
            setExpression('smile');
            setTimeout(() => {
                if (!isHovering && !isDizzy) setExpression('default');
            }, 1200);
        }

        if (clickCount >= 10) {
            isDizzy = true;
            miniChar.classList.remove('bobbing');
            miniChar.classList.add('dizzy');
            setExpression('dizzy');
            if (miniDizzy) miniDizzy.setAttribute('opacity', '1');
            showBubble("okay stop that 😅", 2200);

            setTimeout(() => {
                miniChar.classList.remove('dizzy');
                miniChar.classList.add('bobbing');
                if (miniDizzy) miniDizzy.setAttribute('opacity', '0');
                setExpression('default');
                clickCount = 0;
                isDizzy = false;
            }, 2400);
        }
    });

    // Initial state
    setExpression('default');
    updatePerch();
});
