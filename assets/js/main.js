/* ======================================
   MAPPATURA SASSARI — Main JS
   ====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* --- Header scroll effect --- */
    var header = document.querySelector(".site-header");
    if (header) {
        window.addEventListener("scroll", function () {
            header.classList.toggle("scrolled", window.scrollY > 20);
        });
    }

    /* --- Mobile menu toggle --- */
    var toggle = document.getElementById("menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    
    if (toggle && mobileNav) {
        // Toggle menu
        toggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var isActive = mobileNav.classList.toggle("active");
            toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
            
            // Change icon
            var svg = toggle.querySelector("svg");
            if (svg) {
                if (isActive) {
                    // Show X icon
                    svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>';
                } else {
                    // Show hamburger icon
                    svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/>';
                }
            }
            
            // Prevent body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        var mobileLinks = mobileNav.querySelectorAll("a");
        mobileLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                mobileNav.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
                
                // Reset icon
                var svg = toggle.querySelector("svg");
                if (svg) {
                    svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/>';
                }
            });
        });
        
        // Close menu when clicking outside (on the overlay)
        mobileNav.addEventListener("click", function(e) {
            // Se clicchi sullo sfondo (non sui link), chiudi il menu
            if (e.target === mobileNav) {
                mobileNav.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
                
                var svg = toggle.querySelector("svg");
                if (svg) {
                    svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/>';
                }
            }
        });
        
        // Close menu with ESC key
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && mobileNav.classList.contains("active")) {
                mobileNav.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
                
                var svg = toggle.querySelector("svg");
                if (svg) {
                    svg.innerHTML = '<line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round"/>';
                }
            }
        });
    }
    /* --- Hero slideshow --- */
    var slides = document.querySelectorAll(".hero-slide");
    var dots = document.querySelectorAll(".hero-dot");
    if (slides.length > 0) {
        var currentSlide = 0;
        var timer;

        function goToSlide(n) {
            slides[currentSlide].classList.remove("active");
            if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
            if (dots[currentSlide]) dots[currentSlide].classList.add("active");
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startTimer() {
            timer = setInterval(nextSlide, 6000);
        }

        // Init
        goToSlide(0);
        startTimer();

        // Arrow buttons
        var prevBtn = document.querySelector(".hero-arrow.prev");
        var nextBtn = document.querySelector(".hero-arrow.next");
        if (prevBtn) prevBtn.addEventListener("click", function () { clearInterval(timer); prevSlide(); startTimer(); });
        if (nextBtn) nextBtn.addEventListener("click", function () { clearInterval(timer); nextSlide(); startTimer(); });

        // Dot buttons
        dots.forEach(function (dot, i) {
            dot.addEventListener("click", function () {
                clearInterval(timer);
                goToSlide(i);
                startTimer();
            });
        });

        // Expose globally for inline onclick (backward compat)
        window.plusSlides = function (n) {
            clearInterval(timer);
            goToSlide(currentSlide + n);
            startTimer();
        };
    }

    /* --- Language switcher (guida.html) --- */
    window.switchLang = function(lang) {
        document.querySelectorAll('.lang-content').forEach(function(el) { el.classList.remove('active'); });
        document.querySelectorAll('.lang-btn').forEach(function(el) { el.classList.remove('active'); });
        var target = document.getElementById('lang-' + lang);
        if (target) target.classList.add('active');
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
        });
    };

    /* --- Active nav link highlight --- */
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(function (link) {
        var href = link.getAttribute("href");
        if (href && (href === currentPage || href === "./" + currentPage)) {
            link.classList.add("active");
        }
    });

    /* --- Scroll reveal (P5) --- */
    if ('IntersectionObserver' in window) {
        var revealElements = document.querySelectorAll('.reveal');
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('revealed');
        });
    }
});
