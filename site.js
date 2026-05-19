(function(){
  const reveal = () => document.querySelectorAll('.reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * .86) el.classList.add('in-view');
  });
  addEventListener('scroll', reveal, {passive:true}); addEventListener('load', reveal); reveal();
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    slider.querySelector('[data-next]')?.addEventListener('click', () => track.scrollBy({left: 430, behavior:'smooth'}));
    slider.querySelector('[data-prev]')?.addEventListener('click', () => track.scrollBy({left: -430, behavior:'smooth'}));
    setInterval(() => { if (!document.hidden) track.scrollBy({left: 430, behavior:'smooth'}); }, 5200);
  });
})();
