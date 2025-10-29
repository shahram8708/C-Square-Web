(() => {
  const body = document.body;
  const preloader = document.getElementById('preloader');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');
  const navbar = document.getElementById('mainNav');
  const THEME_KEY = 'csquare-theme';

  const applyTheme = (theme) => {
    body.classList.toggle('theme-dark', theme === 'dark');
    body.classList.toggle('theme-light', theme !== 'dark');
    document.documentElement.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    }
  };

  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const nextTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide');
    }, 400);
  });

  const handleScroll = () => {
    const scrolled = window.scrollY > 120;
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 420);
    navbar?.classList.toggle('scrolled', scrolled);
  };

  document.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (window.AOS) {
    window.AOS.init({
      once: true,
      duration: 850,
      easing: 'ease-out-cubic',
      offset: 120,
    });
  }

  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.dataset.counter || 0);
        let current = 0;
        const increment = Math.max(target / 120, 1);
        const step = () => {
          current += increment;
          if (current >= target) {
            el.textContent = target.toLocaleString();
          } else {
            el.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => observer.observe(counter));

  // Bootstrap validation helper
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  const navbarContent = document.getElementById('navbarContent');
  if (navbarContent) {
    const navLinks = navbarContent.querySelectorAll('.nav-link');
    const collapseInstance = () => window.bootstrap?.Collapse.getInstance(navbarContent);
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          collapseInstance()?.hide();
        }
      });
    });
  }

  // Pause video when modal closes
  const video = document.querySelector('video[data-autopause]');
  const portfolioModal = document.getElementById('portfolioModal');
  portfolioModal?.addEventListener('hidden.bs.modal', () => {
    video?.pause();
  });
})();
