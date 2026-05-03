/**
 * spa.js — Single-Page Application Logic
 * Youssef Ahmed Portfolio — UNIFIED ANIMATION SYSTEM v2
 *
 * Features:
 *  1. IntersectionObserver scroll reveal (.reveal -> .in-view)
 *  2. Active sidebar nav link highlighting on scroll
 *  3. Mobile drawer open/close
 *  4. Smooth anchor scroll
 *  5. Skill / service / project card animations
 *  6. Respects prefers-reduced-motion
 *
 * Animation tokens (mirror effects.css):
 *  All JS-driven transitions use the same easing strings and durations
 *  defined in effects.css so motion stays perfectly in sync.
 */

(function () {
    'use strict';

    /* ============================================================
       HELPERS
       ============================================================ */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Shared IntersectionObserver options — same threshold across all observers
    const IO_OPTS = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

    /* ============================================================
       1. SCROLL REVEAL — IntersectionObserver
       ============================================================ */
    function initScrollReveal() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                el.classList.add('in-view');
            });
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, IO_OPTS);

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ============================================================
       2. ACTIVE NAV LINK — highlights sidebar link for visible section
       ============================================================
       Strategy: passive scroll listener + getBoundingClientRect
       - Iterates all sections in reverse order
       - First (from bottom) whose top ≤ 30% viewport = active
       ============================================================ */
    function initActiveNav() {
        const sections  = Array.from(document.querySelectorAll('section[id]'));
        const navLinks  = document.querySelectorAll('#sidebar-nav a[href^="#"], #mobile-nav a[href^="#"]');

        if (!sections.length || !navLinks.length) return;

        let currentActiveId = null;

        function setActiveLink(id) {
            if (id === currentActiveId) return;
            currentActiveId = id;

            navLinks.forEach(link => {
                const isMatch = link.getAttribute('href') === '#' + id;
                link.classList.toggle('spa-active-nav',      isMatch);
                link.classList.toggle('text-slate-500',      !isMatch);
                link.classList.toggle('dark:text-slate-400', !isMatch);
            });

            if (history.replaceState) {
                history.replaceState(null, null, '#' + id);
            }
        }

        function updateActiveNav() {
            const triggerY = window.innerHeight * 0.30;
            let found = null;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].getBoundingClientRect().top <= triggerY) {
                    found = sections[i].id;
                    break;
                }
            }
            if (!found) found = sections[0].id;
            setActiveLink(found);
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    /* ============================================================
       3. MOBILE DRAWER
       ============================================================ */
    function initMobileDrawer() {
        const drawer   = document.getElementById('mobile-drawer');
        const overlay  = document.getElementById('mobile-overlay');
        const openBtn  = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('mobile-drawer-close');

        if (!drawer || !overlay || !openBtn) return;

        function openDrawer() {
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        }

        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            openBtn.focus();
        }

        openBtn.addEventListener('click', openDrawer);
        overlay.addEventListener('click', closeDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && drawer.classList.contains('open')) {
                closeDrawer();
            }
        });

        drawer.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    /* ============================================================
       4. SMOOTH ANCHOR SCROLL
       ============================================================ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').slice(1);
                const target   = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        });
    }

    /* ============================================================
       5. UPDATE INTERNAL LINKS — convert page.html links to #id
       ============================================================ */
    const PAGE_TO_ID = {
        'index.html':        'home',   './index.html':        'home',
        'about.html':        'about',  './about.html':        'about',
        'education.html':    'education', './education.html': 'education',
        'courses.html':      'courses', './courses.html':     'courses',
        'skills.html':       'skills', './skills.html':       'skills',
        'services.html':     'services', './services.html':   'services',
        'projects.html':     'projects', './projects.html':   'projects',
        'achievements.html': 'achievements', './achievements.html': 'achievements',
        'Achievements.html': 'achievements', './Achievements.html': 'achievements',
        'contact.html':      'contact', './contact.html':     'contact',
        'thanks.html':       'thanks', './thanks.html':       'thanks',
    };

    function updateInternalLinks() {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (PAGE_TO_ID[href]) {
                link.setAttribute('href', '#' + PAGE_TO_ID[href]);
                if (link.getAttribute('target') === '_blank') {
                    link.removeAttribute('target');
                }
            }
        });
    }

    /* ============================================================
       6. SKILL SECTION ANIMATIONS — cards, soft tags, lang bars
       ============================================================ */
    function initSkillAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll(
                '.skill-card-animated, .soft-tag-animated, .lang-item-animated, .comp-item-animated'
            ).forEach(el => {
                el.classList.add('is-visible');
                el.style.opacity   = '1';
                el.style.transform = 'none';
            });
            document.querySelectorAll('.lang-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width || '100%';
            });
            return;
        }

        // Single shared observer for cards / tags (unobserve after reveal — fire once)
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, IO_OPTS);

        document.querySelectorAll(
            '.skill-card-animated, .soft-tag-animated, .comp-item-animated'
        ).forEach(el => obs.observe(el));

        // Language items observed individually so bar fills fire at the right time
        document.querySelectorAll('.lang-item-animated').forEach(item => {
            const itemObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Slight delay so the reveal transition starts before the bar grows
                        setTimeout(() => {
                            entry.target.querySelectorAll('.lang-bar-fill').forEach(bar => {
                                bar.style.width = bar.dataset.width || '100%';
                            });
                        }, 120);
                        itemObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            itemObs.observe(item);
        });
    }

    /* ============================================================
       7. SERVICE SECTION ANIMATIONS — cards, tech tags, CTA
       ============================================================ */
    function initServiceAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.service-card-new').forEach(el => {
                el.classList.add('is-visible');
                el.style.opacity   = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const cardObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObs.unobserve(entry.target);
                }
            });
        }, IO_OPTS);

        document.querySelectorAll('.service-card-new').forEach(el => cardObs.observe(el));

        // Tech tags — staggered reveal driven by CSS vars (consistent with effects.css)
        const techSection = document.getElementById('services-tech-section');
        if (techSection) {
            const techObs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    techSection.querySelectorAll('.tech-tag-new').forEach((tag, i) => {
                        // Use CSS custom properties for duration/easing consistency
                        tag.style.opacity   = '0';
                        tag.style.transform = 'translateY(12px)';
                        tag.style.transition =
                            `opacity 0.32s cubic-bezier(0.4,0,0.2,1) ${i * 0.05}s, ` +
                            `transform 0.32s cubic-bezier(0.4,0,0.2,1) ${i * 0.05}s`;

                        // Double rAF ensures the browser has painted the hidden state
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                tag.style.opacity   = '1';
                                tag.style.transform = 'translateY(0)';
                            });
                        });
                    });
                    techObs.unobserve(techSection);
                }
            }, { threshold: 0.25 });
            techObs.observe(techSection);
        }
    }

    /* ============================================================
       8. PROJECT CARD ANIMATIONS — scroll-reveal with stagger
       ============================================================ */
    function initProjectAnimations() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.project-card').forEach(el => {
                el.classList.add('is-visible');
                el.style.opacity   = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const cardObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObs.unobserve(entry.target);
                }
            });
        }, IO_OPTS);

        document.querySelectorAll('.project-card').forEach(el => cardObs.observe(el));
    }

    /* ============================================================
       INIT
       ============================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        updateInternalLinks();
        initScrollReveal();
        initActiveNav();
        initMobileDrawer();
        initSmoothScroll();
        initSkillAnimations();
        initServiceAnimations();
        initProjectAnimations();
    });

})();

/* ============================================================
   9. DARK MODE TOGGLE — persists via localStorage
   ============================================================ */
(function initDarkMode() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');

    function updateIcons(dark) {
        document.querySelectorAll('.theme-icon, .theme-icon-mobile').forEach(el => {
            el.textContent = dark ? 'light_mode' : 'dark_mode';
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateIcons(document.documentElement.classList.contains('dark'));

        ['theme-toggle', 'theme-toggle-mobile'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('click', function () {
                const wasDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', wasDark ? 'dark' : 'light');
                updateIcons(wasDark);
            });
        });
    });
})();
