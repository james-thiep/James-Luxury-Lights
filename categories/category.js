document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Dropdown Menu for Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (window.innerWidth < 992) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('show');
                
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a dropdown toggle
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Skip if href is just "#"
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.solution-card, .feature-card, .project-card');
    
    const revealOnScroll = function() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Add active class to solution cards for animation
    document.querySelectorAll('.solution-card, .feature-card, .project-card').forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
    
    // Cart functionality (basic)
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartIcon) {
        // Load cart count from localStorage
        const savedCartCount = localStorage.getItem('cartCount') || '0';
        if (cartCount) {
            cartCount.textContent = savedCartCount;
        }
        
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Shopping cart functionality will be implemented here.');
        });
    }
    
    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if search overlay already exists
            let searchOverlay = document.querySelector('.search-overlay');
            
            if (!searchOverlay) {
                // Create search overlay
                searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';
                searchOverlay.innerHTML = `
                    <div class="search-overlay-content">
                        <button class="close-search">&times;</button>
                        <h2>Search Our Products</h2>
                        <div class="search-form">
                            <input type="text" placeholder="Search for products..." class="search-input">
                            <button class="search-submit">Search</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(searchOverlay);
                
                // Add styles for search overlay
                const searchStyles = document.createElement('style');
                searchStyles.textContent = `
                    .search-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        z-index: 1000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                    }
                    
                    .search-overlay.active {
                        opacity: 1;
                        visibility: visible;
                    }
                    
                    .search-overlay-content {
                        width: 90%;
                        max-width: 600px;
                        text-align: center;
                        color: white;
                    }
                    
                    .close-search {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        color: white;
                        font-size: 2rem;
                        background: none;
                        border: none;
                        cursor: pointer;
                    }
                    
                    .search-form {
                        display: flex;
                        margin-top: 30px;
                    }
                    
                    .search-input {
                        flex-grow: 1;
                        padding: 15px;
                        border: none;
                        font-size: 1rem;
                    }
                    
                    .search-submit {
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 0 25px;
                        cursor: pointer;
                        font-weight: 500;
                    }
                `;
                document.head.appendChild(searchStyles);
                
                // Close search overlay
                document.querySelector('.close-search').addEventListener('click', function() {
                    searchOverlay.classList.remove('active');
                    setTimeout(() => {
                        searchOverlay.remove();
                    }, 300);
                });
                
                // Form submission
                document.querySelector('.search-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const searchValue = document.querySelector('.search-input').value;
                    
                    if (searchValue.trim() !== '') {
                        alert(`Search functionality for "${searchValue}" will be implemented here.`);
                    }
                });
                
                // Button click
                document.querySelector('.search-submit').addEventListener('click', function() {
                    const searchValue = document.querySelector('.search-input').value;
                    
                    if (searchValue.trim() !== '') {
                        alert(`Search functionality for "${searchValue}" will be implemented here.`);
                    }
                });
            }
            
            // Show search overlay
            setTimeout(() => {
                searchOverlay.classList.add('active');
                document.querySelector('.search-input').focus();
            }, 10);
        });
    }
});