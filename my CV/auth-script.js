// Authentication & Profile Management System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.currentLanguage = this.detectLanguage();
        this.translations = this.loadTranslations();
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupFormValidation();
        this.setupPasswordToggle();
        this.setupSocialLogin();
        this.setupProfileEditor();
        this.loadUserData();
        this.updateLanguage();
    }

    // Language Management
    detectLanguage() {
        const saved = localStorage.getItem('preferred-language');
        if (saved) return saved;
        
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ar') ? 'ar' : 'en';
    }

    loadTranslations() {
        return {
            ar: {
                // Login Page
                'welcome-back': 'مرحباً بعودتك',
                'login-subtitle': 'سجل دخولك للوصول إلى حسابك',
                'email': 'البريد الإلكتروني',
                'password': 'كلمة المرور',
                'remember-me': 'تذكرني',
                'forgot-password': 'نسيت كلمة المرور؟',
                'login': 'تسجيل الدخول',
                'or': 'أو',
                'google-login': 'تسجيل الدخول بجوجل',
                'github-login': 'تسجيل الدخول بجيت هب',
                'no-account': 'ليس لديك حساب؟',
                'register-link': 'إنشاء حساب جديد',
                
                // Register Page
                'create-account': 'إنشاء حساب جديد',
                'register-subtitle': 'انضم إلينا وابدأ رحلتك المهنية',
                'first-name': 'الاسم الأول',
                'last-name': 'الاسم الأخير',
                'confirm-password': 'تأكيد كلمة المرور',
                'agree-terms': 'أوافق على الشروط والأحكام',
                'register': 'إنشاء الحساب',
                'google-register': 'التسجيل بجوجل',
                'github-register': 'التسجيل بجيت هب',
                'have-account': 'لديك حساب بالفعل؟',
                'login-link': 'تسجيل الدخول',
                
                // Profile Editor
                'profile-editor': 'محرر الملف الشخصي',
                'edit-subtitle': 'قم بتخصيص ملفك الشخصي ليعكس شخصيتك المهنية',
                'personal-info': 'المعلومات الشخصية',
                'skills': 'المهارات',
                'experience': 'الخبرة',
                'education': 'التعليم',
                'projects': 'المشاريع',
                'customization': 'التخصيص',
                'preview': 'معاينة',
                'save': 'حفظ',
                'profile-picture': 'الصورة الشخصية',
                'upload-picture': 'رفع صورة',
                'change-picture': 'تغيير الصورة',
                'full-name': 'الاسم الكامل',
                'title': 'المسمى الوظيفي',
                'phone': 'رقم الهاتف',
                'location': 'الموقع',
                'website': 'الموقع الإلكتروني',
                'bio': 'نبذة شخصية',
                'interests': 'الاهتمامات',
                
                // Validation Messages
                'required-field': 'هذا الحقل مطلوب',
                'invalid-email': 'البريد الإلكتروني غير صحيح',
                'password-too-short': 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
                'passwords-not-match': 'كلمات المرور غير متطابقة',
                'weak-password': 'ضعيفة',
                'medium-password': 'متوسطة',
                'strong-password': 'قوية',
                'very-strong-password': 'قوية جداً',
                
                // Success Messages
                'login-success': 'تم تسجيل الدخول بنجاح!',
                'register-success': 'تم إنشاء الحساب بنجاح!',
                'profile-saved': 'تم حفظ الملف الشخصي بنجاح!',
                'redirecting': 'جاري التوجيه...',
                
                // Skills
                'add-skill': 'إضافة مهارة',
                'skill-name': 'اسم المهارة',
                'skill-level': 'المستوى',
                'beginner': 'مبتدئ',
                'intermediate': 'متوسط',
                'advanced': 'متقدم',
                'expert': 'خبير',
                
                // Experience
                'add-experience': 'إضافة خبرة',
                'job-title': 'المسمى الوظيفي',
                'company': 'الشركة',
                'start-date': 'تاريخ البداية',
                'end-date': 'تاريخ النهاية',
                'current-job': 'أعمل حالياً',
                'description': 'الوصف',
                
                // Education
                'add-education': 'إضافة تعليم',
                'degree': 'الدرجة العلمية',
                'institution': 'المؤسسة التعليمية',
                'graduation-year': 'سنة التخرج',
                
                // Projects
                'add-project': 'إضافة مشروع',
                'project-name': 'اسم المشروع',
                'project-url': 'رابط المشروع',
                'technologies': 'التقنيات المستخدمة',
                
                // Theme
                'primary-color': 'اللون الأساسي',
                'theme-style': 'نمط التصميم',
                'modern': 'عصري',
                'classic': 'كلاسيكي',
                'minimal': 'بسيط'
            },
            en: {
                // Login Page
                'welcome-back': 'Welcome Back',
                'login-subtitle': 'Sign in to access your account',
                'email': 'Email',
                'password': 'Password',
                'remember-me': 'Remember me',
                'forgot-password': 'Forgot password?',
                'login': 'Sign In',
                'or': 'Or',
                'google-login': 'Sign in with Google',
                'github-login': 'Sign in with GitHub',
                'no-account': "Don't have an account?",
                'register-link': 'Create account',
                
                // Register Page
                'create-account': 'Create Account',
                'register-subtitle': 'Join us and start your professional journey',
                'first-name': 'First Name',
                'last-name': 'Last Name',
                'confirm-password': 'Confirm Password',
                'agree-terms': 'I agree to the Terms and Conditions',
                'register': 'Create Account',
                'google-register': 'Sign up with Google',
                'github-register': 'Sign up with GitHub',
                'have-account': 'Already have an account?',
                'login-link': 'Sign in',
                
                // Profile Editor
                'profile-editor': 'Profile Editor',
                'edit-subtitle': 'Customize your profile to reflect your professional identity',
                'personal-info': 'Personal Information',
                'skills': 'Skills',
                'experience': 'Experience',
                'education': 'Education',
                'projects': 'Projects',
                'customization': 'Customization',
                'preview': 'Preview',
                'save': 'Save',
                'profile-picture': 'Profile Picture',
                'upload-picture': 'Upload Picture',
                'change-picture': 'Change Picture',
                'full-name': 'Full Name',
                'title': 'Job Title',
                'phone': 'Phone Number',
                'location': 'Location',
                'website': 'Website',
                'bio': 'Bio',
                'interests': 'Interests',
                
                // Validation Messages
                'required-field': 'This field is required',
                'invalid-email': 'Invalid email address',
                'password-too-short': 'Password must be at least 8 characters',
                'passwords-not-match': 'Passwords do not match',
                'weak-password': 'Weak',
                'medium-password': 'Medium',
                'strong-password': 'Strong',
                'very-strong-password': 'Very Strong',
                
                // Success Messages
                'login-success': 'Login successful!',
                'register-success': 'Account created successfully!',
                'profile-saved': 'Profile saved successfully!',
                'redirecting': 'Redirecting...',
                
                // Skills
                'add-skill': 'Add Skill',
                'skill-name': 'Skill Name',
                'skill-level': 'Level',
                'beginner': 'Beginner',
                'intermediate': 'Intermediate',
                'advanced': 'Advanced',
                'expert': 'Expert',
                
                // Experience
                'add-experience': 'Add Experience',
                'job-title': 'Job Title',
                'company': 'Company',
                'start-date': 'Start Date',
                'end-date': 'End Date',
                'current-job': 'Currently working',
                'description': 'Description',
                
                // Education
                'add-education': 'Add Education',
                'degree': 'Degree',
                'institution': 'Institution',
                'graduation-year': 'Graduation Year',
                
                // Projects
                'add-project': 'Add Project',
                'project-name': 'Project Name',
                'project-url': 'Project URL',
                'technologies': 'Technologies Used',
                
                // Theme
                'primary-color': 'Primary Color',
                'theme-style': 'Theme Style',
                'modern': 'Modern',
                'classic': 'Classic',
                'minimal': 'Minimal'
            }
        };
    }

    setupLanguageToggle() {
        const toggleBtn = document.getElementById('languageToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
                localStorage.setItem('preferred-language', this.currentLanguage);
                this.updateLanguage();
            });
        }
    }

    updateLanguage() {
        document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
        
        // Update language toggle button
        const toggleBtn = document.getElementById('languageToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = `<i class="fas fa-globe"></i> ${this.currentLanguage === 'ar' ? 'English' : 'العربية'}`;
        }
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage][key];
            if (translation) {
                if (element.tagName === 'INPUT' && element.type !== 'submit') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update elements with data-ar and data-en attributes
        document.querySelectorAll('[data-ar][data-en]').forEach(element => {
            const text = this.currentLanguage === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            if (text) {
                if (element.tagName === 'INPUT' && element.type !== 'submit') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        localStorage.setItem('preferred-language', this.currentLanguage);
        this.updateLanguage();
        
        // Update language toggle button text
        const langText = document.getElementById('lang-text');
        if (langText) {
            langText.textContent = this.currentLanguage === 'ar' ? 'English' : 'العربية';
        }
    }

    // Form Validation
    setupFormValidation() {
        // Email validation
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', () => this.validateEmail(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });

        // Password validation
        document.querySelectorAll('input[type="password"]').forEach(input => {
            if (input.id === 'password' || input.id === 'registerPassword') {
                input.addEventListener('input', () => this.validatePassword(input));
            }
            if (input.id === 'confirmPassword') {
                input.addEventListener('input', () => this.validatePasswordMatch(input));
            }
        });

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showFieldError(input, 'required-field');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showFieldError(input, 'invalid-email');
            return false;
        }
        
        this.showFieldSuccess(input);
        return true;
    }

    validatePassword(input) {
        const password = input.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (!password) {
            this.showFieldError(input, 'required-field');
            if (strengthIndicator) strengthIndicator.style.display = 'none';
            return false;
        }
        
        if (password.length < 8) {
            this.showFieldError(input, 'password-too-short');
            if (strengthIndicator) strengthIndicator.style.display = 'none';
            return false;
        }
        
        // Password strength calculation
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strengthIndicator) {
            strengthIndicator.style.display = 'block';
            const strengthBar = strengthIndicator.querySelector('.strength-fill');
            const strengthText = strengthIndicator.querySelector('.strength-text');
            
            const strengthLevels = ['weak-password', 'weak-password', 'medium-password', 'strong-password', 'very-strong-password'];
            const strengthColors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];
            const strengthWidths = ['20%', '40%', '60%', '80%', '100%'];
            
            const level = Math.min(strength, 4);
            strengthBar.style.width = strengthWidths[level];
            strengthBar.style.backgroundColor = strengthColors[level];
            strengthText.textContent = this.translations[this.currentLanguage][strengthLevels[level]];
        }
        
        this.showFieldSuccess(input);
        return true;
    }

    validatePasswordMatch(input) {
        const password = document.getElementById('registerPassword')?.value;
        const confirmPassword = input.value;
        
        if (!confirmPassword) {
            this.showFieldError(input, 'required-field');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showFieldError(input, 'passwords-not-match');
            return false;
        }
        
        this.showFieldSuccess(input);
        return true;
    }

    showFieldError(input, messageKey) {
        this.clearValidation(input);
        input.classList.add('error');
        
        const message = document.createElement('div');
        message.className = 'field-message error';
        message.textContent = this.translations[this.currentLanguage][messageKey];
        
        const validationIcon = document.createElement('i');
        validationIcon.className = 'fas fa-times-circle validation-icon';
        validationIcon.style.color = '#ef4444';
        
        input.parentNode.appendChild(validationIcon);
        input.parentNode.parentNode.appendChild(message);
    }

    showFieldSuccess(input) {
        this.clearValidation(input);
        input.classList.add('success');
        
        const validationIcon = document.createElement('i');
        validationIcon.className = 'fas fa-check-circle validation-icon';
        validationIcon.style.color = '#10b981';
        
        input.parentNode.appendChild(validationIcon);
    }

    clearValidation(input) {
        input.classList.remove('error', 'success');
        
        // Remove existing validation elements
        const existingIcon = input.parentNode.querySelector('.validation-icon');
        if (existingIcon) existingIcon.remove();
        
        const existingMessage = input.parentNode.parentNode.querySelector('.field-message');
        if (existingMessage) existingMessage.remove();
    }

    // Password Toggle
    setupPasswordToggle() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const input = toggle.parentNode.querySelector('input');
                const icon = toggle.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    // Social Login
    setupSocialLogin() {
        document.querySelectorAll('.google-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleGoogleAuth());
        });

        document.querySelectorAll('.github-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleGithubAuth());
        });
    }

    handleGoogleAuth() {
        this.showLoading('Connecting to Google...');
        // Simulate Google OAuth
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess('login-success');
            setTimeout(() => {
                window.location.href = 'profile-editor.html';
            }, 2000);
        }, 2000);
    }

    handleGithubAuth() {
        this.showLoading('Connecting to GitHub...');
        // Simulate GitHub OAuth
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess('login-success');
            setTimeout(() => {
                window.location.href = 'profile-editor.html';
            }, 2000);
        }, 2000);
    }

    // Form Handlers
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!this.validateEmail(document.getElementById('email')) || 
            !this.validatePassword(document.getElementById('password'))) {
            return;
        }
        
        this.showLoading();
        
        // Simulate login API call
        setTimeout(() => {
            this.hideLoading();
            
            // Store user data
            const userData = {
                email: email,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            this.showSuccess('login-success');
            
            setTimeout(() => {
                window.location.href = 'profile-editor.html';
            }, 2000);
        }, 2000);
    }

    handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validate all fields
        let isValid = true;
        
        if (!firstName.trim()) {
            this.showFieldError(document.getElementById('firstName'), 'required-field');
            isValid = false;
        }
        
        if (!lastName.trim()) {
            this.showFieldError(document.getElementById('lastName'), 'required-field');
            isValid = false;
        }
        
        if (!this.validateEmail(document.getElementById('registerEmail'))) {
            isValid = false;
        }
        
        if (!this.validatePassword(document.getElementById('registerPassword'))) {
            isValid = false;
        }
        
        if (!this.validatePasswordMatch(document.getElementById('confirmPassword'))) {
            isValid = false;
        }
        
        if (!agreeTerms) {
            alert(this.translations[this.currentLanguage]['agree-terms']);
            isValid = false;
        }
        
        if (!isValid) return;
        
        this.showLoading();
        
        // Simulate registration API call
        setTimeout(() => {
            this.hideLoading();
            
            // Store user data
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                registrationTime: new Date().toISOString()
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            this.showSuccess('register-success');
            
            setTimeout(() => {
                window.location.href = 'profile-editor.html';
            }, 2000);
        }, 2000);
    }

    // Profile Editor
    setupProfileEditor() {
        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.getAttribute('data-section');
                this.showSection(targetSection);
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Profile picture upload
        const profilePictureInput = document.getElementById('profilePictureInput');
        const picturePreview = document.querySelector('.picture-preview');
        
        if (profilePictureInput && picturePreview) {
            picturePreview.addEventListener('click', () => profilePictureInput.click());
            profilePictureInput.addEventListener('change', (e) => this.handleProfilePictureUpload(e));
        }

        // Skills management
        this.setupSkillsManager();
        
        // Experience management
        this.setupExperienceManager();
        
        // Education management
        this.setupEducationManager();
        
        // Projects management
        this.setupProjectsManager();
        
        // Theme customization
        this.setupThemeCustomization();
        
        // Save functionality
        const saveBtn = document.getElementById('saveProfile');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProfile());
        }
        
        // Preview functionality
        const previewBtn = document.getElementById('previewProfile');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.previewProfile());
        }

        // Character counters
        this.setupCharacterCounters();
        
        // Interest tags
        this.setupInterestTags();
    }

    showSection(sectionId) {
        document.querySelectorAll('.editor-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    handleProfilePictureUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.querySelector('.picture-preview img');
                if (img) {
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    setupSkillsManager() {
        const addSkillBtn = document.getElementById('addSkillBtn');
        if (addSkillBtn) {
            addSkillBtn.addEventListener('click', () => this.addSkill());
        }
    }

    addSkill() {
        const skillName = document.getElementById('skillName').value.trim();
        const skillLevel = document.getElementById('skillLevel').value;
        
        if (!skillName) return;
        
        const skillsList = document.getElementById('skillsList');
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-content">
                <div class="skill-info">
                    <span class="skill-name">${skillName}</span>
                    <span class="skill-level ${skillLevel}">${this.translations[this.currentLanguage][skillLevel]}</span>
                </div>
                <div class="skill-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${skillLevel}"></div>
                    </div>
                </div>
            </div>
            <button class="remove-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        skillsList.appendChild(skillItem);
        
        // Clear form
        document.getElementById('skillName').value = '';
        document.getElementById('skillLevel').value = 'beginner';
    }

    setupExperienceManager() {
        const addExperienceBtn = document.getElementById('addExperienceBtn');
        if (addExperienceBtn) {
            addExperienceBtn.addEventListener('click', () => this.addExperience());
        }
    }

    addExperience() {
        const experienceList = document.getElementById('experienceList');
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <div class="item-header">
                <h4>New Experience</h4>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label data-translate="job-title">Job Title</label>
                    <input type="text" placeholder="Software Developer">
                </div>
                <div class="form-group">
                    <label data-translate="company">Company</label>
                    <input type="text" placeholder="Tech Company">
                </div>
                <div class="form-group">
                    <label data-translate="start-date">Start Date</label>
                    <input type="month">
                </div>
                <div class="form-group">
                    <label data-translate="end-date">End Date</label>
                    <input type="month">
                    <div class="checkbox-container">
                        <input type="checkbox" id="currentJob${Date.now()}">
                        <span class="checkmark"></span>
                        <span data-translate="current-job">Currently working</span>
                    </div>
                </div>
                <div class="form-group full-width">
                    <label data-translate="description">Description</label>
                    <textarea rows="4" placeholder="Describe your role and achievements..."></textarea>
                </div>
            </div>
        `;
        
        experienceList.appendChild(experienceItem);
        this.updateLanguage(); // Update translations for new elements
    }

    setupEducationManager() {
        const addEducationBtn = document.getElementById('addEducationBtn');
        if (addEducationBtn) {
            addEducationBtn.addEventListener('click', () => this.addEducation());
        }
    }

    addEducation() {
        const educationList = document.getElementById('educationList');
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <div class="item-header">
                <h4>New Education</h4>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label data-translate="degree">Degree</label>
                    <input type="text" placeholder="Bachelor of Science">
                </div>
                <div class="form-group">
                    <label data-translate="institution">Institution</label>
                    <input type="text" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label data-translate="graduation-year">Graduation Year</label>
                    <input type="number" min="1950" max="2030" placeholder="2023">
                </div>
                <div class="form-group full-width">
                    <label data-translate="description">Description</label>
                    <textarea rows="3" placeholder="Additional details about your education..."></textarea>
                </div>
            </div>
        `;
        
        educationList.appendChild(educationItem);
        this.updateLanguage();
    }

    setupProjectsManager() {
        const addProjectBtn = document.getElementById('addProjectBtn');
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', () => this.addProject());
        }
    }

    addProject() {
        const projectsList = document.getElementById('projectsList');
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="item-header">
                <h4>New Project</h4>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label data-translate="project-name">Project Name</label>
                    <input type="text" placeholder="My Awesome Project">
                </div>
                <div class="form-group">
                    <label data-translate="project-url">Project URL</label>
                    <input type="url" placeholder="https://github.com/username/project">
                </div>
                <div class="form-group full-width">
                    <label data-translate="technologies">Technologies Used</label>
                    <input type="text" placeholder="React, Node.js, MongoDB">
                </div>
                <div class="form-group full-width">
                    <label data-translate="description">Description</label>
                    <textarea rows="4" placeholder="Describe your project and its features..."></textarea>
                </div>
            </div>
        `;
        
        projectsList.appendChild(projectItem);
        this.updateLanguage();
    }

    setupThemeCustomization() {
        const primaryColorInput = document.getElementById('primaryColor');
        if (primaryColorInput) {
            primaryColorInput.addEventListener('change', (e) => {
                document.documentElement.style.setProperty('--primary-color', e.target.value);
                document.getElementById('colorValue').textContent = e.target.value;
            });
        }

        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                const theme = option.getAttribute('data-theme');
                document.body.className = `theme-${theme}`;
            });
        });
    }

    setupCharacterCounters() {
        document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            const counter = document.createElement('div');
            counter.className = 'character-count';
            counter.textContent = `0 / ${maxLength}`;
            
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', () => {
                const currentLength = textarea.value.length;
                counter.textContent = `${currentLength} / ${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#ef4444';
                } else if (currentLength > maxLength * 0.7) {
                    counter.style.color = '#f59e0b';
                } else {
                    counter.style.color = '#9ca3af';
                }
            });
        });
    }

    setupInterestTags() {
        const interestInput = document.getElementById('interestInput');
        const tagsContainer = document.querySelector('.tags-container');
        
        if (interestInput && tagsContainer) {
            interestInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const value = interestInput.value.trim();
                    if (value) {
                        this.addInterestTag(value, tagsContainer);
                        interestInput.value = '';
                    }
                }
            });
        }
    }

    addInterestTag(text, container) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            <span>${text}</span>
            <button type="button" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(tag);
    }

    // Data Management
    saveProfile() {
        this.showLoading();
        
        // Collect all profile data
        const profileData = this.collectProfileData();
        
        // Simulate API save
        setTimeout(() => {
            localStorage.setItem('profileData', JSON.stringify(profileData));
            this.hideLoading();
            this.showSuccessToast('profile-saved');
        }, 1500);
    }

    collectProfileData() {
        const data = {
            personalInfo: {
                fullName: document.getElementById('fullName')?.value || '',
                title: document.getElementById('title')?.value || '',
                email: document.getElementById('profileEmail')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                location: document.getElementById('location')?.value || '',
                website: document.getElementById('website')?.value || '',
                bio: document.getElementById('bio')?.value || ''
            },
            skills: [],
            experience: [],
            education: [],
            projects: [],
            interests: [],
            theme: {
                primaryColor: document.getElementById('primaryColor')?.value || '#3b82f6',
                style: document.querySelector('.theme-option.active')?.getAttribute('data-theme') || 'modern'
            }
        };

        // Collect skills
        document.querySelectorAll('.skill-item').forEach(item => {
            const name = item.querySelector('.skill-name')?.textContent;
            const level = item.querySelector('.skill-level')?.className.split(' ')[1];
            if (name && level) {
                data.skills.push({ name, level });
            }
        });

        // Collect interests
        document.querySelectorAll('.tag span').forEach(tag => {
            data.interests.push(tag.textContent);
        });

        return data;
    }

    loadUserData() {
        const userData = localStorage.getItem('currentUser');
        const profileData = localStorage.getItem('profileData');
        
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
        
        if (profileData) {
            this.populateProfileData(JSON.parse(profileData));
        }
    }

    populateProfileData(data) {
        // Populate personal info
        if (data.personalInfo) {
            Object.keys(data.personalInfo).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = data.personalInfo[key];
                }
            });
        }

        // Populate theme
        if (data.theme) {
            const colorInput = document.getElementById('primaryColor');
            if (colorInput) {
                colorInput.value = data.theme.primaryColor;
                document.documentElement.style.setProperty('--primary-color', data.theme.primaryColor);
            }
            
            const themeOption = document.querySelector(`[data-theme="${data.theme.style}"]`);
            if (themeOption) {
                document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                themeOption.classList.add('active');
                document.body.className = `theme-${data.theme.style}`;
            }
        }
    }

    previewProfile() {
        // Open preview in new window/tab
        const profileData = this.collectProfileData();
        localStorage.setItem('previewData', JSON.stringify(profileData));
        window.open('index.html', '_blank');
    }

    // UI Helpers
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.querySelector('.loading-spinner p').textContent = message;
            overlay.classList.add('active');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    showSuccess(messageKey) {
        const overlay = document.getElementById('successMessage');
        if (overlay) {
            overlay.querySelector('h3').textContent = this.translations[this.currentLanguage][messageKey];
            overlay.querySelector('p').textContent = this.translations[this.currentLanguage]['redirecting'];
            overlay.classList.add('active');
        }
    }

    showSuccessToast(messageKey) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${this.translations[this.currentLanguage][messageKey]}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('active'), 100);
        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize the system when DOM is loaded
let authSystemInstance;
document.addEventListener('DOMContentLoaded', () => {
    authSystemInstance = new AuthSystem();
});

// Global functions for HTML onclick handlers
function initializeAuth() {
    if (authSystemInstance) {
        authSystemInstance.init();
    }
}

function checkSavedLanguage() {
    if (authSystemInstance) {
        authSystemInstance.updateLanguage();
    }
}

function toggleLanguage() {
    if (authSystemInstance) {
        authSystemInstance.toggleLanguage();
    }
}

// Utility functions for dynamic content
function removeElement(element) {
    element.remove();
}

function toggleCurrentJob(checkbox) {
    const endDateInput = checkbox.closest('.form-group').querySelector('input[type="month"]');
    if (endDateInput) {
        endDateInput.disabled = checkbox.checked;
        if (checkbox.checked) {
            endDateInput.value = '';
        }
    }
}