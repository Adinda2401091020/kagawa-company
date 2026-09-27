const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-menu a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        ));
      }
    });
  }, {rootMargin:'-35% 0px -55% 0px'});

  sections.forEach(section => observer.observe(section));

  document.getElementById('projectForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(this);
    const name = data.get('name') || '';
    const company = data.get('company') || '-';
    const phone = data.get('phone') || '';
    const service = data.get('service') || '';
    const message = data.get('message') || '';

    const text =
      `Halo Kagawa, saya ${name}.%0A%0A` +
      `Perusahaan/Usaha: ${company}%0A` +
      `WhatsApp: ${phone}%0A` +
      `Kebutuhan: ${service}%0A%0A` +
      `Project Brief:%0A${message}`;

    window.open(`https://wa.me/6281363342574?text=${text}`, '_blank', 'noopener');
  });
