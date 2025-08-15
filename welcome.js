// Welcome page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeWelcomePage();
});

function initializeWelcomePage() {
    // Initialize theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-royal';
    document.body.className = savedTheme;
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
        // Redirect to registration if no user data
        window.location.href = 'index.html';
        return;
    }
    
    // Display user greeting
    displayUserGreeting(userData);
    
    // Initialize animations
    setTimeout(() => {
        window.animationManager.initializePageAnimations('welcome');
    }, 500);
    
    // Add entrance animations
    animateWelcomeElements();
}

function displayUserGreeting(userData) {
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        userGreeting.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>Welcome, ${userData.fullName}!</span>
        `;
    }
    
    // Update page title
    document.title = `Welcome ${userData.fullName} | STAR-Shaigan Learning Portal`;
    
    // Add personalized welcome message
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.innerHTML = `
            <span class="gradient-text">Welcome ${userData.fullName}</span>
            <br>Transform Your Life, One Habit at a Time
        `;
    }
}

function selectHabitType(type) {
    // Store selected habit type
    localStorage.setItem('selectedHabitType', type);
    
    // Add selection animation
    const selectedCard = document.querySelector(`.${type}-habits`);
    if (selectedCard) {
        selectedCard.style.transform = 'scale(1.05)';
        selectedCard.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            selectedCard.style.transform = 'scale(1)';
            selectedCard.style.filter = 'brightness(1)';
        }, 200);
    }
    
    // Show loading state
    showLoadingOverlay('Loading habits...');
    
    // Navigate to habits page
    setTimeout(() => {
        window.location.href = 'habits.html';
    }, 800);
}

function animateWelcomeElements() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate choice cards
    const choiceCards = document.querySelectorAll('.choice-card');
    choiceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 200));
    });
    
    // Animate stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            statsSection.style.transition = 'all 0.8s ease';
            statsSection.style.opacity = '1';
            statsSection.style.transform = 'translateY(0)';
            
            // Animate numbers counting up
            animateCounters();
        }, 1500);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + '+';
            }
        }, 50);
    });
}

function showLoadingOverlay(message) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <i class="fas fa-star"></i>
            </div>
            <p>${message}</p>
        </div>
    `;
    
    // Add overlay styles
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Add loading content styles
    const loadingContent = overlay.querySelector('.loading-content');
    Object.assign(loadingContent.style, {
        textAlign: 'center',
        color: 'white'
    });
    
    const loadingSpinner = overlay.querySelector('.loading-spinner');
    Object.assign(loadingSpinner.style, {
        fontSize: '3rem',
        marginBottom: '1rem',
        color: '#ffd700',
        animation: 'spin 1s linear infinite'
    });
    
    // Add spin animation
    const spinCSS = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    if (!document.querySelector('#spin-style')) {
        const spinStyle = document.createElement('style');
        spinStyle.id = 'spin-style';
        spinStyle.textContent = spinCSS;
        document.head.appendChild(spinStyle);
    }
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 100);
}

// Export functions globally
window.selectHabitType = selectHabitType;