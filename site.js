(() => {
  const revealEls = [...document.querySelectorAll('.reveal')];
  const vault = document.querySelector('#vault');
  const sliders = [...document.querySelectorAll('[data-slider]')];

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.id === 'vault') entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.34, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(el => io.observe(el));
  if (vault) io.observe(vault);

  sliders.forEach(slider => {
    const track = slider.querySelector('.slides');
    slider.querySelector('[data-next]')?.addEventListener('click', () => track.scrollBy({ left: 430, behavior: 'smooth' }));
    slider.querySelector('[data-prev]')?.addEventListener('click', () => track.scrollBy({ left: -430, behavior: 'smooth' }));
  });
})();
