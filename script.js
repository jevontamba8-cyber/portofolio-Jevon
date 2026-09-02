// ==========================================================================
// Interactive Functions for Portfolio
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking links
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. Header Scroll Backdrop & Shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Navigation Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Handler (Direct WhatsApp Redirect)
  const contactForm = document.getElementById('contactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyiapkan Pesan...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (toastMsg) {
          toastMsg.className = 'toast-msg success';
          toastMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan disiapkan! Membuka chat WhatsApp Jevon...';
          toastMsg.style.display = 'block';

          setTimeout(() => {
            toastMsg.style.display = 'none';
          }, 4000);
        }

        // Redirect to WhatsApp with formatted text
        const waText = `Halo Jevon,%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubjek: ${encodeURIComponent(subject)}%0A%0APesan:%0A${encodeURIComponent(message)}`;
        window.open(`https://wa.me/6281285324814?text=${waText}`, '_blank');
        contactForm.reset();
      }, 800);
    });
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Helper Function for 1-Click Copy to Clipboard
function copyToClipboard(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} (${text}) berhasil disalin!`);
    }).catch(() => {
      fallbackCopyTextToClipboard(text, label);
    });
  } else {
    fallbackCopyTextToClipboard(text, label);
  }
}

function fallbackCopyTextToClipboard(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} (${text}) berhasil disalin!`);
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textArea);
}

function showToast(msg) {
  const toastMsg = document.getElementById('toastMsg');
  if (toastMsg) {
    toastMsg.className = 'toast-msg success';
    toastMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    toastMsg.style.display = 'block';
    setTimeout(() => {
      toastMsg.style.display = 'none';
    }, 4000);
  } else {
    alert(msg);
  }
}
