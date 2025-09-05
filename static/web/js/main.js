/**
* Template Name: Gp
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  // DOM elementlarini tanlash uchun yaxshilangan funksiya
  const select = (el, all = false) => {
    el = el.trim();
    if (!el) return all ? [] : null;

    try {
      return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
    } catch (e) {
      console.error("Selector xatosi:", e);
      return all ? [] : null;
    }
  };

  // Event listener qo'shish uchun optimallashtirilgan funksiya
  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (!elements || (all && elements.length === 0)) return;

    if (all) {
      elements.forEach(e => e.addEventListener(type, listener));
    } else {
      elements.addEventListener(type, listener);
    }
  };

  // Scroll event listener qo'shish
  const onscroll = (el, listener) => {
    if (el) el.addEventListener('scroll', listener);
  };

  // Navbar linklarini faollashtirish
  const initNavbarLinks = () => {
    const navbarlinks = select('#navbar .scrollto', true);
    if (!navbarlinks.length) return;

    const navbarlinksActive = () => {
      const position = window.scrollY + 200;

      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;

        const section = select(navbarlink.hash);
        if (!section) return;

        const isActive = position >= section.offsetTop &&
                        position <= (section.offsetTop + section.offsetHeight);

        navbarlink.classList.toggle('active', isActive);
      });
    };

    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);
  };

  // Scroll animatsiyasi
  const scrollto = (el) => {
    const element = select(el);
    const header = select('#header');

    if (!element || !header) return;

    const offset = header.offsetHeight;
    const elementPos = element.offsetTop;

    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  // Header scroll effekti
  const initHeaderScroll = () => {
    const selectHeader = select('#header');
    if (!selectHeader) return;

    const headerScrolled = () => {
      selectHeader.classList.toggle('header-scrolled', window.scrollY > 100);
    };

    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  };

  // Back to top tugmasi
  const initBackToTop = () => {
    const backtotop = select('.back-to-top');
    if (!backtotop) return;

    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };

    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  };

  // Mobile nav toggle
  const initMobileNav = () => {
    on('click', '.mobile-nav-toggle', function(e) {
      const navbar = select('#navbar');
      if (!navbar) return;

      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    // Mobile nav dropdowns
    on('click', '.navbar .dropdown > a', function(e) {
      const navbar = select('#navbar');
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    }, true);
  };

  // Scrollto funksiyasi
  const initScrollTo = () => {
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault();

        const navbar = select('#navbar');
        if (navbar && navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const navbarToggle = select('.mobile-nav-toggle');
          if (navbarToggle) {
            navbarToggle.classList.toggle('bi-list');
            navbarToggle.classList.toggle('bi-x');
          }
        }

        scrollto(this.hash);
      }
    }, true);
  };

  // Hash bilan yuklangan sahifalarni boshqarish
  const initHashScroll = () => {
    window.addEventListener('load', () => {
      if (window.location.hash) {
        const targetElement = select(window.location.hash);
        if (targetElement) scrollto(window.location.hash);
      }
    });
  };

  // Preloader
  const initPreloader = () => {
    const preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.remove();
        }, 100);
      });
    }
  };

  // Clients Slider
  const initClientsSlider = () => {
    const clientsSlider = select('.clients-slider');
    if (!clientsSlider) return;

    try {
      new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 60
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 80
          },
          992: {
            slidesPerView: 6,
            spaceBetween: 120
          }
        }
      });
    } catch (e) {
      console.error("Swiper initialization error:", e);
    }
  };

  // Portfolio isotope and filter
  const initPortfolioIsotope = () => {
    window.addEventListener('load', () => {
      const portfolioContainer = select('.portfolio-container');
      if (!portfolioContainer) return;

      try {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });

          if (typeof AOS !== 'undefined') {
            portfolioIsotope.on('arrangeComplete', function() {
              AOS.refresh();
            });
          }
        }, true);
      } catch (e) {
        console.error("Isotope initialization error:", e);
      }
    });
  };

  // Portfolio lightbox
  const initPortfolioLightbox = () => {
    try {
      const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
      });
    } catch (e) {
      console.error("GLightbox initialization error:", e);
    }
  };

  // Portfolio details slider
  const initPortfolioDetailsSlider = () => {
    const portfolioDetailsSlider = select('.portfolio-details-slider');
    if (!portfolioDetailsSlider) return;

    try {
      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    } catch (e) {
      console.error("Portfolio details slider error:", e);
    }
  };

  // Testimonials slider
  const initTestimonialsSlider = () => {
    const testimonialsSlider = select('.testimonials-slider');
    if (!testimonialsSlider) return;

    try {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    } catch (e) {
      console.error("Testimonials slider error:", e);
    }
  };

  // Animation on scroll
  const initAOS = () => {
    window.addEventListener('load', () => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          mirror: false
        });
      }
    });
  };

  // Pure Counter
  const initPureCounter = () => {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  };

  // Barcha funksiyalarni ishga tushirish
  const initAll = () => {
    initNavbarLinks();
    initHeaderScroll();
    initBackToTop();
    initMobileNav();
    initScrollTo();
    initHashScroll();
    initPreloader();
    initClientsSlider();
    initPortfolioIsotope();
    initPortfolioLightbox();
    initPortfolioDetailsSlider();
    initTestimonialsSlider();
    initAOS();
    initPureCounter();
  };

  // Hammadan avval DOM yuklanganligini tekshirish
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();