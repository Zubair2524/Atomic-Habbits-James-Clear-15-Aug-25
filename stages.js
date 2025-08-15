// Stages page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeStagesPage();
});

function initializeStagesPage() {
    // Initialize theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-royal';
    document.body.className = savedTheme;
    
    // Get user data and selected habit
    const userData = JSON.parse(localStorage.getItem('userData'));
    const selectedHabit = JSON.parse(localStorage.getItem('selectedHabit'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    if (!userData || !selectedHabit || !habitType) {
        window.location.href = 'habits.html';
        return;
    }
    
    // Display user greeting and habit
    displayUserGreeting(userData);
    displaySelectedHabit(selectedHabit, habitType);
    
    // Load stage content
    loadStageContent(habitType);
    
    // Add entrance animations
    setTimeout(() => {
        animateStagesEntrance();
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

function displaySelectedHabit(habit, habitType) {
    const selectedHabitDiv = document.getElementById('selectedHabit');
    if (!selectedHabitDiv) return;
    
    const actionText = habitType === 'good' ? 'Building' : 'Breaking';
    const color = habitType === 'good' ? '#10b981' : '#ef4444';
    
    selectedHabitDiv.innerHTML = `
        <div class="selected-habit-display">
            <div class="habit-status" style="color: ${color};">
                <i class="${habit.icon}"></i>
                <span>${actionText}: ${habit.title}</span>
            </div>
            <p class="habit-description">${habit.description}</p>
        </div>
    `;
    
    // Add some styling
    selectedHabitDiv.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 1.5rem;
        margin: 1rem 0;
        text-align: center;
        color: white;
    `;
}

function loadStageContent(habitType) {
    const stages = window.stagesData[habitType];
    if (!stages) return;
    
    for (let i = 1; i <= 4; i++) {
        const stageContent = document.getElementById(`stage${i}Content`);
        const stage = stages[`stage${i}`];
        
        if (stageContent && stage) {
            stageContent.innerHTML = createStageHTML(stage);
        }
    }
}

function createStageHTML(stage) {
    return `
        <div class="stage-overview">
            <p class="stage-description">${stage.content.overview}</p>
        </div>
        
        <div class="stage-strategies">
            <h4><i class="fas fa-lightbulb"></i> Key Strategies:</h4>
            <ul class="strategies-list">
                ${stage.content.strategies.map(strategy => `
                    <li><i class="fas fa-arrow-right"></i> ${strategy}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="stage-examples">
            <h4><i class="fas fa-star"></i> Practical Examples:</h4>
            <p class="examples-text">${stage.content.examples}</p>
        </div>
        
        <div class="stage-science">
            <h4><i class="fas fa-flask"></i> Scientific Foundation:</h4>
            <p class="science-text">${stage.content.scientific_basis}</p>
        </div>
        
        <div class="stage-action">
            <button class="stage-complete-btn" onclick="completeStage(${stage.number || '1'})">
                <i class="fas fa-check"></i>
                Mark Stage as Complete
            </button>
        </div>
    `;
}

function completeStage(stageNumber) {
    const stageCard = document.querySelector(`[data-stage="${stageNumber}"]`);
    if (!stageCard) return;
    
    // Visual feedback
    stageCard.classList.add('completed');
    const completeBtn = stageCard.querySelector('.stage-complete-btn');
    
    if (completeBtn) {
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed!';
        completeBtn.disabled = true;
        completeBtn.style.background = '#10b981';
    }
    
    // Add completion animation
    stageCard.style.transform = 'scale(1.02)';
    stageCard.style.border = '2px solid #10b981';
    stageCard.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
    
    setTimeout(() => {
        stageCard.style.transform = '';
    }, 500);
    
    // Update progress
    updateProgress();
    
    // Save stage completion
    saveStageCompletion(stageNumber);
}

function updateProgress() {
    const completedStages = document.querySelectorAll('.stage-card.completed').length;
    const totalStages = 4;
    const progress = (completedStages / totalStages) * 100;
    
    // Store progress
    localStorage.setItem('stageProgress', JSON.stringify({
        completed: completedStages,
        total: totalStages,
        percentage: progress
    }));
    
    // Show quiz button if all stages completed
    if (completedStages === totalStages) {
        showQuizButton();
    }
}

function showQuizButton() {
    const actionSection = document.querySelector('.action-section');
    if (actionSection) {
        actionSection.innerHTML = `
            <div class="completion-message">
                <h3><i class="fas fa-trophy"></i> Congratulations!</h3>
                <p>You've completed all four stages. Ready to test your knowledge?</p>
            </div>
            <button onclick="startQuiz()" class="primary-btn quiz-btn">
                <i class="fas fa-brain"></i>
                Take the Quiz
            </button>
        `;
        
        // Add celebration animation
        const celebrationCSS = `
            @keyframes celebration {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = celebrationCSS;
        document.head.appendChild(style);
        
        actionSection.style.animation = 'celebration 0.8s ease-in-out';
    }
}

async function saveStageCompletion(stageNumber) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const selectedHabit = JSON.parse(localStorage.getItem('selectedHabit'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    const progressData = {
        habit_type: habitType,
        selected_habit: selectedHabit.title,
        current_stage: stageNumber,
        progress_percentage: (stageNumber / 4) * 100
    };
    
    try {
        await window.supabaseClient.updateUserProgress(userData.email, progressData);
    } catch (error) {
        console.error('Error saving stage completion:', error);
    }
}

function startQuiz() {
    // Add exit animation
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            window.location.href = 'quiz.html';
        }, 300);
    } else {
        window.location.href = 'quiz.html';
    }
}

function animateStagesEntrance() {
    const stageCards = document.querySelectorAll('.stage-card');
    
    stageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Animate action section
    const actionSection = document.querySelector('.action-section');
    if (actionSection) {
        actionSection.style.opacity = '0';
        actionSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            actionSection.style.transition = 'all 0.6s ease';
            actionSection.style.opacity = '1';
            actionSection.style.transform = 'translateY(0)';
        }, 1000);
    }
}

function goBack() {
    // Add exit animation
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            window.location.href = 'habits.html';
        }, 300);
    } else {
        window.location.href = 'habits.html';
    }
}

// Add CSS for completed stages
const stageCSS = `
    .stage-card.completed {
        background: rgba(16, 185, 129, 0.1);
        border-color: rgba(16, 185, 129, 0.3);
    }
    
    .stage-card .stage-overview {
        margin-bottom: 1.5rem;
    }
    
    .stage-description {
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.6;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    
    .strategies-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
    }
    
    .strategies-list li {
        color: rgba(255, 255, 255, 0.8);
        padding: 0.5rem 0;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .strategies-list li i {
        color: #ffd700;
        margin-top: 0.2rem;
        flex-shrink: 0;
    }
    
    .stage-strategies h4,
    .stage-examples h4,
    .stage-science h4 {
        color: white;
        font-size: 1.1rem;
        margin: 1.5rem 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .stage-strategies h4 i {
        color: #ffd700;
    }
    
    .examples-text,
    .science-text {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        font-style: italic;
        margin: 1rem 0;
    }
    
    .stage-complete-btn {
        background: linear-gradient(45deg, #3b82f6, #60a5fa);
        border: none;
        border-radius: 10px;
        color: white;
        padding: 0.8rem 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.5rem;
        width: 100%;
        justify-content: center;
        font-weight: 600;
    }
    
    .stage-complete-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
    }
    
    .stage-complete-btn:disabled {
        cursor: not-allowed;
        transform: none;
    }
    
    .completion-message {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .completion-message h3 {
        color: #ffd700;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .completion-message p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
    }
    
    .quiz-btn {
        background: linear-gradient(45deg, #10b981, #34d399) !important;
        font-size: 1.2rem !important;
        padding: 1.2rem 3rem !important;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = stageCSS;
document.head.appendChild(style);

// Export functions globally
window.startQuiz = startQuiz;
window.completeStage = completeStage;
window.goBack = goBack;