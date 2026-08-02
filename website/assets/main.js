// Nachtfahrt Records — Site Interactions

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));

  const paketSelect = document.getElementById('paket-select');
  if (paketSelect) {
    document.querySelectorAll('.pkg-card a[data-paket]').forEach((link) => {
      link.addEventListener('click', () => {
        paketSelect.value = link.dataset.paket;
      });
    });
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const subject = `Auftragssong-Anfrage: ${data.get('anlass') || 'Anlass offen'} (${data.get('paket') || 'Paket offen'})`;
      const body = [
        `Name: ${data.get('name')}`,
        `E-Mail: ${data.get('email')}`,
        `Anlass: ${data.get('anlass')}`,
        `Paket: ${data.get('paket')}`,
        `Stilwunsch: ${data.get('stil') || '-'}`,
        `Wunschtermin: ${data.get('termin') || '-'}`,
        '',
        'Geschichte:',
        data.get('geschichte'),
      ].join('\n');
      window.location.href = `mailto:Ezy.Officially@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
