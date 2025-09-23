// Profile Editor Additional Scripts

// Initialize profile editor when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProfileEditor();
    loadSavedData();
});

function initializeProfileEditor() {
    // Initialize language
    initializeLanguage();
    
    // Set up sidebar navigation
    const sidebarButtons = document.querySelectorAll('.sidebar-nav button');
    const sections = document.querySelectorAll('.editor-section');
    
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Set first section as active by default
    if (sidebarButtons.length > 0) {
        sidebarButtons[0].classList.add('active');
        sections[0].classList.add('active');
    }
}

function loadSavedData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        const data = JSON.parse(savedData);
        populateFormFields(data);
    }
}

function populateFormFields(data) {
    // Helper function to safely set element value
    function safeSetValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value || '';
        }
    }
    
    function safeSetSrc(elementId, src) {
        const element = document.getElementById(elementId);
        if (element && src) {
            element.src = src;
        }
    }
    
    // Personal Information
    if (data.personal) {
        safeSetValue('fullName', data.personal.fullName);
        safeSetValue('jobTitle', data.personal.jobTitle);
        safeSetValue('location', data.personal.location);
        safeSetValue('birthDate', data.personal.birthDate);
        safeSetValue('nationality', data.personal.nationality);
        
        safeSetSrc('profilePicture', data.personal.profilePicture);
    }
    
    // About section
    if (data.about) {
        safeSetValue('aboutText', data.about.text);
        
        // Populate interests
        if (data.about.interests) {
            const interestsContainer = document.getElementById('interestsContainer');
            if (interestsContainer) {
                data.about.interests.forEach(interest => {
                    addInterestTag(interest);
                });
            }
        }
    }
    
    // Contact information
    if (data.contact) {
        safeSetValue('email', data.contact.email);
        safeSetValue('phone', data.contact.phone);
        safeSetValue('website', data.contact.website);
        safeSetValue('linkedin', data.contact.linkedin);
        safeSetValue('github', data.contact.github);
        safeSetValue('twitter', data.contact.twitter);
    }
    
    // Skills
    if (data.skills) {
        data.skills.forEach(skill => {
            if (typeof addSkillToList === 'function') {
                addSkillToList(skill.name, skill.level);
            }
        });
    }
    
    // Theme
    if (data.theme) {
        safeSetValue('primaryColor', data.theme.primaryColor || '#4f46e5');
        safeSetValue('secondaryColor', data.theme.secondaryColor || '#10b981');
        safeSetValue('accentColor', data.theme.accentColor || '#f59e0b');
        safeSetValue('backgroundColor', data.theme.backgroundColor || '#ffffff');
    }
}

function addInterestTag(interest) {
    const container = document.getElementById('interestsContainer');
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `
        <span>${interest}</span>
        <button type="button" onclick="removeInterest(this)">×</button>
    `;
    container.appendChild(tag);
}

function removeInterest(button) {
    button.parentElement.remove();
}

function addSkillToList(skillName, skillLevel) {
    const skillsList = document.querySelector('.skills-list');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <span class="skill-name">${skillName}</span>
        <span class="skill-level ${skillLevel}">${getSkillLevelText(skillLevel)}</span>
        <button type="button" class="remove-skill" onclick="removeSkill(this)">×</button>
    `;
    skillsList.appendChild(skillItem);
}

function getSkillLevelText(level) {
    const levels = {
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'expert': 'خبير'
    };
    return levels[level] || level;
}

function removeSkill(button) {
    button.parentElement.remove();
}

function previewPortfolio() {
    // Save current data
    saveProfileData();
    
    // Open preview in new tab and keep reference
    const currentLang = document.documentElement.lang;
    const previewUrl = currentLang === 'ar' ? 'index-ar.html' : 'index-en.html';
    previewWindow = window.open(previewUrl, '_blank');
}

// Auto-save functionality
let autoSaveTimer;
let previewWindow = null;

function scheduleAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        saveProfileData();
        updatePreviewWindow();
        showSaveNotification('تم الحفظ التلقائي');
    }, 2000);
}

function updatePreviewWindow() {
    // If preview window is open, reload it to show updated data
    if (previewWindow && !previewWindow.closed) {
        previewWindow.location.reload();
    }
}

// Add event listeners for auto-save
document.addEventListener('input', scheduleAutoSave);
document.addEventListener('change', scheduleAutoSave);



// Color picker updates
document.addEventListener('change', function(e) {
    if (e.target.type === 'color') {
        const colorValue = e.target.nextElementSibling;
        if (colorValue && colorValue.classList.contains('color-value')) {
            colorValue.textContent = e.target.value;
        }
        
        // Apply theme preview
        applyThemePreview();
    }
});

function applyThemePreview() {
    const primaryColorEl = document.getElementById('primaryColor');
    const secondaryColorEl = document.getElementById('secondaryColor');
    const accentColorEl = document.getElementById('accentColor');
    const backgroundColorEl = document.getElementById('backgroundColor');
    
    if (primaryColorEl) {
        document.documentElement.style.setProperty('--primary-color', primaryColorEl.value);
    }
    if (secondaryColorEl) {
        document.documentElement.style.setProperty('--secondary-color', secondaryColorEl.value);
    }
    if (accentColorEl) {
        document.documentElement.style.setProperty('--accent-color', accentColorEl.value);
    }
    if (backgroundColorEl) {
        document.documentElement.style.setProperty('--background-color', backgroundColorEl.value);
    }
}

// Initialize color values on page load
document.addEventListener('DOMContentLoaded', function() {
    const colorPickers = document.querySelectorAll('input[type="color"]');
    colorPickers.forEach(picker => {
        const colorValue = picker.nextElementSibling;
        if (colorValue && colorValue.classList.contains('color-value')) {
            colorValue.textContent = picker.value;
        }
    });
    
    applyThemePreview();
});

// Export/Import functionality
function exportProfile() {
    const data = collectProfileData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'portfolio-data.json';
    link.click();
}

function importProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    populateFormFields(data);
                    localStorage.setItem('portfolioData', JSON.stringify(data));
                    showSaveNotification('تم استيراد البيانات بنجاح');
                } catch (error) {
                    alert('خطأ في قراءة الملف');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Collect all profile data from forms
function collectProfileData() {
    return {
        personal: {
            fullName: document.getElementById('fullName')?.value || '',
            jobTitle: document.getElementById('jobTitle')?.value || '',
            location: document.getElementById('location')?.value || '',
            birthDate: document.getElementById('birthDate')?.value || '',
            nationality: document.getElementById('nationality')?.value || '',
            profilePicture: document.getElementById('profilePicture')?.src || ''
        },
        about: {
            text: document.getElementById('aboutText')?.value || '',
            interests: Array.from(document.querySelectorAll('#interestsContainer .tag span')).map(span => span.textContent)
        },
        skills: Array.from(document.querySelectorAll('.skill-item')).map(item => ({
            name: item.querySelector('.skill-name')?.textContent || '',
            level: item.querySelector('.skill-level')?.className.split(' ')[1] || 'beginner'
        })),
        experience: Array.from(document.querySelectorAll('.experience-item')).map(item => ({
            title: item.querySelector('input[placeholder*="المسمى"]')?.value || '',
            company: item.querySelector('input[placeholder*="الشركة"]')?.value || '',
            startDate: item.querySelector('input[type="date"]')?.value || '',
            endDate: item.querySelectorAll('input[type="date"]')[1]?.value || '',
            description: item.querySelector('textarea')?.value || ''
        })),
        education: Array.from(document.querySelectorAll('.education-item')).map(item => ({
            degree: item.querySelector('input[placeholder*="الدرجة"]')?.value || '',
            institution: item.querySelector('input[placeholder*="المؤسسة"]')?.value || '',
            year: item.querySelector('input[type="number"]')?.value || '',
            description: item.querySelector('textarea')?.value || ''
        })),
        contact: {
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            website: document.getElementById('website')?.value || '',
            linkedin: document.getElementById('linkedin')?.value || '',
            github: document.getElementById('github')?.value || '',
            twitter: document.getElementById('twitter')?.value || ''
        },
        theme: {
            primaryColor: document.getElementById('primaryColor')?.value || '#007bff',
            secondaryColor: document.getElementById('secondaryColor')?.value || '#6c757d',
            style: document.querySelector('.theme-option.active')?.dataset.theme || 'modern'
        }
    };
}

// Save profile data to localStorage
function saveProfileData() {
    const profileData = collectProfileData();
    localStorage.setItem('portfolioData', JSON.stringify(profileData));
    return profileData;
}

// Reset profile data
function resetProfile() {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟')) {
        localStorage.removeItem('portfolioData');
        location.reload();
    }
}

// Switch between sections
function switchSection(sectionName) {
    // Remove active class from all menu items and sections
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.editor-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Add active class to selected menu item and section
    const menuItem = document.querySelector(`[data-section="${sectionName}"]`);
    const section = document.getElementById(`${sectionName}-section`) || document.getElementById(sectionName);
    
    if (menuItem) menuItem.classList.add('active');
    if (section) section.classList.add('active');
}

// Save profile function
function saveProfile() {
    showLoading();
    
    const profileData = collectProfileData();
    
    // Simulate save operation
    setTimeout(() => {
        localStorage.setItem('portfolioData', JSON.stringify(profileData));
        hideLoading();
        showSaveNotification('تم حفظ البيانات بنجاح');
    }, 1500);
}



// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Show save notification
function showSaveNotification(message) {
    const toast = document.getElementById('successToast');
    if (toast) {
        const messageElement = toast.querySelector('.toast-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
}

// Language toggle functionality
function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // Update document language and direction
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        if (newLang === 'ar') {
            element.textContent = element.getAttribute('data-ar');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]').forEach(element => {
        if (newLang === 'ar') {
            element.placeholder = element.getAttribute('data-placeholder-ar');
        } else {
            element.placeholder = element.getAttribute('data-placeholder-en');
        }
    });
    
    // Update select options
    document.querySelectorAll('option[data-ar][data-en]').forEach(option => {
        if (newLang === 'ar') {
            option.textContent = option.getAttribute('data-ar');
        } else {
            option.textContent = option.getAttribute('data-en');
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title[data-ar][data-en]');
    if (titleElement) {
        if (newLang === 'ar') {
            titleElement.textContent = titleElement.getAttribute('data-ar');
        } else {
            titleElement.textContent = titleElement.getAttribute('data-en');
        }
    }
    
    // Update language toggle button
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        if (newLang === 'ar') {
            langToggle.textContent = langToggle.getAttribute('data-ar');
        } else {
            langToggle.textContent = langToggle.getAttribute('data-en');
        }
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', newLang);
    
    // Update CSS classes for styling
    document.body.className = document.body.className.replace(/lang-\w+/, `lang-${newLang}`);
}

// Initialize language on page load
function initializeLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
    if (document.documentElement.lang !== savedLang) {
        toggleLanguage();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
});