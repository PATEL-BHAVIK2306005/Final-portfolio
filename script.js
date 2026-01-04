// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Animate Hamburger
        const bars = mobileMenu.querySelectorAll('.bar');
        // Simple class toggle for animation in CSS if we added it, 
        // essentially just toggling the menu visibility for now.
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for anchor links (polyfill support if needed, though scroll-behavior: smooth handles most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate header offset
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Reveal Animations on Scroll (Simple visual effect)
const revealElements = document.querySelectorAll('.project-card, .skill-item, .contact-wrapper');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Initial styles for reveal elements (to be moved to CSS for cleaner separation, but setting here for checks)
revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
});

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Update Local Time in Footer
function updateTime() {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
}
setInterval(updateTime, 1000);
updateTime();

// BAPS Quotes Rotation
const bapsQuotes = [
    "In the joy of others, lies our own.",
    "Better a diamond with a flaw than a pebble without.",
    "Ghar Sabha is the master key to happy family life.",
    "Prayer is the call of the soul to God.",
    "To serve without expectation is true seva."
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('quote-display');

function rotateQuote() {
    if (!quoteElement) return;

    // Fade out
    quoteElement.style.opacity = '0';

    setTimeout(() => {
        // Change text
        currentQuoteIndex = (currentQuoteIndex + 1) % bapsQuotes.length;
        quoteElement.textContent = `"${bapsQuotes[currentQuoteIndex]}"`;

        // Fade in
        quoteElement.style.opacity = '1';
    }, 500); // Wait for fade out to complete
}

// Rotate every 30 seconds
setInterval(rotateQuote, 30000);
