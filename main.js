/**
 * BHOOMIKA HN // CORE ENGINE & INTERACTION SCRIPTS
 * High performance, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNetworkCanvas();
  initProjectFilters();
  initProjectModals();
  initYearTabs();
  initCopyUtilities();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   NAVIGATION BAR & MOBILE MENU
   ========================================================================== */

function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '☰';
        }
      });
    });
  }
}

/* ==========================================================================
   INTERACTIVE SUBTLE NODE CANVAS (BLOCKCHAIN MESH)
   ========================================================================== */

function initNetworkCanvas() {
  const canvas = document.getElementById('node-canvas');
  if (!canvas) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  
  const mouse = { x: null, y: null, maxDist: 140 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createNodes();
  }

  function createNodes() {
    nodes = [];
    // Restrained node density for maximum performance & zero distraction
    const nodeCount = Math.floor(Math.min(width, 1400) / 38);
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.1,
        color: Math.random() > 0.6 ? 'rgba(125, 211, 252, 0.75)' : 'rgba(165, 180, 252, 0.65)'
      });
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Connect to cursor
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.maxDist) {
          const alpha = (1 - dist / mouse.maxDist) * 0.35;
          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   PROJECT FILTERING TABS
   ========================================================================== */

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT DETAILS MODALS
   ========================================================================== */

const PROJECT_DETAILS = {
  synco: {
    title: 'SyncO — Mobile & PC Workflow Companion',
    badge: 'Application Development // Bluetooth & Networking',
    hash: '0x8f2c...41ba',
    summary: 'A companion-style application concept designed to unify mobile and desktop workflows through seamless peer discovery, local networking, and responsive device synchronization.',
    metrics: [
      { label: 'Architecture', val: 'Client-Server & P2P' },
      { label: 'Discovery Protocol', val: 'BLE & Local Socket' },
      { label: 'Platform', val: 'Android / PC' },
      { label: 'Status', val: 'Prototype & UI Architecture' }
    ],
    features: [
      'Engineered responsive discovery mechanisms for rapid device pairing.',
      'Designed a clean, dark futuristic UI with immediate connection status feedback.',
      'Structured background service loops for low-latency command dispatch.'
    ],
    tech: ['Android', 'Bluetooth Low Energy', 'Local Sockets', 'Java/Kotlin', 'UI/UX Design']
  },
  student_site: {
    title: 'Student Profile & Portfolio Architecture',
    badge: 'Web Development // Semantic HTML & CSS',
    hash: '0x3d91...08ee',
    summary: 'A clean, high-performance personal student profile website developed to master semantic markup, responsive grid layouts, custom design tokens, and modular JavaScript.',
    metrics: [
      { label: 'Lighthouse Score', val: '99/100' },
      { label: 'Accessibility', val: 'WCAG 2.1 AA' },
      { label: 'Responsiveness', val: 'Mobile / Tablet / Desktop' },
      { label: 'Core Stack', val: 'HTML5, CSS3, ES6+' }
    ],
    features: [
      'Built with zero heavy CSS frameworks for sub-100ms first contentful paint.',
      'Custom CSS variables for unified typography, spacing, and dark cyber theming.',
      'Accessible focus states and ARIA semantics for all interactive elements.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Design Tokens', 'Web Accessibility']
  },
  sql_dbms: {
    title: 'Relational Database Management System & Query Suite',
    badge: 'Database // SQL & Schema Design',
    hash: '0x1b77...99cf',
    summary: 'A comprehensive collection of database schema models, relational normalization exercises (1NF to 3NF), complex multi-table joins, integrity constraints, and query optimization experiments.',
    metrics: [
      { label: 'Database Engine', val: 'MySQL 8.0' },
      { label: 'Normalization', val: 'Up to 3NF / BCNF' },
      { label: 'Query Coverage', val: 'CRUD, Subqueries, Joins' },
      { label: 'Indexes', val: 'B-Tree & Foreign Keys' }
    ],
    features: [
      'Designed normalized entity-relationship schemas with strict referential integrity.',
      'Constructed parameterized queries, aggregate analysis, and inner/outer joins.',
      'Benchmarked query execution plans using EXPLAIN to optimize scan efficiency.'
    ],
    tech: ['MySQL', 'SQL', 'DBMS', 'ER Modeling', 'Relational Normalization', 'MySQL Workbench']
  },
  data_analysis: {
    title: 'Exploratory Data Analysis & Statistical Modeling',
    badge: 'Data Science // Python & Analytics',
    hash: '0x5e20...cc84',
    summary: 'Practical data science experiments analyzing distributions, data cleaning pipelines, variance calculations, and probabilistic modeling on structured datasets.',
    metrics: [
      { label: 'Data Cleaning', val: 'Null/Outlier Handling' },
      { label: 'Techniques', val: 'Descriptive Stats, Distributions' },
      { label: 'Tools', val: 'Excel & Python' },
      { label: 'Visualization', val: 'Charts & Scatter Plots' }
    ],
    features: [
      'Performed statistical transformations, probability modeling, and data normalization.',
      'Created automated Excel summary models using pivot analysis and formulas.',
      'Applied Python scripting to clean raw multi-column datasets.'
    ],
    tech: ['Excel', 'Statistics & Probability', 'Python', 'Data Cleaning', 'Exploratory Analysis']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const projectBtns = document.querySelectorAll('[data-project]');

  if (!modalBackdrop || !modalBody) return;

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projectId];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="terminal-header" style="margin-bottom: 1rem;">
          <span>SPEC_INSPECTION // ${data.hash}</span>
          <span style="color: var(--cyan-primary);">${data.badge}</span>
        </div>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${data.summary}</p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.25rem;">
          ${data.metrics.map(m => `
            <div style="background: rgba(8, 12, 20, 0.7); border: 1px solid var(--border-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
              <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--cyan-primary); font-weight: 600;">${m.val}</div>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Key Architectural Highlights:</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem;">
          ${data.features.map(f => `
            <li style="font-size: 0.875rem; color: var(--text-secondary); display: flex; align-items: baseline; gap: 0.5rem;">
              <span style="color: var(--cyan-primary); font-family: var(--font-mono);">▹</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
          ${data.tech.map(t => `<span class="tech-tag" style="background: rgba(0, 229, 255, 0.08); border-color: var(--border-cyan-subtle); color: var(--cyan-primary);">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <a href="#contact" class="btn btn-primary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">Discuss Implementation</a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">Close Blueprint</button>
        </div>
      `;

      modalBackdrop.classList.add('active');
      modalBackdrop.setAttribute('aria-hidden', 'false');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==========================================================================
   ACADEMIC YEAR TABS (4-YEAR CURRICULUM)
   ========================================================================== */

function initYearTabs() {
  const yearBtns = document.querySelectorAll('.year-tab-btn');
  const yearPanels = document.querySelectorAll('.year-panel');

  if (!yearBtns.length || !yearPanels.length) return;

  yearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      yearBtns.forEach(b => b.classList.remove('active'));
      yearPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const year = btn.getAttribute('data-year');
      const targetPanel = document.getElementById(`year-panel-${year}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   COPY UTILITIES & TOAST NOTIFICATION
   ========================================================================== */

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color: var(--cyan-primary);">✓</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function initCopyUtilities() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard';
        showToast(label);
      }).catch(() => {
        showToast('Failed to copy');
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM (TRANSMISSION SIMULATION)
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = '✖ Please fill in all fields.';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = '✖ Please enter a valid email address.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Message...';

      setTimeout(() => {
        if (feedback) {
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `✓ Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        }
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Message sent successfully');
      }, 700);
    }
  });
}

/* ==========================================================================
   SCROLL SPY (ACTIVE LINK HIGHLIGHTING)
   ========================================================================== */

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
