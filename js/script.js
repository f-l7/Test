// تسجيل الدخول
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageEl = document.getElementById('loginMessage');
        
        // بيانات الدخول الافتراضية
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

// التحقق من تسجيل الدخول
if (window.location.pathname.includes('add-product.html')) {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = 'admin.html';
    }
}

// تسجيل الخروج
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isAdminLoggedIn');
        alert('تم تسجيل الخروج بنجاح');
        window.location.href = 'index.html';
    });
}

// إضافة منتج جديد
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').files[0];
        const productPrice = document.getElementById('productPrice').value;
        
        const paymentMethods = Array.from(
            document.querySelectorAll('input[name="payment"]:checked')
        ).map(el => el.value);
        
        if (!productImage) {
            alert('يجب اختيار صورة للمنتج');
            return;
        }
        
        if (paymentMethods.length === 0) {
            alert('يجب اختيار طريقة دفع واحدة على الأقل');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            
            const newProduct = {
                id: Date.now(),
                name: productName,
                description: productDescription,
                image: e.target.result,
                price: productPrice,
                paymentMethods: paymentMethods
            };
            
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            
            alert('تمت إضافة المنتج بنجاح!');
            addProductForm.reset();
        };
        
        reader.readAsDataURL(productImage);
    });
}
