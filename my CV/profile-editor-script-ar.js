// Profile Editor Arabic Scripts

// Initialize profile editor when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProfileEditor();
    loadSavedData();
});

function initializeProfileEditor() {
    // Set up sidebar navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.editor-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionName) {
    // Remove active class from all menu items and sections
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.editor-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked menu item and target section
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    document.getElementById(`${sectionName}-section`).classList.add('active');
}

function loadSavedData() {
    const savedData = localStorage.getItem('portfolioData_ar');
    if (savedData) {
        const data = JSON.parse(savedData);
        populateFormFields(data);
    }
}

function populateFormFields(data) {
    // Helper function to safely set element value
    function safeSetValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element && value) {
            element.value = value;
        }
    }
    
    // Populate personal information
    safeSetValue('fullName', data.fullName);
    safeSetValue('jobTitle', data.jobTitle);
    safeSetValue('location', data.location);
    safeSetValue('nationality', data.nationality);
    
    // Populate about section
    safeSetValue('aboutText', data.aboutText);
    safeSetValue('interests', data.interests);
    
    // Populate skills
    if (data.skills && Array.isArray(data.skills)) {
        data.skills.forEach(skill => {
            addSkillToList(skill.name, skill.level);
        });
    }
}

function saveProfile() {
    const profileData = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        location: document.getElementById('location').value,
        nationality: document.getElementById('nationality').value,
        aboutText: document.getElementById('aboutText').value,
        interests: document.getElementById('interests').value,
        skills: getSkillsList(),
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('portfolioData_ar', JSON.stringify(profileData));
    
    // Show success message
    showNotification('تم حفظ الملف الشخصي بنجاح!', 'success');
}

function getSkillsList() {
    const skills = [];
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const name = item.querySelector('.skill-info h4').textContent;
        const level = item.querySelector('.skill-level').textContent;
        skills.push({ name, level });
    });
    
    return skills;
}

function addSkill() {
    const skillName = document.getElementById('skillName').value.trim();
    const skillLevel = document.getElementById('skillLevel').value;
    
    if (!skillName) {
        showNotification('يرجى إدخال اسم المهارة', 'error');
        return;
    }
    
    // Check if skill already exists
    const existingSkills = document.querySelectorAll('.skill-item .skill-info h4');
    for (let skill of existingSkills) {
        if (skill.textContent.toLowerCase() === skillName.toLowerCase()) {
            showNotification('هذه المهارة موجودة بالفعل', 'error');
            return;
        }
    }
    
    addSkillToList(skillName, skillLevel);
    
    // Clear input fields
    document.getElementById('skillName').value = '';
    document.getElementById('skillLevel').value = 'beginner';
    
    showNotification('تم إضافة المهارة بنجاح', 'success');
}

function addSkillToList(name, level) {
    const skillsList = document.getElementById('skillsList');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    const levelText = {
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'expert': 'خبير'
    };
    
    skillItem.innerHTML = `
        <div class="skill-info">
            <h4>${name}</h4>
            <span class="skill-level ${level}">${levelText[level] || level}</span>
        </div>
        <button class="remove-skill" onclick="removeSkill(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    skillsList.appendChild(skillItem);
}

function removeSkill(button) {
    const skillItem = button.closest('.skill-item');
    const skillName = skillItem.querySelector('.skill-info h4').textContent;
    
    if (confirm(`هل أنت متأكد من حذف مهارة "${skillName}"؟`)) {
        skillItem.remove();
        showNotification('تم حذف المهارة بنجاح', 'success');
    }
}

function previewPortfolio() {
    const profileData = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        location: document.getElementById('location').value,
        nationality: document.getElementById('nationality').value,
        aboutText: document.getElementById('aboutText').value,
        interests: document.getElementById('interests').value,
        skills: getSkillsList()
    };
    
    // Store data temporarily for preview
    localStorage.setItem('previewData_ar', JSON.stringify(profileData));
    
    // Open preview in new tab
    window.open('index-ar.html', '_blank');
}

function exportProfile() {
    const profileData = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        location: document.getElementById('location').value,
        nationality: document.getElementById('nationality').value,
        aboutText: document.getElementById('aboutText').value,
        interests: document.getElementById('interests').value,
        skills: getSkillsList(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'portfolio-data-ar.json';
    link.click();
    
    showNotification('تم تصدير الملف الشخصي بنجاح', 'success');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
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

// Auto-save functionality
setInterval(() => {
    const fullName = document.getElementById('fullName').value;
    if (fullName.trim()) {
        saveProfile();
    }
}, 30000); // Auto-save every 30 seconds