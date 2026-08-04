/* ============================================
   Davi M&A — Landing Page Scripts
   ============================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  function initReveal() {
    var elements = document.querySelectorAll('.rv');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ── Mobile Navigation ── */
  function initMobileNav() {
    var hamburger = document.getElementById('navHamburger');
    var mobileMenu = document.getElementById('mobileMenu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Smooth Scroll (fallback for older browsers) ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('header').offsetHeight;
          var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Stats Counter Animation ── */
  function initCounters() {
    var stats = document.querySelectorAll('[data-count]');
    if (!stats.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ── Active nav link highlighting ── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--safra-navy)';
            }
          });
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ── Hero Background Video ── */
  function initHeroVideo() {
    var video = document.querySelector('.hero-video');
    if (!video) return;
    // Fade in once ready to play
    video.addEventListener('canplaythrough', function () {
      video.classList.add('loaded');
    });

    // If already cached/ready
    if (video.readyState >= 4) {
      video.classList.add('loaded');
    }

    // Pause when scrolled away for performance
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  }

  /* ── Áreas de Atuação: abas ── */
  function initAreaTabs() {
    var areasContainer = document.querySelector('.areas');
    if (!areasContainer) return;
    var tablist = areasContainer.querySelector('.areas-tabs');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var progressBar = areasContainer.querySelector('.areas-progress-bar');
    
    var duration = 10000; // 10 segundos
    var startTime = null;
    var animationFrameId = null;
    var isPaused = false;
    var isOffScreen = false;
    var elapsedAtPause = 0;

    function activate(tab, setFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected);
        t.setAttribute('tabindex', selected ? '0' : '-1');
        t.classList.toggle('is-active', selected);
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !selected;
          panel.classList.toggle('is-active', selected);
        }
      });
      if (setFocus) tab.focus();
      
      resetTimer();
    }

    function tick(timestamp) {
      if (isPaused || isOffScreen) {
        startTime = null;
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      if (!startTime) startTime = timestamp;
      var elapsed = (timestamp - startTime) + elapsedAtPause;

      if (elapsed >= duration) {
        var activeIdx = tabs.findIndex(function (t) {
          return t.classList.contains('is-active');
        });
        var nextIdx = (activeIdx + 1) % tabs.length;
        activate(tabs[nextIdx]);
        return;
      }

      if (progressBar) {
        var pct = (elapsed / duration) * 100;
        progressBar.style.width = pct + '%';
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    function startTimer() {
      if (!animationFrameId) {
        startTime = null;
        elapsedAtPause = 0;
        animationFrameId = requestAnimationFrame(tick);
      }
    }

    function resetTimer() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (progressBar) {
        progressBar.style.width = '0%';
      }
      startTime = null;
      elapsedAtPause = 0;
      isPaused = false;
      startTimer();
    }

    function pauseTimer() {
      if (!isPaused) {
        isPaused = true;
        if (startTime) {
          elapsedAtPause += (performance.now() - startTime);
        }
        startTime = null;
      }
    }

    function resumeTimer() {
      if (isPaused) {
        isPaused = false;
        startTime = null;
      }
    }

    // Pausar ao passar o mouse por cima
    areasContainer.addEventListener('mouseenter', pauseTimer);
    areasContainer.addEventListener('mouseleave', resumeTimer);

    // Pausar quando fora do viewport
    if ('IntersectionObserver' in window) {
      var visibilityObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (isOffScreen) {
              isOffScreen = false;
              startTime = null;
            }
          } else {
            if (!isOffScreen) {
              isOffScreen = true;
              if (startTime) {
                elapsedAtPause += (performance.now() - startTime);
              }
              startTime = null;
            }
          }
        });
      }, { threshold: 0.05 });
      visibilityObserver.observe(areasContainer);
    }

    // Pausar se a aba do navegador estiver oculta
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        pauseTimer();
      } else {
        resumeTimer();
      }
    });

    // Iniciar temporizador
    startTimer();

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab); });
      tab.addEventListener('keydown', function (e) {
        var idx = null;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        if (idx !== null) {
          e.preventDefault();
          activate(tabs[idx], true);
        }
      });
    });
  }

  /* ── Floating WhatsApp Tooltip ── */
  function initWhatsAppTooltip() {
    var tooltip = document.getElementById('whatsappTooltip');
    var closeBtn = document.getElementById('closeTooltip');
    if (!tooltip) return;

    // Show tooltip after 20 seconds
    var timer = setTimeout(function () {
      tooltip.classList.add('show');
    }, 20000);

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        tooltip.classList.remove('show');
        clearTimeout(timer);
      });
    }

    tooltip.addEventListener('click', function () {
      window.open('https://wa.me/5592984622007?text=Ol%C3%A1,%20vim%20da%20landing%20page%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20intermedia%C3%A7%C3%B3o%20de%20neg%C3%B3cios.', '_blank');
    });
  }

  /* ── Language Pill Toggle ── */
  function initLangPill() {
    var btns = document.querySelectorAll('.lang-pill-btn');
    var toast = document.getElementById('flag-toast');
    if (btns.length === 0 || !toast) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.classList.contains('active')) return;

        var flag = this.getAttribute('data-flag');
        var url = this.getAttribute('data-url');

        // Show flag toast animation
        toast.textContent = flag;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        // Redirect after 1.2s to show the animation
        setTimeout(function () {
          window.location.href = url;
        }, 1200);
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initMobileNav();
    initSmoothScroll();
    initCounters();
    initActiveNav();
    initHeroVideo();
    initAreaTabs();
    initWhatsAppTooltip();
    initLangPill();
  });

})();
