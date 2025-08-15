// Habits page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeHabitsPage();
});

function initializeHabitsPage() {
    // Initialize theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-royal';
    document.body.className = savedTheme;
    
    // Get user data and habit type
    const userData = JSON.parse(localStorage.getItem('userData'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    if (!userData || !habitType) {
        window.location.href = 'welcome.html';
        return;
    }
    
    // Display user greeting
    displayUserGreeting(userData);
    
    // Update page content based on habit type
    updatePageTitle(habitType);
    
    // Load and display habits
    loadHabits(habitType);
    
    // Initialize search functionality
    initializeSearch();
    
    // Add entrance animations
    setTimeout(() => {
        animateHabitsEntrance();
    }, 300);
}

function displayUserGreeting(userData) {
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        userGreeting.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>Welcome, ${userData.fullName}!</span>
        `;
    }
}

function updatePageTitle(habitType) {
    const pageTitle = document.getElementById('pageTitle');
    const title = habitType === 'good' ? 'Choose a Good Habit to Develop' : 'Choose a Bad Habit to Overcome';
    
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    
    document.title = `${title} | STAR-Shaigan Learning Portal`;
}

function loadHabits(habitType) {
    const habitsGrid = document.getElementById('habitsGrid');
    if (!habitsGrid) return;
    
    const habits = window.habitsData[habitType];
    if (!habits) return;
    
    habitsGrid.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitElement = createHabitElement(habit, index);
        habitsGrid.appendChild(habitElement);
    });
}

function createHabitElement(habit, index) {
    const habitDiv = document.createElement('div');
    habitDiv.className = 'habit-item';
    habitDiv.setAttribute('data-habit-id', habit.id);
    habitDiv.setAttribute('data-search', habit.title.toLowerCase() + ' ' + habit.description.toLowerCase());
    
    habitDiv.innerHTML = `
        <div class="habit-category ${localStorage.getItem('selectedHabitType')}">
            ${habit.category}
        </div>
        <div class="habit-icon">
            <i class="${habit.icon}"></i>
        </div>
        <h3>${habit.title}</h3>
        <p>${habit.description}</p>
        <div class="habit-action">
            <button class="select-habit-btn" onclick="selectHabit('${habit.id}')">
                <i class="fas fa-arrow-right"></i>
                Choose This Habit
            </button>
        </div>
    `;
    
    // Add click handler for the entire card
    habitDiv.addEventListener('click', (e) => {
        if (!e.target.closest('.select-habit-btn')) {
            selectHabit(habit.id);
        }
    });
    
    // Add hover effects
    habitDiv.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });
    
    habitDiv.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
    
    return habitDiv;
}

function selectHabit(habitId) {
    const habitType = localStorage.getItem('selectedHabitType');
    const habit = window.habitsData[habitType].find(h => h.id === habitId);
    
    if (!habit) return;
    
    // Store selected habit
    localStorage.setItem('selectedHabit', JSON.stringify(habit));
    
    // Add selection animation
    const habitElement = document.querySelector(`[data-habit-id="${habitId}"]`);
    if (habitElement) {
        habitElement.style.transform = 'scale(0.95)';
        habitElement.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            habitElement.style.transform = 'scale(1)';
            habitElement.style.filter = 'brightness(1)';
        }, 200);
    }
    
    // Show loading state
    showLoadingOverlay('Preparing your journey...');
    
    // Save progress to Supabase
    saveHabitSelection(habit);
    
    // Navigate to stages page
    setTimeout(() => {
        window.location.href = 'stages.html';
    }, 1200);
}

async function saveHabitSelection(habit) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    const progressData = {
        habit_type: habitType,
        selected_habit: habit.title,
        current_stage: 1,
        progress_percentage: 0
    };
    
    try {
        await window.supabaseClient.updateUserProgress(userData.email, progressData);
    } catch (error) {
        console.error('Error saving habit selection:', error);
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('habitSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const habitItems = document.querySelectorAll('.habit-item');
        
        habitItems.forEach(item => {
            const searchText = item.getAttribute('data-search');
            const isMatch = searchText.includes(searchTerm);
            
            item.style.display = isMatch ? 'block' : 'none';
            
            if (isMatch && searchTerm) {
                // Highlight matching text
                highlightSearchTerm(item, searchTerm);
            }
        });
    });
}

function highlightSearchTerm(element, term) {
    const title = element.querySelector('h3');
    const description = element.querySelector('p');
    
    [title, description].forEach(el => {
        if (!el) return;
        
        const originalText = el.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
        
        if (highlightedText !== originalText) {
            el.innerHTML = highlightedText;
        }
    });
}

function animateHabitsEntrance() {
    const habitItems = document.querySelectorAll('.habit-item');
    
    habitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function goBack() {
    // Add exit animation
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 300);
    } else {
        window.location.href = 'welcome.html';
    }
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
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 100);
}

// Export functions globally
window.selectHabit = selectHabit;
window.goBack = goBack;