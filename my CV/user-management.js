// User Management System
class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentPage = 1;
        this.usersPerPage = 10;
        this.searchTerm = '';
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderUserTable();
        this.updatePagination();
    }

    // تحميل المستخدمين من التخزين المحلي
    loadUsers() {
        try {
            const users = localStorage.getItem('users');
            if (users) {
                return JSON.parse(users);
            }
        } catch (e) {
            console.error('Error loading users:', e);
        }
        
        // إنشاء مستخدمين تجريبيين إذا لم توجد بيانات
        return this.createSampleUsers();
    }

    // حفظ المستخدمين في التخزين المحلي
    saveUsers() {
        try {
            localStorage.setItem('users', JSON.stringify(this.users));
            adminAuth.logActivity('users_updated', { count: this.users.length });
        } catch (e) {
            console.error('Error saving users:', e);
            alert('حدث خطأ أثناء حفظ البيانات');
        }
    }

    // إنشاء مستخدمين تجريبيين
    createSampleUsers() {
        return [
            {
                id: 1,
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                phone: '+966501234567',
                role: 'user',
                status: 'active',
                registrationDate: '2024-01-15',
                lastLogin: '2024-01-20',
                profileImage: null
            },
            {
                id: 2,
                name: 'فاطمة علي',
                email: 'fatima@example.com',
                phone: '+966507654321',
                role: 'user',
                status: 'active',
                registrationDate: '2024-01-10',
                lastLogin: '2024-01-19',
                profileImage: null
            },
            {
                id: 3,
                name: 'محمد السعيد',
                email: 'mohammed@example.com',
                phone: '+966509876543',
                role: 'user',
                status: 'inactive',
                registrationDate: '2024-01-05',
                lastLogin: '2024-01-15',
                profileImage: null
            }
        ];
    }

    // ربط الأحداث
    bindEvents() {
        // البحث
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.renderUserTable();
                this.updatePagination();
            });
        }

        // الترتيب
        const sortSelect = document.getElementById('userSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                this.sortBy = sortBy;
                this.sortOrder = sortOrder;
                this.renderUserTable();
            });
        }

        // عدد المستخدمين في الصفحة
        const perPageSelect = document.getElementById('usersPerPage');
        if (perPageSelect) {
            perPageSelect.addEventListener('change', (e) => {
                this.usersPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderUserTable();
                this.updatePagination();
            });
        }
    }

    // تصفية وترتيب المستخدمين
    getFilteredAndSortedUsers() {
        let filteredUsers = this.users;

        // تطبيق البحث
        if (this.searchTerm) {
            filteredUsers = filteredUsers.filter(user => 
                user.name.toLowerCase().includes(this.searchTerm) ||
                user.email.toLowerCase().includes(this.searchTerm) ||
                user.phone.includes(this.searchTerm)
            );
        }

        // تطبيق الترتيب
        filteredUsers.sort((a, b) => {
            let aValue = a[this.sortBy];
            let bValue = b[this.sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (this.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filteredUsers;
    }

    // عرض جدول المستخدمين
    renderUserTable() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const filteredUsers = this.getFilteredAndSortedUsers();
        const startIndex = (this.currentPage - 1) * this.usersPerPage;
        const endIndex = startIndex + this.usersPerPage;
        const pageUsers = filteredUsers.slice(startIndex, endIndex);

        if (pageUsers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">
                        <div class="no-data">
                            <i class="fas fa-users"></i>
                            <p>لا توجد مستخدمين</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = pageUsers.map(user => `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">
                            ${user.profileImage ? 
                                `<img src="${user.profileImage}" alt="${user.name}">` : 
                                `<div class="avatar-placeholder">${user.name.charAt(0)}</div>`
                            }
                        </div>
                        <div class="user-details">
                            <strong>${user.name}</strong>
                            <small>${user.email}</small>
                        </div>
                    </div>
                </td>
                <td>${user.phone}</td>
                <td>
                    <span class="role-badge role-${user.role}">
                        ${user.role === 'admin' ? 'مدير' : 'مستخدم'}
                    </span>
                </td>
                <td>
                    <span class="status-badge status-${user.status}">
                        ${user.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                </td>
                <td>${this.formatDate(user.registrationDate)}</td>
                <td>${this.formatDate(user.lastLogin)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-view" onclick="userManager.viewUser(${user.id})" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-edit" onclick="userManager.editUser(${user.id})" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action btn-delete" onclick="userManager.deleteUser(${user.id})" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn-action btn-toggle" onclick="userManager.toggleUserStatus(${user.id})" title="تغيير الحالة">
                            <i class="fas fa-${user.status === 'active' ? 'ban' : 'check'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // تحديث التصفح
    updatePagination() {
        const filteredUsers = this.getFilteredAndSortedUsers();
        const totalPages = Math.ceil(filteredUsers.length / this.usersPerPage);
        
        const paginationContainer = document.getElementById('usersPagination');
        if (!paginationContainer) return;

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // زر السابق
        if (this.currentPage > 1) {
            paginationHTML += `
                <button class="pagination-btn" onclick="userManager.goToPage(${this.currentPage - 1})">
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
        }

        // أرقام الصفحات
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="pagination-btn active">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `<button class="pagination-btn" onclick="userManager.goToPage(${i})">${i}</button>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += `<span class="pagination-dots">...</span>`;
            }
        }

        // زر التالي
        if (this.currentPage < totalPages) {
            paginationHTML += `
                <button class="pagination-btn" onclick="userManager.goToPage(${this.currentPage + 1})">
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;
        }

        paginationContainer.innerHTML = paginationHTML;

        // تحديث معلومات التصفح
        const infoElement = document.getElementById('paginationInfo');
        if (infoElement) {
            const startItem = (this.currentPage - 1) * this.usersPerPage + 1;
            const endItem = Math.min(this.currentPage * this.usersPerPage, filteredUsers.length);
            infoElement.textContent = `عرض ${startItem}-${endItem} من ${filteredUsers.length} مستخدم`;
        }
    }

    // الانتقال إلى صفحة معينة
    goToPage(page) {
        this.currentPage = page;
        this.renderUserTable();
        this.updatePagination();
    }

    // تنسيق التاريخ
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }

    // عرض تفاصيل المستخدم
    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = this.createUserModal(user, 'view');
        document.body.appendChild(modal);
        modal.style.display = 'flex';

        adminAuth.logActivity('user_viewed', { userId, userName: user.name });
    }

    // تعديل المستخدم
    editUser(userId) {
        if (!requirePermission('users', 'edit')) return;

        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = this.createUserModal(user, 'edit');
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    // حذف المستخدم
    deleteUser(userId) {
        if (!requirePermission('users', 'delete')) return;

        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (confirm(`هل أنت متأكد من حذف المستخدم "${user.name}"؟`)) {
            this.users = this.users.filter(u => u.id !== userId);
            this.saveUsers();
            this.renderUserTable();
            this.updatePagination();

            adminAuth.logActivity('user_deleted', { userId, userName: user.name });
            
            this.showNotification('تم حذف المستخدم بنجاح', 'success');
        }
    }

    // تغيير حالة المستخدم
    toggleUserStatus(userId) {
        if (!requirePermission('users', 'edit')) return;

        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        user.status = user.status === 'active' ? 'inactive' : 'active';
        this.saveUsers();
        this.renderUserTable();

        adminAuth.logActivity('user_status_changed', { 
            userId, 
            userName: user.name, 
            newStatus: user.status 
        });

        this.showNotification(
            `تم ${user.status === 'active' ? 'تفعيل' : 'إلغاء تفعيل'} المستخدم بنجاح`, 
            'success'
        );
    }

    // إضافة مستخدم جديد
    addUser() {
        if (!requirePermission('users', 'create')) return;

        const modal = this.createUserModal(null, 'add');
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    // إنشاء نافذة منبثقة للمستخدم
    createUserModal(user, mode) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const isView = mode === 'view';
        const isEdit = mode === 'edit';
        const isAdd = mode === 'add';

        modal.innerHTML = `
            <div class="modal-content user-modal">
                <div class="modal-header">
                    <h3>${isAdd ? 'إضافة مستخدم جديد' : isEdit ? 'تعديل المستخدم' : 'تفاصيل المستخدم'}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="userForm" ${isView ? 'style="pointer-events: none;"' : ''}>
                        <div class="form-row">
                            <div class="form-group">
                                <label>الاسم الكامل</label>
                                <input type="text" name="name" value="${user ? user.name : ''}" ${isView ? 'readonly' : 'required'}>
                            </div>
                            <div class="form-group">
                                <label>البريد الإلكتروني</label>
                                <input type="email" name="email" value="${user ? user.email : ''}" ${isView ? 'readonly' : 'required'}>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>رقم الهاتف</label>
                                <input type="tel" name="phone" value="${user ? user.phone : ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label>الدور</label>
                                <select name="role" ${isView ? 'disabled' : ''}>
                                    <option value="user" ${user && user.role === 'user' ? 'selected' : ''}>مستخدم</option>
                                    <option value="admin" ${user && user.role === 'admin' ? 'selected' : ''}>مدير</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>الحالة</label>
                                <select name="status" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${user && user.status === 'active' ? 'selected' : ''}>نشط</option>
                                    <option value="inactive" ${user && user.status === 'inactive' ? 'selected' : ''}>غير نشط</option>
                                </select>
                            </div>
                            ${user ? `
                                <div class="form-group">
                                    <label>تاريخ التسجيل</label>
                                    <input type="text" value="${this.formatDate(user.registrationDate)}" readonly>
                                </div>
                            ` : ''}
                        </div>
                        ${isAdd ? `
                            <div class="form-row">
                                <div class="form-group">
                                    <label>كلمة المرور</label>
                                    <input type="password" name="password" required>
                                </div>
                                <div class="form-group">
                                    <label>تأكيد كلمة المرور</label>
                                    <input type="password" name="confirmPassword" required>
                                </div>
                            </div>
                        ` : ''}
                    </form>
                </div>
                <div class="modal-footer">
                    ${!isView ? `
                        <button class="btn btn-primary" onclick="userManager.saveUser(this, '${mode}', ${user ? user.id : 'null'})">
                            ${isAdd ? 'إضافة' : 'حفظ التغييرات'}
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        ${isView ? 'إغلاق' : 'إلغاء'}
                    </button>
                </div>
            </div>
        `;

        return modal;
    }

    // حفظ المستخدم
    saveUser(button, mode, userId) {
        const form = document.getElementById('userForm');
        const formData = new FormData(form);
        
        // التحقق من صحة البيانات
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const userData = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            role: formData.get('role'),
            status: formData.get('status')
        };

        // التحقق من البريد الإلكتروني المكرر
        const existingUser = this.users.find(u => u.email === userData.email && u.id !== userId);
        if (existingUser) {
            alert('البريد الإلكتروني مستخدم بالفعل');
            return;
        }

        if (mode === 'add') {
            // التحقق من كلمة المرور
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
                alert('كلمات المرور غير متطابقة');
                return;
            }

            if (password.length < 6) {
                alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                return;
            }

            // إضافة مستخدم جديد
            const newUser = {
                ...userData,
                id: Date.now(),
                registrationDate: new Date().toISOString().split('T')[0],
                lastLogin: null,
                profileImage: null
            };

            this.users.push(newUser);
            adminAuth.logActivity('user_created', { userId: newUser.id, userName: newUser.name });
            this.showNotification('تم إضافة المستخدم بنجاح', 'success');
        } else {
            // تحديث مستخدم موجود
            const userIndex = this.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...userData };
                adminAuth.logActivity('user_updated', { userId, userName: userData.name });
                this.showNotification('تم تحديث المستخدم بنجاح', 'success');
            }
        }

        this.saveUsers();
        this.renderUserTable();
        this.updatePagination();
        
        // إغلاق النافذة المنبثقة
        button.closest('.modal-overlay').remove();
    }

    // عرض إشعار
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // إزالة الإشعار بعد 3 ثوان
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // تصدير بيانات المستخدمين
    exportUsers() {
        if (!requirePermission('analytics', 'export')) return;

        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        link.href = URL.createObjectURL(blob);
        link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        adminAuth.logActivity('users_exported', { count: this.users.length });
        this.showNotification('تم تصدير بيانات المستخدمين بنجاح', 'success');
    }

    // إنشاء ملف CSV
    generateCSV() {
        const headers = ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'الدور', 'الحالة', 'تاريخ التسجيل', 'آخر دخول'];
        const rows = this.users.map(user => [
            user.name,
            user.email,
            user.phone,
            user.role === 'admin' ? 'مدير' : 'مستخدم',
            user.status === 'active' ? 'نشط' : 'غير نشط',
            this.formatDate(user.registrationDate),
            this.formatDate(user.lastLogin)
        ]);

        return [headers, ...rows].map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }

    // إحصائيات المستخدمين
    getUserStats() {
        const totalUsers = this.users.length;
        const activeUsers = this.users.filter(u => u.status === 'active').length;
        const adminUsers = this.users.filter(u => u.role === 'admin').length;
        const recentUsers = this.users.filter(u => {
            const regDate = new Date(u.registrationDate);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return regDate > weekAgo;
        }).length;

        return {
            total: totalUsers,
            active: activeUsers,
            inactive: totalUsers - activeUsers,
            admins: adminUsers,
            regular: totalUsers - adminUsers,
            recent: recentUsers
        };
    }
}

// إنشاء مثيل عام من مدير المستخدمين
let userManager;

// تهيئة مدير المستخدمين عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('usersTableBody')) {
        userManager = new UserManager();
    }
});

// تصدير الكائن للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManager;
}