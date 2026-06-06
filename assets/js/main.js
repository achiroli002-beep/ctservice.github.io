/* ==============================================
   [NOME AZIENDA] — Main JS
   ============================================== */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------
     Header — scroll shadow
  ----------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  /* -----------------------------------------------
     Mobile nav
  ----------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    /* Close mobile nav when clicking any anchor link */
    mobileNav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  /* -----------------------------------------------
     Active nav link — scroll spy (one-page)
  ----------------------------------------------- */
  const mainSections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (mainSections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(l => l.removeAttribute('aria-current'));
            const active = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
            if (active) active.setAttribute('aria-current', 'page');
          }
        });
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    );
    mainSections.forEach(s => spyObserver.observe(s));
  }

  /* -----------------------------------------------
     Scroll reveal (IntersectionObserver)
  ----------------------------------------------- */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
  }

  /* -----------------------------------------------
     Counter animation (IntersectionObserver)
  ----------------------------------------------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounter(el) {
    if (reducedMotion) {
      el.textContent = el.dataset.counter + (el.dataset.suffix || '');
      return;
    }
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.round(target * easeOutCubic(progress)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      }),
      { threshold: 0.6 }
    );
    document.querySelectorAll('[data-counter]').forEach(el => cio.observe(el));
  }

  /* -----------------------------------------------
     Product configurator — color swatches
     Supports data-tint="elementId" on .swatch-row
     for full-product sections outside .product-card
  ----------------------------------------------- */
  document.querySelectorAll('.swatch-row').forEach(row => {
    const swatches = row.querySelectorAll('.swatch');
    const card = row.closest('.product-card');
    const tintId = row.dataset.tint;
    const tint = tintId
      ? document.getElementById(tintId)
      : (card ? card.querySelector('.color-tint') : null);

    swatches.forEach(sw => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('is-active'));
        sw.classList.add('is-active');
        if (tint) {
          tint.style.backgroundColor = sw.dataset.color;
          tint.style.opacity = '0.18';
        }
      });
    });
    if (swatches[0]) swatches[0].classList.add('is-active');
  });

  /* -----------------------------------------------
     Product configurator — option tabs
     Falls back to parentElement when outside .product-card
  ----------------------------------------------- */
  document.querySelectorAll('.config-tabs').forEach(tabBar => {
    const tabs = tabBar.querySelectorAll('.cfg-tab');
    const card = tabBar.closest('.product-card');
    const container = card || tabBar.parentElement;
    const panels = container ? container.querySelectorAll('.cfg-panel') : [];

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        if (panels[i]) panels[i].classList.add('is-active');
      });
    });
    if (tabs[0])   tabs[0].classList.add('is-active');
    if (panels[0]) panels[0].classList.add('is-active');
  });

  /* -----------------------------------------------
     Form validation
  ----------------------------------------------- */
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const err = field.closest('.form-group')?.querySelector('.form-err');
        const empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        if (empty || badEmail) {
          field.classList.add('err');
          if (err) {
            err.textContent = badEmail ? 'Inserisci un indirizzo email valido.' : 'Campo obbligatorio.';
            err.classList.add('show');
          }
          valid = false;
        } else {
          field.classList.remove('err');
          if (err) err.classList.remove('show');
        }
      });

      if (valid) {
        /* TODO: sostituire con fetch() verso endpoint backend/email service
           Esempio: fetch('/api/send', { method:'POST', body: new FormData(form) }) */
        const existing = form.querySelector('.form-success');
        if (!existing) {
          const msg = document.createElement('div');
          msg.className = 'form-success';
          msg.textContent = '✓ Richiesta inviata. Vi risponderemo entro 24 ore lavorative.';
          form.appendChild(msg);
          form.reset();
        }
      }
    });

    /* Live clear on valid input */
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('err');
          const err = field.closest('.form-group')?.querySelector('.form-err');
          if (err) err.classList.remove('show');
        }
      });
    });
  });

})();
