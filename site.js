(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const progress = $('.progress');
  const glow = $('.cursor-glow');
  const toast = $('#toast');
  const vault = $('#vault');
  const vaultFill = $('.vault-progress i');

  if (!reduce) {
    addEventListener('pointermove', e => {
      if (glow) glow.style.transform = `translate(${e.clientX - 210}px, ${e.clientY - 210}px)`;
      const console = $('.console');
      if (console) {
        const r = console.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) {
          console.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
        }
      }
    }, {passive:true});
    $('.console')?.addEventListener('mouseleave', e => e.currentTarget.style.transform = '');
  }

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${(scrollY / max) * 100}%`;
    if (vault && vaultFill) {
      const r = vault.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (innerHeight * .78 - r.top) / (r.height * .55)));
      vaultFill.style.width = `${pct * 100}%`;
      vault.classList.toggle('active', pct > .34);
    }
    const ids = ['vault','systems'];
    ids.forEach(id => {
      const el = document.getElementById(id); if (!el) return;
      const active = el.getBoundingClientRect().top < innerHeight*.35 && el.getBoundingClientRect().bottom > innerHeight*.35;
      $$(`.navlinks a[href="#${id}"]`).forEach(a => a.classList.toggle('active', active));
    });
  };
  addEventListener('scroll', update, {passive:true}); addEventListener('resize', update); update();

  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      if (entry.target.id === 'vault') entry.target.classList.add('active');
      $$('[data-count]', entry.target).forEach(el => animateCount(el, +el.dataset.count));
    }
  }), { threshold:.28, rootMargin:'0px 0px -8% 0px'});
  $$('.reveal, .hero, .console').forEach(el => io.observe(el));

  function animateCount(el, end) {
    if (el.dataset.done || reduce) { el.textContent = end + (end===61?'+':''); return; }
    el.dataset.done = '1'; const start = performance.now();
    const tick = now => { const t = Math.min(1, (now-start)/900); const eased = 1 - Math.pow(1-t,3); el.textContent = Math.round(eased*end) + (end===61?'+':''); if(t<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  $$('.side div').forEach(tab => tab.addEventListener('click', () => {
    $$('.side div').forEach(t => t.classList.remove('active')); tab.classList.add('active');
    const mode = tab.textContent.trim();
    $$('.panel-mode').forEach(p => p.classList.toggle('active', p.dataset.mode === mode));
    if (toast) { toast.textContent = `${mode} module loaded`; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 1200); }
  }));

  $$('[data-slider]').forEach(slider => {
    const track = $('.slides', slider);
    $('[data-next]', slider)?.addEventListener('click', () => track.scrollBy({left:430,behavior:'smooth'}));
    $('[data-prev]', slider)?.addEventListener('click', () => track.scrollBy({left:-430,behavior:'smooth'}));
  });
})();
