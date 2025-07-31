const logoDark = './public/images/logo-dark.svg';
const hamburgerDark = './public/icons/hamburger-dark.svg';
const hamburgerLight = './public/icons/hamburger.svg';
const iconXDark = './public/icons/x-icon-dark.svg';
const iconXLight = './public/icons/x-icon.svg';
const heroImgDark = './public/images/hero-img-dark.png';
const facebookLogoDark = './public/icons/facebook-dark.svg';
const instagramLogoDark = './public/icons/instagram-dark.svg';
const linkdnLogoDark = './public/icons/linkdn-dark.svg';
const tiktokLogoDark = './public/icons/tiktok-dark.svg';

const chevronIconDark = './public/icons/chevron-dark.svg';
const chevronIconLight = './public/icons/chevron-up.svg';

const updateChevron = (chvronIcon, isOpenChveron, isDark) => {
  if (!chvronIcon) return;
  chvronIcon.src = isDark ? chevronIconDark : chevronIconLight;
  chvronIcon.classList.toggle('rotate-180', !isOpenChveron);
};

function handleDropdowns(isDark) {
  const dropdowns = document.querySelectorAll('details.group');

  dropdowns.forEach((dropdown) => {
    const chevronIcon = dropdown.querySelector('.chevron-icon');
    updateChevron(chevronIcon, dropdown.open, isDark);

    const observer = new MutationObserver(() => {
      updateChevron(chevronIcon, dropdown.open, isDark);
    });

    observer.observe(dropdown, { attributes: true, attributeFilter: ['open'] });
  });
}

function handleMobileMenu(isDark) {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');

  let isOpen = false;

  const updateMenuState = () => {
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.src = isDark ? iconXDark : iconXLight;
      document.body.classList.add('overflow-y-hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.src = isDark ? hamburgerDark : hamburgerLight;
      document.body.classList.remove('overflow-y-hidden');
    }
  };

  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    updateMenuState();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) {
      isOpen = false;
      updateMenuState();
    }
  });
}

function handleTabs(isDark) {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      tabContents.forEach((content) => content.classList.add('hidden'));

      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }

      tabButtons.forEach((btn) =>
        btn.classList.remove(
          'border-primary',
          isDark ? 'text-white' : 'text-black'
        )
      );

      button.classList.add(
        'border-primary',
        isDark ? 'text-white' : 'text-black'
      );
    });
  });

  tabButtons[0]?.click();
}

function handleCarousel() {
  const slideshow = document.getElementById('review-slideshow');
  const container = slideshow.parentElement;

  let slides = document.querySelectorAll('.carousel-slide');
  slideshow.prepend(slides[slides.length - 1].cloneNode(true));
  slideshow.appendChild(slides[0].cloneNode(true));

  slides = document.querySelectorAll('.carousel-slide');

  let index = 1;
  let total = slides.length;
  let slideWidth = 0;
  let offset = 0;
  let gap = 0;

  function recalculate() {
    const isMobile = window.innerWidth < 768;
    gap = isMobile ? 16 : 20;
    slideWidth = slides[0].offsetWidth + gap;
    offset = (container.offsetWidth - slideWidth) / 2;
  }

  const updateSlide = (i, transition = true) => {
    if (!slideWidth || !offset) recalculate();
    slideshow.style.transition = transition
      ? 'transform 0.5s ease-in-out'
      : 'none';
    slideshow.style.transform = `translateX(${-i * slideWidth + offset}px)`;
  };

  recalculate();
  updateSlide(index);

  slideshow.addEventListener('transitionend', () => {
    if (index === total - 1) index = 1;
    else if (index === 0) index = total - 2;
    updateSlide(index, false);
  });

  setInterval(() => updateSlide(++index), 3000);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      recalculate();
      updateSlide(index, false);
    }, 200);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const isDark = document.documentElement.classList.contains('dark');
  document.documentElement.style.scrollPaddingTop = '90px';
  document.documentElement.style.scrollBehavior = 'smooth';

  const menuIcon = document.querySelector('.menu-icon');
  const logo = document.getElementById('logo');
  const heroImage = document.querySelector('.hero-image');
  const facebookLogo = document.querySelector('.facebook-icon');
  const instagramLogo = document.querySelector('.instagram-icon');
  const linkdnLogo = document.querySelector('.linkdn-icon');
  const tiktokLogo = document.querySelector('.tiktok-icon');
  const footerLogo = document.querySelector('.footer-logo');

  const handleDarkMode = () => {
    if (isDark) {
      logo.src = logoDark;
      menuIcon.src = hamburgerDark;
      heroImage.src = heroImgDark;
      facebookLogo.src = facebookLogoDark;
      instagramLogo.src = instagramLogoDark;
      linkdnLogo.src = linkdnLogoDark;
      tiktokLogo.src = tiktokLogoDark;
      footerLogo.src = logoDark;
    }
  };

  handleDarkMode();
  handleDropdowns(isDark);
  handleMobileMenu(isDark);
  handleTabs(isDark);
  handleCarousel();
});
