// Certificate page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCertificatePage();
});

function initializeCertificatePage() {
    // Force dark theme for certificate
    document.body.className = 'certificate-page';
    
    // Get user data and quiz results
    const userData = JSON.parse(localStorage.getItem('userData'));
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));
    const selectedHabit = JSON.parse(localStorage.getItem('selectedHabit'));
    const habitType = localStorage.getItem('selectedHabitType');
    
    if (!userData || !quizResults || !selectedHabit) {
        window.location.href = 'welcome.html';
        return;
    }
    
    // Populate certificate data
    populateCertificate(userData, quizResults, selectedHabit, habitType);
    
    // Start celebration animation
    setTimeout(() => {
        window.animationManager.initializePageAnimations('certificate');
    }, 500);
    
    // Add entrance animation
    animateCertificateEntrance();
}

function populateCertificate(userData, quizResults, selectedHabit, habitType) {
    // Update recipient name
    const recipientName = document.getElementById('recipientName');
    if (recipientName) {
        recipientName.textContent = userData.fullName;
    }
    
    // Update course title
    const courseTitle = document.getElementById('courseTitle');
    const actionWord = habitType === 'good' ? 'Building' : 'Breaking';
    if (courseTitle) {
        courseTitle.textContent = `${actionWord} the Habit: "${selectedHabit.title}"`;
    }
    
    // Update course details
    const courseDetails = document.getElementById('courseDetails');
    if (courseDetails) {
        courseDetails.innerHTML = `
            Demonstrating exceptional understanding of the four stages of atomic habits 
            and achieving a score of <span id="finalScore">${quizResults.percentage}%</span> 
            on the comprehensive assessment.
        `;
    }
    
    // Update date
    const certDate = document.getElementById('certDate');
    if (certDate) {
        const now = new Date();
        certDate.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Update certificate ID
    const certId = document.getElementById('certId');
    if (certId) {
        const timestamp = Date.now().toString().slice(-6);
        certId.textContent = `STAR-${new Date().getFullYear()}-${timestamp}`;
    }
    
    // Store certificate data for download
    const certificateData = {
        recipientName: userData.fullName,
        courseTitle: `${actionWord} the Habit: "${selectedHabit.title}"`,
        score: quizResults.percentage,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        }),
        certificateId: `STAR-${new Date().getFullYear()}-${timestamp}`,
        designation: userData.designation,
        team: userData.team,
        city: userData.city
    };
    
    localStorage.setItem('certificateData', JSON.stringify(certificateData));
}

function downloadCertificate() {
    const certificateData = JSON.parse(localStorage.getItem('certificateData'));
    if (!certificateData) return;
    
    // Show loading state
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    // Create PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });
    
    // Set background color (dark theme)
    doc.setFillColor(45, 55, 72);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Add border
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    
    // Add inner border
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);
    
    // Add logo and header
    doc.setTextColor(255, 215, 0);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('⭐ STAR-Shaigan Learning Portal', 148.5, 35, null, null, 'center');
    
    // Add certificate title
    doc.setFontSize(36);
    doc.setTextColor(255, 215, 0);
    doc.text('Certificate of Achievement', 148.5, 60, null, null, 'center');
    
    // Add decorative line
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(2);
    doc.line(100, 70, 197, 70);
    
    // Add main text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont(undefined, 'normal');
    doc.text('This is to certify that', 148.5, 85, null, null, 'center');
    
    // Add recipient name
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(certificateData.recipientName, 148.5, 105, null, null, 'center');
    
    // Add achievement text
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text('has successfully completed the comprehensive course on', 148.5, 120, null, null, 'center');
    
    // Add course title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(16, 185, 129);
    // Wrap long text
    const courseTitle = certificateData.courseTitle;
    const splitTitle = doc.splitTextToSize(courseTitle, 200);
    doc.text(splitTitle, 148.5, 135, null, null, 'center');
    
    // Add score
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'normal');
    doc.text(`Achieving a score of ${certificateData.score}%`, 148.5, 155, null, null, 'center');
    
    // Add date and certificate ID
    doc.setFontSize(12);
    doc.text(`Date: ${certificateData.date}`, 50, 180);
    doc.text(`Certificate ID: ${certificateData.certificateId}`, 50, 190);
    
    // Add signature
    doc.setFont(undefined, 'bold');
    doc.text('Zubair Ahmad', 220, 170);
    doc.setFont(undefined, 'normal');
    doc.text('Senior SFE Manager', 220, 180);
    doc.text('STAR-Shaigan Learning Portal', 220, 190);
    
    // Add signature line
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(200, 165, 270, 165);
    
    // Save the PDF
    const fileName = `${certificateData.recipientName.replace(/\s+/g, '_')}_Atomic_Habits_Certificate.pdf`;
    doc.save(fileName);
    
    // Reset button
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // Show success message
        showNotification('Certificate downloaded successfully!', 'success');
    }, 2000);
}

function startAgain() {
    // Clear stored data
    localStorage.removeItem('selectedHabitType');
    localStorage.removeItem('selectedHabit');
    localStorage.removeItem('stageProgress');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('certificateData');
    
    // Add exit animation
    const container = document.querySelector('.certificate-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 500);
    } else {
        window.location.href = 'welcome.html';
    }
}

function shareResults() {
    const certificateData = JSON.parse(localStorage.getItem('certificateData'));
    if (!certificateData) return;
    
    const shareText = `🎉 I just completed the Atomic Habits course on "${certificateData.courseTitle}" with a score of ${certificateData.score}% at STAR-Shaigan Learning Portal! 🌟\n\n#AtomicHabits #PersonalDevelopment #LifeTransformation`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Atomic Habits Achievement',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showNotification('Shared successfully!', 'success');
        }).catch((error) => {
            console.error('Error sharing:', error);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Achievement text copied to clipboard!', 'success');
    }).catch(() => {
        // Manual copy fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Achievement text copied to clipboard!', 'success');
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function animateCertificateEntrance() {
    const certificate = document.querySelector('.certificate');
    if (certificate) {
        certificate.style.opacity = '0';
        certificate.style.transform = 'scale(0.8) translateY(50px)';
        
        setTimeout(() => {
            certificate.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            certificate.style.opacity = '1';
            certificate.style.transform = 'scale(1) translateY(0)';
        }, 300);
    }
    
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
        actionButtons.style.opacity = '0';
        actionButtons.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            actionButtons.style.transition = 'all 0.8s ease';
            actionButtons.style.opacity = '1';
            actionButtons.style.transform = 'translateY(0)';
        }, 1000);
    }
}

// Export functions globally
window.downloadCertificate = downloadCertificate;
window.startAgain = startAgain;
window.shareResults = shareResults;