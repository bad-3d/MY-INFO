// Admin Authentication & Authorization System
class AdminAuth {
    constructor() {
        // استخدام بيانات آمنة ومشفرة
        this.adminCredentials = this.loadSecureCredentials();
        this.sessionKey = 'adminSession';
        this.activityKey = 'adminActivity';
        this.maxLoginAttempts = 3;
        this.lockoutTime = 15 * 60 * 1000; // 15 دقيقة
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        this.init();
    }

    // تحميل بيانات الاعتماد بشكل آمن
    loadSecureCredentials() {
        // في بيئة الإنتاج، يجب تحميل هذه البيانات من خادم آمن
        return {
            'admin@company.com': {
                password: this.hashPassword('SecureAdmin2024!'),
                permissions: ['all'],
                role: 'super_admin',
                lastLogin: null,
                loginAttempts: 0,
                lockedUntil: null
            }
        };
    }

    // تشفير كلمة المرور (تنفيذ مبسط للعرض)
    hashPassword(password) {
        // في بيئة الإنتاج، استخدم مكتبة تشفير قوية مثل bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // تحويل إلى 32-bit integer
        }
        return hash.toString();
    }

    init() {
        this.checkSessionValidity();
        this.setupAutoLogout();
    }

    // التحقق من صحة جلسة المدير
    checkSessionValidity() {
        try {
            const encryptedSession = localStorage.getItem(this.sessionKey);
            if (!encryptedSession) return false;

            // فك تشفير الجلسة
            const sessionData = JSON.parse(atob(encryptedSession));
            const now = new Date();
            const expiresAt = new Date(sessionData.expiresAt);

            if (now > expiresAt) {
                this.logout();
                return false;
            }

            // التحقق من صحة البيانات
            if (!sessionData.email || !sessionData.sessionId) {
                this.logout();
                return false;
            }

            return sessionData;
        } catch (error) {
            console.error('خطأ في التحقق من الجلسة:', error);
            this.logout();
            return false;
        }
    }

    // تسجيل دخول المدير
    async login(email, password, securityCode = 'ADMIN2024') {
        try {
            // التحقق من البيانات الأساسية
            if (!email || !password) {
                return {
                    success: false,
                    message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
                };
            }

            // التحقق من وجود المستخدم
            const admin = this.adminCredentials[email];
            if (!admin) {
                this.logActivity('login_failed', { email, reason: 'user_not_found' });
                return {
                    success: false,
                    message: 'بيانات الدخول غير صحيحة'
                };
            }

            // التحقق من القفل
            if (admin.lockedUntil && new Date() < new Date(admin.lockedUntil)) {
                return {
                    success: false,
                    message: 'الحساب مقفل مؤقتاً. حاول مرة أخرى لاحقاً'
                };
            }

            // التحقق من كلمة المرور
            const hashedPassword = this.hashPassword(password);
            if (hashedPassword !== admin.password) {
                admin.loginAttempts = (admin.loginAttempts || 0) + 1;
                
                if (admin.loginAttempts >= this.maxLoginAttempts) {
                    admin.lockedUntil = new Date(Date.now() + this.lockoutTime).toISOString();
                    this.logActivity('account_locked', { email });
                }
                
                this.logActivity('login_failed', { email, attempts: admin.loginAttempts });
                return {
                    success: false,
                    message: 'بيانات الدخول غير صحيحة'
                };
            }

            // إعادة تعيين محاولات الدخول عند النجاح
            admin.loginAttempts = 0;
            admin.lockedUntil = null;
            admin.lastLogin = new Date().toISOString();

            // إنشاء جلسة آمنة
            const session = {
                email: email,
                role: admin.role,
                permissions: admin.permissions,
                loginTime: new Date().toISOString(),
                expiresAt: new Date(Date.now() + this.sessionTimeout).toISOString(),
                sessionId: this.generateSessionId()
            };

            // حفظ الجلسة بشكل آمن
            this.saveSecureSession(session);
            
            // تسجيل النشاط
            this.logActivity('login_success', { email, role: admin.role });

            return {
                success: true,
                message: 'تم تسجيل الدخول بنجاح',
                user: {
                    email: email,
                    role: admin.role,
                    permissions: admin.permissions
                }
            };

        } catch (error) {
            console.error('خطأ في تسجيل الدخول:', error);
            this.logActivity('login_error', { email, error: error.message });
            return {
                success: false,
                message: 'حدث خطأ أثناء تسجيل الدخول'
            };
        }
    }

    // حفظ الجلسة بشكل آمن
    saveSecureSession(session) {
        try {
            const encryptedSession = btoa(JSON.stringify(session));
            localStorage.setItem(this.sessionKey, encryptedSession);
        } catch (error) {
            console.error('خطأ في حفظ الجلسة:', error);
        }
    }

    // تسجيل خروج المدير
    logout() {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
            try {
                const session = JSON.parse(adminSession);
                this.logActivity('logout', { email: session.email });
            } catch (e) {
                console.error('Error parsing admin session:', e);
            }
        }
        
        localStorage.removeItem('adminSession');
        
        // إعادة توجيه إلى صفحة تسجيل الدخول
        if (window.location.pathname !== '/admin-login.html') {
            window.location.href = 'admin-login.html';
        }
    }

    // الحصول على صلاحيات المدير
    getAdminPermissions() {
        return {
            users: {
                view: true,
                create: true,
                edit: true,
                delete: true
            },
            portfolios: {
                view: true,
                create: true,
                edit: true,
                delete: true
            },
            analytics: {
                view: true,
                export: true
            },
            settings: {
                view: true,
                edit: true
            },
            system: {
                backup: true,
                restore: true,
                maintenance: true
            }
        };
    }

    // التحقق من صلاحية معينة
    hasPermission(module, action) {
        const adminSession = localStorage.getItem('adminSession');
        
        if (!adminSession) {
            return false;
        }

        try {
            const session = JSON.parse(adminSession);
            const permissions = session.permissions;
            
            return permissions[module] && permissions[module][action];
        } catch (e) {
            return false;
        }
    }

    // الحصول على معلومات المدير الحالي
    getCurrentAdmin() {
        const adminSession = localStorage.getItem('adminSession');
        
        if (!adminSession) {
            return null;
        }

        try {
            return JSON.parse(adminSession);
        } catch (e) {
            return null;
        }
    }

    // إعداد تسجيل الخروج التلقائي
    setupAutoLogout() {
        let lastActivity = Date.now();
        const inactivityTimeout = 30 * 60 * 1000; // 30 دقيقة

        // تتبع النشاط
        const updateActivity = () => {
            lastActivity = Date.now();
        };

        document.addEventListener('mousedown', updateActivity);
        document.addEventListener('mousemove', updateActivity);
        document.addEventListener('keypress', updateActivity);
        document.addEventListener('scroll', updateActivity);
        document.addEventListener('touchstart', updateActivity);

        // فحص عدم النشاط كل دقيقة
        setInterval(() => {
            if (Date.now() - lastActivity > inactivityTimeout) {
                if (this.checkSessionValidity()) {
                    alert('تم تسجيل خروجك تلقائياً بسبب عدم النشاط');
                    this.logout();
                }
            }
        }, 60000);
    }

    // توليد معرف جلسة فريد
    generateSessionId() {
        return 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // تسجيل الأنشطة
    logActivity(action, data = {}) {
        const activity = {
            action,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: 'localhost' // في التطبيق الحقيقي، يجب الحصول على IP الحقيقي
        };

        // الحصول على سجل الأنشطة الحالي
        let activityLog = [];
        try {
            const existingLog = localStorage.getItem('adminActivityLog');
            if (existingLog) {
                activityLog = JSON.parse(existingLog);
            }
        } catch (e) {
            console.error('Error parsing activity log:', e);
        }

        // إضافة النشاط الجديد
        activityLog.push(activity);

        // الاحتفاظ بآخر 1000 نشاط فقط
        if (activityLog.length > 1000) {
            activityLog = activityLog.slice(-1000);
        }

        // حفظ السجل المحدث
        localStorage.setItem('adminActivityLog', JSON.stringify(activityLog));
    }

    // الحصول على سجل الأنشطة
    getActivityLog(limit = 100) {
        try {
            const activityLog = localStorage.getItem('adminActivityLog');
            if (activityLog) {
                const log = JSON.parse(activityLog);
                return log.slice(-limit).reverse(); // إرجاع آخر الأنشطة أولاً
            }
        } catch (e) {
            console.error('Error getting activity log:', e);
        }
        return [];
    }

    // تنظيف البيانات القديمة
    cleanupOldData() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        try {
            const activityLog = localStorage.getItem('adminActivityLog');
            if (activityLog) {
                const log = JSON.parse(activityLog);
                const filteredLog = log.filter(activity => {
                    return new Date(activity.timestamp) > oneWeekAgo;
                });
                localStorage.setItem('adminActivityLog', JSON.stringify(filteredLog));
            }
        } catch (e) {
            console.error('Error cleaning up old data:', e);
        }
    }

    // تصدير البيانات
    exportData() {
        const adminSession = this.getCurrentAdmin();
        const activityLog = this.getActivityLog(1000);
        
        const exportData = {
            exportDate: new Date().toISOString(),
            exportedBy: adminSession ? adminSession.email : 'unknown',
            activityLog: activityLog,
            systemInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform
            }
        };

        // إنشاء ملف JSON للتحميل
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `admin_data_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.logActivity('data_export', { recordCount: activityLog.length });
    }

    // تغيير كلمة مرور المدير
    changePassword(currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            if (currentPassword !== this.adminCredentials.password) {
                reject(new Error('كلمة المرور الحالية غير صحيحة'));
                return;
            }

            if (newPassword.length < 8) {
                reject(new Error('كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل'));
                return;
            }

            // في التطبيق الحقيقي، يجب تشفير كلمة المرور وحفظها في قاعدة البيانات
            this.adminCredentials.password = newPassword;
            
            this.logActivity('password_change', { email: this.adminCredentials.email });
            
            resolve('تم تغيير كلمة المرور بنجاح');
        });
    }
}

// إنشاء مثيل عام من نظام المصادقة
const adminAuth = new AdminAuth();

// دوال مساعدة عامة
function requireAdminAuth() {
    if (!adminAuth.checkSessionValidity()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

function requirePermission(module, action) {
    if (!adminAuth.hasPermission(module, action)) {
        alert('ليس لديك صلاحية للقيام بهذا الإجراء');
        return false;
    }
    return true;
}

// تنظيف البيانات القديمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    adminAuth.cleanupOldData();
});

// تصدير الكائن للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminAuth;
}