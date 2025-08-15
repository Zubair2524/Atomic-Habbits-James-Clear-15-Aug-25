// Quiz functionality
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let quizStartTime = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeQuizPage();
});

function initializeQuizPage() {
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
    
    // Initialize quiz
    quizStartTime = new Date();
    loadQuestion();
    
    // Add entrance animation
    setTimeout(() => {
        animateQuizEntrance();
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

function loadQuestion() {
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    
    if (!questions || currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // Update progress
    updateProgress();
    
    // Update question counter
    updateQuestionCounter();
    
    // Load question content
    displayQuestion(question);
    
    // Reset UI state
    resetQuestionUI();
}

function displayQuestion(question) {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.onclick = () => selectOption(index);
            optionsContainer.appendChild(optionBtn);
        });
    }
}

function selectOption(selectedIndex) {
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    const question = questions[currentQuestionIndex];
    
    // Store selected answer
    selectedAnswers[currentQuestionIndex] = selectedIndex;
    
    // Update UI
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        
        if (index === selectedIndex) {
            btn.classList.add('selected');
        }
        
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            btn.classList.add('incorrect');
        }
        
        btn.disabled = true;
    });
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
        updateScoreDisplay();
        showCorrectFeedback(question.explanation);
    } else {
        showIncorrectFeedback(question.explanation);
    }
    
    // Show next button or finish button
    showNextButton();
}

function showCorrectFeedback(explanation) {
    showFeedback('Correct!', explanation, '#10b981');
}

function showIncorrectFeedback(explanation) {
    showFeedback('Incorrect', explanation, '#ef4444');
}

function showFeedback(title, explanation, color) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'question-feedback';
    feedbackDiv.innerHTML = `
        <div class="feedback-header" style="color: ${color};">
            <i class="fas fa-${title.toLowerCase() === 'correct!' ? 'check-circle' : 'times-circle'}"></i>
            <span>${title}</span>
        </div>
        <p class="feedback-explanation">${explanation}</p>
    `;
    
    // Style the feedback
    Object.assign(feedbackDiv.style, {
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${color}`,
        borderRadius: '10px',
        padding: '1rem',
        marginTop: '1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease'
    });
    
    const feedbackHeader = feedbackDiv.querySelector('.feedback-header');
    Object.assign(feedbackHeader.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '0.5rem'
    });
    
    const questionContent = document.querySelector('.question-content');
    questionContent.appendChild(feedbackDiv);
    
    // Animate in
    setTimeout(() => {
        feedbackDiv.style.opacity = '1';
        feedbackDiv.style.transform = 'translateY(0)';
    }, 100);
}

function showNextButton() {
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.style.display = 'flex';
        finishBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'flex';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    // Add transition animation
    const questionCard = document.getElementById('questionCard');
    questionCard.style.transform = 'translateX(-100px)';
    questionCard.style.opacity = '0';
    
    setTimeout(() => {
        loadQuestion();
        questionCard.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            questionCard.style.transition = 'all 0.3s ease';
            questionCard.style.transform = 'translateX(0)';
            questionCard.style.opacity = '1';
        }, 50);
    }, 300);
}

function finishQuiz() {
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const quizEndTime = new Date();
    const duration = Math.round((quizEndTime - quizStartTime) / 1000);
    
    // Store quiz results
    const quizResults = {
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        duration: duration,
        answers: selectedAnswers,
        completedAt: quizEndTime.toISOString()
    };
    
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
    // Save to Supabase
    saveQuizResults(quizResults);
    
    // Show completion animation
    showQuizCompletion(percentage);
    
    // Navigate to certificate page
    setTimeout(() => {
        window.location.href = 'certificate.html';
    }, 3000);
}

async function saveQuizResults(results) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const selectedHabit = JSON.parse(localStorage.getItem('selectedHabit'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    const quizData = {
        habit_type: habitType,
        selected_habit: selectedHabit.title,
        score: results.score,
        total_questions: results.totalQuestions,
        percentage: results.percentage
    };
    
    try {
        await window.supabaseClient.saveQuizResult(userData.email, quizData);
    } catch (error) {
        console.error('Error saving quiz results:', error);
    }
}

function showQuizCompletion(percentage) {
    const container = document.querySelector('.quiz-container');
    
    let message, color, icon;
    if (percentage >= 90) {
        message = 'Outstanding! You\'ve mastered the concepts!';
        color = '#10b981';
        icon = 'fas fa-trophy';
    } else if (percentage >= 70) {
        message = 'Great job! You have a solid understanding!';
        color = '#3b82f6';
        icon = 'fas fa-medal';
    } else if (percentage >= 50) {
        message = 'Good effort! Keep learning and growing!';
        color = '#f59e0b';
        icon = 'fas fa-star';
    } else {
        message = 'Don\'t give up! Review the content and try again!';
        color = '#ef4444';
        icon = 'fas fa-heart';
    }
    
    container.innerHTML = `
        <div class="quiz-completion">
            <div class="completion-icon" style="color: ${color};">
                <i class="${icon}"></i>
            </div>
            <h2>Quiz Complete!</h2>
            <div class="final-score">
                <span class="score-number">${score}/${window.quizData[localStorage.getItem('selectedHabitType')].length}</span>
                <span class="score-percentage">${percentage}%</span>
            </div>
            <p class="completion-message">${message}</p>
            <div class="loading-certificate">
                <div class="loading-spinner">
                    <i class="fas fa-certificate"></i>
                </div>
                <p>Preparing your certificate...</p>
            </div>
        </div>
    `;
    
    // Add completion styles
    const completionCSS = `
        .quiz-completion {
            text-align: center;
            padding: 3rem 2rem;
            color: white;
        }
        
        .completion-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            animation: pulse 2s infinite;
        }
        
        .quiz-completion h2 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #ffd700;
        }
        
        .final-score {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .score-number {
            font-size: 3rem;
            font-weight: 700;
            color: ${color};
        }
        
        .score-percentage {
            font-size: 2rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .completion-message {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .loading-certificate {
            margin-top: 2rem;
        }
        
        .loading-spinner {
            font-size: 2rem;
            color: #ffd700;
            margin-bottom: 1rem;
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = completionCSS;
    document.head.appendChild(style);
}

function updateProgress() {
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

function updateQuestionCounter() {
    const habitType = localStorage.getItem('selectedHabitType');
    const questions = window.quizData[habitType];
    const counter = document.getElementById('questionCounter');
    
    if (counter) {
        counter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('currentScore');
    if (scoreDisplay) {
        scoreDisplay.textContent = score;
    }
}

function resetQuestionUI() {
    // Remove any existing feedback
    const existingFeedback = document.querySelector('.question-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Hide action buttons
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
    
    // Reset option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
}

function animateQuizEntrance() {
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.opacity = '0';
        quizContainer.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            quizContainer.style.transition = 'all 0.8s ease';
            quizContainer.style.opacity = '1';
            quizContainer.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Export functions globally
window.nextQuestion = nextQuestion;
window.finishQuiz = finishQuiz;