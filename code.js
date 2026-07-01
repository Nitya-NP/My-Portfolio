
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


