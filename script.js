/* ============================================
   KRISHAL KARNA — PORTFOLIO SCRIPTS
   Minimal, clean, no external dependencies
   ============================================ */

(function () {
    'use strict';

    // --- DOM Elements ---
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // --- Mobile Nav Overlay ---
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // --- Scroll Progress Indicator ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // --- Theme ---
    function initTheme() {
        const saved = localStorage.getItem('theme');
        // Default to dark if no saved preference
        const theme = saved || 'dark';
        html.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    function toggleTheme() {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        // Dark mode → show sun (click to go light). Light mode → show moon (click to go dark).
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // --- Mobile Navigation ---
    function openMobileNav() {
        navLinks.classList.add('active');
        hamburger.classList.add('active');
        overlay.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.contains('active');
            isOpen ? closeMobileNav() : openMobileNav();
        });
    }

    overlay.addEventListener('click', closeMobileNav);

    // Close mobile nav on link click
    document.querySelectorAll('#nav-links a').forEach(function (link) {
        link.addEventListener('click', closeMobileNav);
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Navbar Scroll Effect ---
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';

        lastScroll = scrollTop;
    });

    // --- Active Nav Link Tracking ---
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('#nav-links a');

    function updateActiveNav() {
        var scrollPos = window.pageYOffset + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navAnchors.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // --- Section Reveal on Scroll ---
    var revealSections = document.querySelectorAll('.section');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealSections.forEach(function (section) {
        revealObserver.observe(section);
    });

    // --- Certificate See More ---
    var certBtn = document.getElementById('certs-see-more-btn');
    var certMore = document.getElementById('certs-more-wrapper');
    var certBtnLabel = document.getElementById('certs-btn-label');

    if (certBtn && certMore) {
        certBtn.addEventListener('click', function () {
            var isOpen = certMore.classList.contains('expanded');
            if (isOpen) {
                certMore.classList.remove('expanded');
                certBtn.classList.remove('open');
                certBtn.setAttribute('aria-expanded', 'false');
                certBtnLabel.textContent = 'See more certifications';
            } else {
                certMore.classList.add('expanded');
                certBtn.classList.add('open');
                certBtn.setAttribute('aria-expanded', 'true');
                certBtnLabel.textContent = 'See fewer certifications';
            }
        });
    }

    // --- Footer Year ---
    var footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // --- Init ---
    initTheme();

    // Trigger scroll handler on load
    window.dispatchEvent(new Event('scroll'));
})();