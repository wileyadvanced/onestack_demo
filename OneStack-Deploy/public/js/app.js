// Modern 2025 JavaScript for Interactive Features

class NexusApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollEffects();
        this.initAnimations();
        this.initMobileNavigation();
        this.initThemeEffects();
        this.initSearch();
        this.initAnalytics();
        this.initAnalyticsToggle();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });

        // Navigation toggle for mobile
        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.addEventListener('click', this.toggleMobileNav.bind(this));
        }

        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active navigation link
            this.updateActiveNavLink(targetId);
        }
    }

    updateActiveNavLink(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    handleButtonClick(e) {
        const button = e.currentTarget;

        // Add ripple effect
        this.createRippleEffect(button, e);

        // Add haptic feedback simulation
        this.triggerHapticFeedback();

        // Handle specific button actions
        if (button.classList.contains('btn-primary')) {
            this.handlePrimaryAction();
        } else if (button.classList.contains('btn-secondary')) {
            this.handleSecondaryAction();
        }
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    triggerHapticFeedback() {
        // Simulate haptic feedback for modern devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    handlePrimaryAction() {
        // Simulate loading state
        const button = document.querySelector('.btn-primary');
        const originalText = button.innerHTML;

        button.innerHTML = '<span class="material-icons">hourglass_empty</span> Loading...';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showNotification('Welcome to Nexus 2025! 🚀', 'success');
        }, 2000);
    }

    handleSecondaryAction() {
        this.showNotification('Demo feature coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
        // Create modern notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="material-icons">${this.getNotificationIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius)',
            padding: '1rem 1.5rem',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '300px'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check_circle';
            case 'error': return 'error';
            case 'warning': return 'warning';
            default: return 'info';
        }
    }

    initScrollEffects() {
        // Parallax effect for hero elements
        const heroElements = document.querySelectorAll('.floating-element');
        const heroVisual = document.querySelector('.hero-visual');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }

            heroElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .about-text, .about-visual').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Typing effect for hero title
        this.initTypingEffect();
    }

    initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    initMobileNavigation() {
        // Mobile navigation state
        this.mobileNavOpen = false;
    }

    toggleMobileNav() {
        this.mobileNavOpen = !this.mobileNavOpen;
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.getElementById('navToggle');

        if (this.mobileNavOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--glass)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.border = '1px solid var(--glass-border)';
            navLinks.style.borderRadius = '0 0 var(--border-radius) var(--border-radius)';
            navLinks.style.padding = '1rem';
            navToggle.innerHTML = '<span class="material-icons">close</span>';
        } else {
            navLinks.style.display = 'none';
            navToggle.innerHTML = '<span class="material-icons">menu</span>';
        }
    }

    initThemeEffects() {
        // Dynamic theme effects based on scroll position
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const navbar = document.querySelector('.navbar');

            if (scrolled > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(30px)';
            } else {
                navbar.style.background = 'var(--glass)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        // Update active navigation based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    handleResize() {
        // Reset mobile navigation on resize
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.background = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.border = '';
                navLinks.style.borderRadius = '';
                navLinks.style.padding = '';
            }
            this.mobileNavOpen = false;
        }
    }

    initSearch() {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');

        if (searchForm) {
            searchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const query = searchInput.value.trim();

                if (!query) return;

                this.performSearch(query);
            });
        }
    }

    async performSearch(query) {
        const resultsDiv = document.getElementById('searchResults');
        const resultsContent = document.getElementById('resultsContent');
        const searchButton = document.querySelector('.search-button');

        // Show loading state
        searchButton.querySelector('.material-icons').textContent = 'hourglass_empty';
        searchButton.disabled = true;

        resultsDiv.style.display = 'block';
        resultsContent.innerHTML = '<div class="loading-spinner"><span class="material-icons">autorenew</span> Casting search spell...</div>';

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            this.displayResults(data);
        } catch (error) {
            resultsContent.innerHTML = `
                <div class="error-message">
                    <span class="material-icons">error_outline</span>
                    <p>The spell fizzled! ${error.message}</p>
                </div>
            `;
        } finally {
            // Reset button state
            searchButton.querySelector('.material-icons').textContent = 'auto_awesome';
            searchButton.disabled = false;
        }
    }

    displayResults(data) {
        const resultsContent = document.getElementById('resultsContent');

        if (!data.items || data.items.length === 0) {
            resultsContent.innerHTML = `
                <div class="no-results">
                    <span class="material-icons">search_off</span>
                    <p>No magical results found. Try a different incantation!</p>
                </div>
            `;
            return;
        }

        // Extract info card data from first result
        const firstItem = data.items[0];
        const infoCard = this.buildInfoCard(firstItem);

        const resultsHTML = data.items.map((item, index) => {
            // Check for page images (thumbnails)
            const thumbnail = item.pagemap?.cse_thumbnail?.[0]?.src ||
                            item.pagemap?.cse_image?.[0]?.src ||
                            null;

            // Check for logos/site images
            const logo = item.pagemap?.metatags?.[0]?.['og:image'] || null;

            const imageUrl = thumbnail || logo;

            return `
                <div class="result-item" style="animation-delay: ${index * 0.1}s;">
                    <div class="result-content">
                        ${imageUrl ? `
                            <div class="result-image-wrapper">
                                <img src="${imageUrl}" alt="${item.title}" class="result-image" loading="lazy" onerror="this.parentElement.style.display='none'">
                            </div>
                        ` : ''}
                        <div class="result-text">
                            <div class="result-header">
                                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="result-title">
                                    ${item.title}
                                </a>
                            </div>
                            <p class="result-url">${item.displayLink}</p>
                            <p class="result-snippet">${item.snippet}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        resultsContent.innerHTML = `
            <div class="results-layout">
                <div class="results-main">
                    <div class="results-header">
                        <span class="material-icons">auto_awesome</span>
                        <p>The wizard conjured ${data.searchInformation.formattedTotalResults} magical results in ${data.searchInformation.formattedSearchTime} seconds</p>
                    </div>
                    ${resultsHTML}
                </div>
                ${infoCard}
            </div>
        `;

        // Update analytics after search
        setTimeout(() => this.fetchAnalytics(), 1000);
    }

    initAnalytics() {
        // Fetch analytics immediately
        this.fetchAnalytics();

        // Update every 5 seconds
        setInterval(() => this.fetchAnalytics(), 5000);
    }

    async fetchAnalytics() {
        try {
            const response = await fetch('/api/analytics');
            const data = await response.json();

            this.updateAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    }

    updateAnalytics(data) {
        const totalSearchesEl = document.getElementById('totalSearches');
        const mostPopularEl = document.getElementById('mostPopular');
        const avgResponseTimeEl = document.getElementById('avgResponseTime');

        if (totalSearchesEl && totalSearchesEl.textContent !== data.totalSearches.toString()) {
            this.animateValue(totalSearchesEl, parseInt(totalSearchesEl.textContent) || 0, data.totalSearches, 500);
        }

        if (mostPopularEl) {
            const newValue = data.mostPopular.length > 25
                ? data.mostPopular.substring(0, 25) + '...'
                : data.mostPopular;

            if (mostPopularEl.textContent !== newValue) {
                mostPopularEl.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    mostPopularEl.style.animation = '';
                }, 500);
                mostPopularEl.textContent = newValue;
            }
        }

        if (avgResponseTimeEl) {
            const newValue = `${data.avgResponseTime}ms`;
            if (avgResponseTimeEl.textContent !== newValue) {
                avgResponseTimeEl.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    avgResponseTimeEl.style.animation = '';
                }, 500);
                avgResponseTimeEl.textContent = newValue;
            }
        }
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    }

    initAnalyticsToggle() {
        const toggleBtn = document.getElementById('analyticsToggle');
        const closeBtn = document.getElementById('analyticsClose');
        const analyticsCard = document.getElementById('analyticsCard');

        if (toggleBtn && analyticsCard) {
            toggleBtn.addEventListener('click', () => {
                analyticsCard.classList.toggle('hidden');
            });
        }

        if (closeBtn && analyticsCard) {
            closeBtn.addEventListener('click', () => {
                analyticsCard.classList.add('hidden');
            });
        }
    }

    buildInfoCard(item) {
        // Extract structured data from the first result
        const pagemap = item.pagemap || {};
        const metatags = pagemap.metatags?.[0] || {};

        // Get main image - prioritize high quality images
        const mainImage = metatags['og:image'] ||
                         metatags['twitter:image'] ||
                         pagemap.cse_image?.[0]?.src ||
                         null;

        // Get organization/site info
        const siteName = metatags['og:site_name'] ||
                        metatags['og:title']?.split(' - ')[0] ||
                        metatags['twitter:title']?.split(' - ')[0] ||
                        item.displayLink.split('.')[0];

        const description = metatags['og:description'] ||
                          metatags['twitter:description'] ||
                          metatags['description'] ||
                          item.snippet;

        // Look for contact/location data - multiple sources
        const organization = pagemap.organization?.[0] || {};
        const postalAddress = pagemap.postaladdress?.[0] || {};
        const localBusiness = pagemap.localbusiness?.[0] || {};
        const place = pagemap.place?.[0] || {};

        const phone = organization.telephone ||
                     localBusiness.telephone ||
                     place.telephone || null;

        const address = organization.address ||
                       postalAddress.streetaddress ||
                       localBusiness.address ||
                       place.address || null;

        const city = postalAddress.addresslocality ||
                    place.addresslocality || null;

        const rating = organization.aggregaterating ||
                      localBusiness.aggregaterating ||
                      place.aggregaterating || null;

        // Check if this is a business/organization (has business-related data)
        const hasBusinessData = phone || address || rating ||
                               (pagemap.organization && pagemap.organization.length > 0) ||
                               (pagemap.localbusiness && pagemap.localbusiness.length > 0) ||
                               (pagemap.place && pagemap.place.length > 0);

        // Only show info card if we have a good image AND it's a business
        if (!mainImage || !hasBusinessData) {
            return '';
        }

        // Clean up site name
        const cleanSiteName = siteName.replace(/\s*[-|]\s*.*/g, '').trim();

        return `
            <div class="info-card">
                <div class="info-card-header">
                    <span class="material-icons">auto_fix_high</span>
                    <h3>Wizard's Knowledge</h3>
                </div>

                <div class="info-card-image">
                    <img src="${mainImage}" alt="${cleanSiteName}" onerror="this.closest('.info-card').remove()">
                </div>

                <div class="info-card-body">
                    <h4 class="info-card-title">${cleanSiteName}</h4>
                    <p class="info-card-description">${description.substring(0, 180)}${description.length > 180 ? '...' : ''}</p>

                    ${phone ? `
                        <div class="info-card-item">
                            <span class="material-icons">phone</span>
                            <a href="tel:${phone}" class="info-link">${phone}</a>
                        </div>
                    ` : ''}

                    ${address || city ? `
                        <div class="info-card-item">
                            <span class="material-icons">place</span>
                            <span>${address || ''}${address && city ? ', ' : ''}${city || ''}</span>
                        </div>
                    ` : ''}

                    ${rating ? `
                        <div class="info-card-item">
                            <span class="material-icons">star</span>
                            <span>${rating} ⭐</span>
                        </div>
                    ` : ''}

                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="info-card-link">
                        <span class="material-icons">open_in_new</span>
                        Visit Website
                    </a>
                </div>
            </div>
        `;
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NexusApp();
});

// Add some modern CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .feature-card {
        animation: slideInUp 0.6s ease forwards;
        animation-delay: calc(var(--delay, 0) * 0.1s);
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .floating-card {
        animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(animationStyles);
