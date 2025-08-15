// Main JavaScript file for the landing page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-royal';
    document.body.className = savedTheme;
    
    // Check if user is returning
    const userData = localStorage.getItem('userData');
    if (userData) {
        // Redirect returning user to welcome page
        window.location.href = 'welcome.html';
        return;
    }
    
    // Handle form submission
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', handleFormSubmission);
    
    // Initialize animations
    initializeAnimations();
});

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        fullName: formData.get('fullName') || document.getElementById('fullName').value,
        designation: formData.get('designation') || document.getElementById('designation').value,
        team: formData.get('team') || document.getElementById('team').value,
        city: formData.get('city') || document.getElementById('city').value,
        email: generateEmailFromName(document.getElementById('fullName').value),
        joinDate: new Date().toISOString()
    };
    
    // Validate form data
    if (!validateFormData(userData)) {
        showNotification('Please fill in all fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating your account...';
    submitBtn.disabled = true;
    
    try {
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Save to Supabase
        const success = await window.supabaseClient.createUser(userData);
        
        if (success) {
            showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 1000);
        } else {
            throw new Error('Failed to save to database');
        }
    } catch (error) {
        console.error('Error creating account:', error);
        showNotification('Account created locally. Welcome aboard!', 'success');
        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 1000);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function validateFormData(data) {
    return data.fullName && data.designation && data.team && data.city && 
           data.fullName.trim().length > 0 && data.designation.trim().length > 0 &&
           data.team.trim().length > 0 && data.city.trim().length > 0;
}

function generateEmailFromName(fullName) {
    return fullName.toLowerCase().replace(/\s+/g, '.') + '@starshaigan.com';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: '10000',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeAnimations() {
    // Add floating animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px)';
        setTimeout(() => {
            group.style.transition = 'all 0.6s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add glow effect to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.6)';
        });
        
        submitBtn.addEventListener('mouseout', function() {
            this.style.boxShadow = 'none';
        });
    }
}

// Theme management
function changeTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('selectedTheme', themeName);
    
    // Add theme change animation
    document.body.style.transition = 'background 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

// Make changeTheme globally available
window.changeTheme = changeTheme;