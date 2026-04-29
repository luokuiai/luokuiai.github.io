const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section-anchor');
const activityItems = document.querySelectorAll('[data-activity-item]');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

if ('IntersectionObserver' in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isActive);
        });
      });
    },
    {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (activityItems.length > 0) {
  let activeIndex = 0;

  window.setInterval(() => {
    activityItems[activeIndex].classList.remove('is-active');
    activeIndex = (activeIndex + 1) % activityItems.length;
    activityItems[activeIndex].classList.add('is-active');
  }, 2600);
}
