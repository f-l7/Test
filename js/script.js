document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('loginMessage');
            
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isAdminLoggedIn', 'true');
                messageEl.textContent = 'تم تسجيل الدخول بنجاح! جاري التوجيه...';
                messageEl.style.color = 'green';
                
                setTimeout(() => {
                    window.location.href = 'add-product.html';
                }, 1500);
            } else {
                messageEl.textContent = 'خطأ: اسم المستخدم أو كلمة المرور غير صحيحة';
                messageEl.style.color = 'red';
            }
        });
    }
});
