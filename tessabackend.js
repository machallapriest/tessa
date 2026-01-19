// main.js - Tessa.care Website Functionality

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    addToCart(productName, price) {
        const product = { name: productName, price, quantity: 1, id: Date.now() };
        this.items.push(product);
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${productName} added to cart!`);
    }

    saveCart() {
        localStorage.setItem('tessaCart', JSON.stringify(this.items));
    }

    loadCart() {
        return JSON.parse(localStorage.getItem('tessaCart')) || [];
    }

    updateCartCount() {
        const count = this.items.length;
        const badge = document.querySelector('.w-5.h-5.flex.items-center');
        if (badge) badge.textContent = count;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add event listeners to all "Add" buttons
document.querySelectorAll('button:contains("Add")').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const price = card.querySelector('.text-lg.font-semibold').textContent;
        cart.addToCart(productName, price);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Form submission success
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent! ✓';
        btn.classList.add('bg-green-600');
        
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.classList.remove('bg-green-600');
            contactForm.reset();
        }, 3000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .bg-white.rounded-lg.p-8').forEach(el => {
    observer.observe(el);
});