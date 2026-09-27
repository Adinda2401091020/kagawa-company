document.addEventListener('DOMContentLoaded', () => {
  // --- Loader Curtain ---
  const loader = document.getElementById('loader');
  if (loader) {
    
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 1800);
  }

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

  // --- Smooth Sticky Header & Hide on scroll down, show on up ---
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      // Scrolling down
      header ? header.style.transform = 'translateY(-100%)' : null;
    } else {
      // Scrolling up
      header ? header.style.transform = 'translateY(0)' : null;
    }
    lastScrollY = window.scrollY;
  }, { passive: true });

  // --- Intersection Observer for Nav Highlighting ---
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-menu a[href^="#"]');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        ));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));

  // --- Scroll-Triggered Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve to run animation only once
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Theme Toggle Handler (Light / Dark) ---
  const themeToggleBtn = document.getElementById('themeToggle');
  
  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kagawa-theme', newTheme);
  });

  // --- Smooth Custom Cursor with trailing LERP ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    
    // Smooth frame rate-independent LERP trailing for outer ring
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();
    
    // Add hover triggers on interactive elements
    const interactiveSelectors = 'a, button, input, select, textarea, .project, .case-study, details summary';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      el.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
      el.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
    });
  }

  // --- Back to Top Progress Circle ---
  const backToTopBtn = document.getElementById('backToTop');
  const progressCircle = document.querySelector('.progress-ring__circle');
  
  if (backToTopBtn && progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      const offset = circumference - (progress * circumference);
      
      progressCircle.style.strokeDashoffset = offset;
      
      
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  
  const projectsData = {
    'pagar-custom': {
      title: "Pagar Custom Minimalis",
      category: "RESIDENTIAL / CUSTOM WELDING",
      description: "Pekerjaan pagar custom menggunakan material besi galvanis berkualitas tinggi demi menunjang ketahanan terhadap cuaca ekstrem serta dilapisi cat anti-karat premium. Desain modern minimalis disesuaikan dengan konsep estetika fasad bangunan utama.",
      specs: ["Besi Galvanis Hollow", "Bilah Wood-Plastic Composite (WPC)", "Cat Epoxy Primer Anti-karat", "Finishing Matte Black"],
      client: "Bpk. Hermawan",
      location: "Sitiung, Dharmasraya",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
    },
    'kanopi': {
      title: "Kanopi Rangka Double Siku",
      category: "RESIDENTIAL / FABRICATION",
      description: "Pemasangan kanopi carport dengan bentang lebar tanpa tiang tengah, menggunakan konstruksi rangka double siku demi kekokohan maksimal. Atap berbahan polycarbonate premium dengan filter sinar UV untuk kenyamanan ekstra.",
      specs: ["Frame Hollow Galvanis 4x8", "Atap Polycarbonate UV-Cut", "Klem Penjepit Aluminium", "Finishing High-Gloss Silver"],
      client: "Ibu Rahmawati",
      location: "Pulau Punjung, Dharmasraya",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
    },
    'railing': {
      title: "Railing Tangga Klasik Modern",
      category: "RESIDENTIAL / METALWORK",
      description: "Desain dan instalasi railing pengaman tangga dalam ruangan. Mengombinasikan lekuk besi tempa artistik dengan pegangan kayu jati solid berperekat kuat, melahirkan kesan estetik elegan namun tetap aman secara fungsional struktural.",
      specs: ["Nako Besi Solid 16mm", "Pegangan Kayu Jati Finish Melamic", "Angkur Tanam Dinabolt 12mm", "Cat Duco Gold Highlight"],
      client: "Bpk. Suryadi",
      location: "Koto Baru, Dharmasraya",
      image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800"
    },
    'case-study': {
      title: "Konstruksi Baja Gudang Utama",
      category: "PROJECT CASE STUDY",
      description: "Studi kasus pengerjaan fabrikasi dan perakitan struktur baja berat untuk gudang penyimpanan kelapa sawit milik PT. Sinar Dharmasraya. Menggunakan profil baja WF berstandar nasional Indonesia (SNI) demi menjamin keamanan beban operasional.",
      specs: ["Profil Baja WF 250 & 300", "Baut Baja Mutu Tinggi (Grade 8.8)", "Atap Galvalume Zincalume 0.45", "Pondasi Base Plate Anchor"],
      client: "PT. Sinar Dharmasraya",
      location: "Sungai Rumbai, Dharmasraya",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
    }
  };

  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = modal?.querySelector('.modal-overlay');

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !modal) return;

    // Populate modal contents
    modal.querySelector('#modalCategory').textContent = data.category;
    modal.querySelector('#modalTitle').textContent = data.title;
    modal.querySelector('#modalDescription').textContent = data.description;
    modal.querySelector('#modalClient').textContent = data.client;
    modal.querySelector('#modalLocation').textContent = data.location;
    
    // Handle image placeholder visual styling
    const visualPanel = modal.querySelector('.modal-image-placeholder');
    if (visualPanel) {
      visualPanel.style.backgroundImage = `linear-gradient(180deg, transparent 40%, rgba(7, 9, 10, 0.9)), url('${data.image}')`;
    }

    // Populate dynamic specs list
    const specsGrid = modal.querySelector('#modalSpecs');
    if (specsGrid) {
      specsGrid.innerHTML = '';
      data.specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'modal-spec-item';
        specItem.innerHTML = `<span>✓</span> ${spec}`;
        specsGrid.appendChild(specItem);
      });
    }

    // Modal behavior toggle
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock scroll
  };

  // Click triggers on project cards
  document.querySelectorAll('.project[data-project-id], .case-study[data-project-id]').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      if (projId) openModal(projId);
    });
  });

  // Modal closers
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- Dynamic FAQ Accordion height sizing ---
  document.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.details-content');
    
    summary?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = detail.hasAttribute('open');
      
      if (isOpen) {
        // Closing animation
        if (content) content.style.maxHeight = '0';
        setTimeout(() => {
          detail.removeAttribute('open');
        }, 300);
      } else {
        // Close others
        document.querySelectorAll('details').forEach(other => {
          if (other !== detail && other.hasAttribute('open')) {
            const otherContent = other.querySelector('.details-content');
            if (otherContent) otherContent.style.maxHeight = '0';
            setTimeout(() => {
              other.removeAttribute('open');
            }, 300);
          }
        });
        
        detail.setAttribute('open', '');
        setTimeout(() => {
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }, 10);
      }
    });
  });

  // --- Interactive WA Form Submission ---
  document.getElementById('projectForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const origText = submitBtn ? submitBtn.innerHTML : '';
    
    // Trigger visual success micro-interaction before redirecting
    if (submitBtn) {
      submitBtn.innerHTML = '<span>Memproses...</span>';
      submitBtn.style.opacity = '0.8';
      submitBtn.disabled = true;
    }

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

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Berhasil Dialihkan! ✓</span>';
        submitBtn.style.background = '#25D366';
        submitBtn.style.color = '#fff';
      }
      
      setTimeout(() => {
        window.open(`https://wa.me/6281363342574?text=${text}`, '_blank', 'noopener');
        // Reset button
        if (submitBtn) {
          submitBtn.innerHTML = origText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }
      }, 1000);
    }, 1200);
  });
});
