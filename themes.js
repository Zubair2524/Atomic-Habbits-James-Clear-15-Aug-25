// Theme management system
const themes = {
    'theme-royal': {
        name: 'Royal',
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#ffd700',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)'
    },
    'theme-ocean': {
        name: 'Ocean',
        primary: '#2196F3',
        secondary: '#21CBF3',
        accent: '#ffd700',
        gradient: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 50%, #2196F3 100%)'
    },
    'theme-forest': {
        name: 'Forest',
        primary: '#11998e',
        secondary: '#38ef7d',
        accent: '#ffd700',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #11998e 100%)'
    }
};

function changeTheme(themeName) {
    // Remove existing theme classes
    document.body.classList.remove('theme-royal', 'theme-ocean', 'theme-forest');
    
    // Add new theme class
    document.body.classList.add(themeName);
    
    // Save to localStorage
    localStorage.setItem('selectedTheme', themeName);
    
    // Update theme colors dynamically
    updateThemeColors(themeName);
    
    // Add smooth transition
    document.body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
    
    // Update active theme button
    updateActiveThemeButton(themeName);
}

function updateThemeColors(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--gradient-bg', theme.gradient);
}

function updateActiveThemeButton(themeName) {
    // Remove active class from all theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to current theme button
    const activeBtn = document.querySelector(`.${themeName.replace('theme-', '')}-theme`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function initializeTheme() {
    // Get saved theme or default to royal
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-royal';
    changeTheme(savedTheme);
}

// Auto-initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add click handlers to theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const themeName = this.className.includes('royal') ? 'theme-royal' :
                             this.className.includes('ocean') ? 'theme-ocean' : 'theme-forest';
            changeTheme(themeName);
        });
    });
});

// Export functions globally
window.changeTheme = changeTheme;
window.initializeTheme = initializeTheme;