/* ===================================================================
 * Hudson 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function() {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    }; // end ssMoveHeader


   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
            toggleButton.setAttribute('aria-expanded', siteBody.classList.contains('menu-is-open') ? 'true' : 'false');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                    toggleButton.setAttribute('aria-expanded', siteBody.classList.contains('menu-is-open') ? 'true' : 'false');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });

    }; // end ssMobileMenu


   /* highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');
        if (!sections) return;

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy


   /* glightbox
    * ------------------------------------------------------ */ 
    const ssGLightbox = function() {

        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true,
            svg: {
                close: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
                prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
                next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>'
            }
        });        

    } // end ssGLightbox


   /* swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 50
                },
                // when window width is > 1180px
                1181: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* language switcher
    * ------------------------------------------------------ */
    const ssLanguageSwitcher = function() {

        const switcher = document.querySelector('.language-switcher');
        const toggle = document.querySelector('.language-switcher__toggle');
        const currentLabel = document.querySelector('.language-switcher__current');
        const options = document.querySelectorAll('.language-switcher__option');
        const translatableNodes = document.querySelectorAll('[data-i18n]');

        if (!(switcher && toggle && currentLabel && options.length && translatableNodes.length)) return;

        const translations = {
            az: {
                pageTitle: 'My Portfolio | Kamal Həsənzadə',
                switcherLabel: 'AZ',
                'nav.intro': 'Giri\u015f',
                'nav.about': 'Haqq\u0131mda',
                'nav.works': '\u0130\u015fl\u0259r',
                'nav.interests': 'Maraqlar',
                'nav.contact': '\u018flaq\u0259',
                'hero.pretitle': 'Kamal Həsənzadə',
                'hero.title': 'Full Stack Developer <br>React, API-lər, verilənlər bazaları və modern full stack texnologiyaları ilə biznes yönümlü web tətbiqlər qururam.',
                'hero.more': 'Daha \u018ftrafl\u0131',
                'hero.contact': '\u018flaq\u0259 Saxla',
                'hero.cv': 'CV-mi A\u00e7',
                'about.title': 'Haqq\u0131mda.',
                'about.text1': 'Bizneslər və brendlər üçün müasir, responsiv və istifadəçi yönümlü web tətbiqlər hazırlamağa fokuslanan full stack developerəm. İşim React interfeysləri, API inteqrasiyası, backend məntiqi və praktik web həlləri üzərində qurulur.',
                'about.text2': 'Full stack bacarıqlarımı davamlı inkişaf etdirir, backend texnologiyaları, verilənlər bazaları və modern web development workflow-larını öyrənirəm.',
                'works.title': 'Se\u00e7ilmi\u015f \u0130\u015fl\u0259r.',
                'interests.title': 'Maraqlar.',
                'numbers.title': 'Göstəricilər.',
                'numbers.projects.title': 'Seçilmiş Layihələr',
                'numbers.projects.text': 'Biznes saytları, web tətbiqlər və modern full stack bacarıqlarını göstərən real layihələr.',
                'numbers.education.title': 'Təhsil İlləri',
                'numbers.education.text': 'Veb dizayn və proqram təminatı üzrə peşə təhsili, üstəgəl davam edən full stack development təhsili.',
                'numbers.english.title': 'İngilis Dili Səviyyəsi',
                'numbers.english.text': 'Dokumentasiyanı izləmək, resurslardan öyrənmək və qlobal məzmunla inkişaf etmək üçün faydalıdır.',
                'numbers.motivation.title': 'Motivasiya',
                'numbers.motivation.text': 'Daha yaxşı web tətbiqlər qurmaq, daha sürətli öyrənmək və real iş vasitəsilə inkişaf etmək üçün davamlı motivasiya.',
                'interests.text': 'Layih\u0259l\u0259rd\u0259n k\u0259narda maraq dair\u0259m d\u0259 \u00f6yr\u0259nm\u0259y\u0259 v\u0259 inki\u015faf etm\u0259y\u0259 ba\u011fl\u0131d\u0131r. M\u0259n motorsportu v\u0259 x\u00fcsusil\u0259 Formula 1-i izl\u0259m\u0259yi, texnologiya v\u0259 proqramla\u015fd\u0131rma il\u0259 m\u0259\u015f\u011ful olma\u011f\u0131, h\u0259m\u00e7inin \u00f6z\u00fcm\u00fc davaml\u0131 inki\u015faf etdirm\u0259yi sevir\u0259m.',
                'interests.formula.title': 'Formula 1',
                'interests.formula.cat': 'Motorsport &bull; Strategiya &bull; Race Weekend',
                'interests.tech.title': 'Texnologiya v\u0259 Proqramla\u015fd\u0131rma',
                'interests.tech.cat': 'Texnologiya &bull; Kodlama &bull; Full Stack',
                'interests.growth.title': '\u00d6z\u00fcn\u00fc \u0130nki\u015faf',
                'interests.growth.cat': '\u0130nki\u015faf &bull; \u00d6yr\u0259nm\u0259 &bull; H\u0259r G\u00fcn Daha Yax\u015f\u0131',
                'footer.title': '\u018flaq\u0259.',
                'footer.text': 'Biznes, brend və ya full stack web layihəsi üçün responsiv sayt və ya web tətbiq lazımdırsa, əməkdaşlığa açığam. Təmiz, istifadəçi yönümlü web həlləri yaratmaq üçün mənimlə əlaqə saxlaya bilərsiniz.',
                'footer.follow': 'M\u0259ni \u0130zl\u0259yin',
                'footer.contact': 'M\u0259niml\u0259 \u018flaq\u0259',
                'footer.message': 'M\u0259n\u0259 Yaz',
                'footer.cv': 'CV-mi A\u00e7',
                'footer.copy1': '&copy; My Portfolio 2026',
                'footer.copy2': 'Bak\u0131, Az\u0259rbaycan / Kamal t\u0259r\u0259find\u0259n',
                'footer.top': 'Yuxar\u0131 Qay\u0131t'
            },
            en: {
                pageTitle: 'My Portfolio | Kamal Həsənzadə',
                switcherLabel: 'EN',
                'nav.intro': 'Intro',
                'nav.about': 'About',
                'nav.works': 'Works',
                'nav.interests': 'Interests',
                'nav.contact': 'Contact',
                'hero.pretitle': 'Kamal Həsənzadə',
                'hero.title': 'Full Stack Developer <br>Building complete, responsive and business-focused web applications with React, APIs, databases and modern full stack technologies.',
                'hero.more': 'More About Me',
                'hero.contact': 'Get In Touch',
                'hero.cv': 'Get My CV',
                'about.title': 'About Me.',
                'about.text1': 'I am a full stack developer focused on building modern, responsive and user-friendly web applications for businesses and brands. My work covers React interfaces, API integration, backend logic and practical web experiences that are easy to use.',
                'about.text2': 'I am continuously improving my full stack skills, learning backend technologies, databases and modern web development workflows while solving real project challenges with a careful, detail-oriented approach.',
                'works.title': 'Selected Works.',
                'interests.title': 'Interests.',
                'numbers.title': 'Highlights.',
                'numbers.projects.title': 'Featured Projects',
                'numbers.projects.text': 'Real projects showing business websites, web applications and modern full stack development skills.',
                'numbers.education.title': 'Years of Education',
                'numbers.education.text': 'Professional education in web design software plus ongoing full stack development study.',
                'numbers.english.title': 'English Level',
                'numbers.english.text': 'Useful for following documentation, learning from resources, and improving through global content.',
                'numbers.motivation.title': 'Motivation',
                'numbers.motivation.text': 'Constant motivation to keep building better web applications, learn faster, and grow through real work.',
                'interests.text': 'Outside of project work, my interests reflect the same energy I bring into learning and full stack development. I enjoy following motorsport and especially Formula 1, spending time with technology and programming, and continuously working on self-development.',
                'interests.formula.title': 'Formula 1',
                'interests.formula.cat': 'Motorsport &bull; Strategy &bull; Race Weekend',
                'interests.tech.title': 'Technology & Programming',
                'interests.tech.cat': 'Technology &bull; Coding &bull; Full Stack',
                'interests.growth.title': 'Self-Development',
                'interests.growth.cat': 'Growth &bull; Learning &bull; Better Every Day',
                'footer.title': 'Get In Touch.',
                'footer.text': 'Need a responsive website, full stack web app or business platform? I am open to freelance work and collaboration where I can create clean, user-friendly web solutions.',
                'footer.follow': 'Follow Me',
                'footer.contact': 'Contact Me',
                'footer.message': 'Message Me',
                'footer.cv': 'Get My CV',
                'footer.copy1': '&copy; My Portfolio 2026',
                'footer.copy2': 'Based in Baku, Azerbaijan / By Kamal',
                'footer.top': 'Back To Top'
            },
            ru: {
                pageTitle: 'My Portfolio | Kamal Həsənzadə',
                switcherLabel: 'RU',
                'nav.intro': '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
                'nav.about': '\u041e\u0431\u043e \u043c\u043d\u0435',
                'nav.works': '\u0420\u0430\u0431\u043e\u0442\u044b',
                'nav.interests': '\u0418\u043d\u0442\u0435\u0440\u0435\u0441\u044b',
                'nav.contact': '\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
                'hero.pretitle': 'Kamal Həsənzadə',
                'hero.title': 'Full Stack Developer <br>Создаю современные, адаптивные и бизнес-ориентированные веб-приложения с React, API, базами данных и modern full stack технологиями.',
                'hero.more': '\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u041e\u0431\u043e \u041c\u043d\u0435',
                'hero.contact': '\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f',
                'hero.cv': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c CV',
                'about.title': '\u041e\u0431\u043e \u043c\u043d\u0435.',
                'about.text1': 'Я full stack developer, сфокусированный на современных, адаптивных и удобных веб-приложениях для бизнесов и брендов. Моя работа включает React-интерфейсы, API-интеграцию, backend-логику и практичные веб-решения.',
                'about.text2': 'Я постоянно развиваю full stack навыки, изучаю backend-технологии, базы данных и современные web development процессы.',
                'works.title': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u0420\u0430\u0431\u043e\u0442\u044b.',
                'interests.title': '\u0418\u043d\u0442\u0435\u0440\u0435\u0441\u044b.',
                'numbers.title': '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u0438.',
                'numbers.projects.title': '\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u041f\u0440\u043e\u0435\u043a\u0442\u044b',
                'numbers.projects.text': 'Реальные проекты, показывающие бизнес-сайты, веб-приложения и современные full stack навыки.',
                'numbers.education.title': '\u0413\u043e\u0434\u044b \u041e\u0431\u0443\u0447\u0435\u043d\u0438\u044f',
                'numbers.education.text': '\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043f\u043e \u0432\u0435\u0431-\u0434\u0438\u0437\u0430\u0439\u043d\u0443 \u0438 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u043d\u043e\u043c\u0443 \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0435\u043d\u0438\u044e, \u0430 \u0442\u0430\u043a\u0436\u0435 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u044e\u0449\u0435\u0435\u0441\u044f \u0438\u0437\u0443\u0447\u0435\u043d\u0438\u0435 full stack development.',
                'numbers.english.title': '\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u0433\u043e',
                'numbers.english.text': '\u041f\u043e\u043b\u0435\u0437\u043d\u043e \u0434\u043b\u044f \u0447\u0442\u0435\u043d\u0438\u044f \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u0438, \u0438\u0437\u0443\u0447\u0435\u043d\u0438\u044f \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432 \u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044f \u0447\u0435\u0440\u0435\u0437 \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0439 \u043a\u043e\u043d\u0442\u0435\u043d\u0442.',
                'numbers.motivation.title': '\u041c\u043e\u0442\u0438\u0432\u0430\u0446\u0438\u044f',
                'numbers.motivation.text': '\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u0430\u044f \u043c\u043e\u0442\u0438\u0432\u0430\u0446\u0438\u044f \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043b\u0443\u0447\u0448\u0438\u0435 \u0432\u0435\u0431-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f, \u0431\u044b\u0441\u0442\u0440\u0435\u0435 \u0443\u0447\u0438\u0442\u044c\u0441\u044f \u0438 \u0440\u0430\u0441\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 \u0440\u0435\u0430\u043b\u044c\u043d\u0443\u044e \u0440\u0430\u0431\u043e\u0442\u0443.',
                'interests.text': '\u0412\u043d\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u043c\u043e\u0438 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u044b \u043e\u0442\u0440\u0430\u0436\u0430\u044e\u0442 \u0442\u0443 \u0436\u0435 \u044d\u043d\u0435\u0440\u0433\u0438\u044e, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u044f \u0432\u043a\u043b\u0430\u0434\u044b\u0432\u0430\u044e \u0432 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u0438 full stack \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435. \u041c\u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u0441\u043b\u0435\u0434\u0438\u0442\u044c \u0437\u0430 \u0430\u0432\u0442\u043e\u0441\u043f\u043e\u0440\u0442\u043e\u043c \u0438 \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e \u0437\u0430 Formula 1, \u0437\u0430\u043d\u0438\u043c\u0430\u0442\u044c\u0441\u044f \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f\u043c\u0438 \u0438 \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435\u043c, \u0430 \u0442\u0430\u043a\u0436\u0435 \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u043e \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0442\u044c \u0441\u0435\u0431\u044f.',
                'interests.formula.title': 'Formula 1',
                'interests.formula.cat': '\u0410\u0432\u0442\u043e\u0441\u043f\u043e\u0440\u0442 &bull; \u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f &bull; \u0413\u043e\u043d\u043e\u0447\u043d\u044b\u0439 \u0423\u0438\u043a\u0435\u043d\u0434',
                'interests.tech.title': '\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438 \u0438 \u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435',
                'interests.tech.cat': '\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438 &bull; \u041a\u043e\u0434\u0438\u043d\u0433 &bull; Full Stack',
                'interests.growth.title': '\u0421\u0430\u043c\u043e\u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435',
                'interests.growth.cat': '\u0420\u043e\u0441\u0442 &bull; \u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 &bull; \u041b\u0443\u0447\u0448\u0435 \u041a\u0430\u0436\u0434\u044b\u0439 \u0414\u0435\u043d\u044c',
                'footer.title': '\u0421\u0432\u044f\u0437\u044c.',
                'footer.text': 'Если нужен адаптивный сайт, full stack веб-приложение или бизнес-платформа, я открыт к freelance-работе и сотрудничеству, где могу создавать чистые и удобные веб-решения.',
                'footer.follow': '\u0421\u043b\u0435\u0434\u0438\u0442\u0435 \u0417\u0430 \u041c\u043d\u043e\u0439',
                'footer.contact': '\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0421\u043e \u041c\u043d\u043e\u0439',
                'footer.message': '\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u041c\u043d\u0435',
                'footer.cv': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c CV',
                'footer.copy1': '&copy; My Portfolio 2026',
                'footer.copy2': '\u0411\u0430\u043a\u0443, \u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043d / \u0410\u0432\u0442\u043e\u0440: \u041a\u0430\u043c\u0430\u043b',
                'footer.top': '\u041d\u0430\u0432\u0435\u0440\u0445'
            }
        };

        const closeMenu = function() {
            switcher.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        const openMenu = function() {
            switcher.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        };

        const setLanguage = function(lang) {
            const dict = translations[lang] || translations.en;

            translatableNodes.forEach(function(node) {
                const key = node.dataset.i18n;
                if (dict[key]) node.innerHTML = dict[key];
            });

            document.documentElement.lang = lang;
            document.title = dict.pageTitle;
            currentLabel.textContent = dict.switcherLabel;

            options.forEach(function(option) {
                option.classList.toggle('is-active', option.dataset.lang === lang);
            });
        };

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (switcher.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        options.forEach(function(option) {
            option.addEventListener('click', function() {
                setLanguage(option.dataset.lang);
                closeMenu();
            });
        });

        document.addEventListener('click', function(e) {
            if (!switcher.contains(e.target)) closeMenu();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeMenu();
        });

        setLanguage('en');
    };
   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();
        ssLanguageSwitcher();

    })();

})(document.documentElement);
