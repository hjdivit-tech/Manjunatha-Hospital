document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 3. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 4. Form Submission & Toast
    const appointmentForm = document.getElementById('appointmentForm');
    const toast = document.getElementById('toast');
    const submitBtn = document.getElementById('submitBtn');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // Simulate API call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Request Appointment';

                // Show Toast
                toast.querySelector('#toastDesc').textContent = `Thank you ${name}, we will contact you shortly.`;
                toast.classList.add('show');

                // Hide Toast after 4s
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);

                appointmentForm.reset();
            }, 1500);
        });
    }

    // 5. Scroll Reveal Animations (manual implementation of AOS)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));

    // 6. Smooth Scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
