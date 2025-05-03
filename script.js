// تسجيل الدخول وإدارة المنتجات
document.addEventListener('DOMContentLoaded', function() {
    // روابط التنقل
    const adminLoginBtn = document.querySelector('.admin-login');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', function() {
            window.location.href = 'admin.html';
        });
    }

    // تسجيل دخول المسؤول
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // هنا يمكنك إضافة التحقق من اسم المستخدم وكلمة المرور
            // في هذا المثال، سنستخدم بيانات افتراضية
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isAdminLoggedIn', 'true');
                window.location.href = 'add-product.html';
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }

    // تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isAdminLoggedIn');
            localStorage.removeItem('products');
            window.location.href = 'index.html';
        });
    }

    // عرض المنتجات
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>لا توجد منتجات متاحة حالياً</p>';
        } else {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="product-price">${product.price} ر.س</p>
                        <a href="#" class="order-btn" data-product='${JSON.stringify(product)}'>طلب المنتج</a>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });

            // معالجة طلب المنتج
            document.querySelectorAll('.order-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const product = JSON.parse(this.getAttribute('data-product'));
                    alert(`تم طلب المنتج: ${product.name}\nالسعر: ${product.price} ر.س\nسيتم توجيهك لصفحة الدفع`);
                    // هنا يمكنك توجيه المستخدم لصفحة الدفع
                });
            });
        }
    }

    // إضافة منتج جديد
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        // تحقق من تسجيل الدخول أولاً
        if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
            window.location.href = 'admin.html';
        }

        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const productImage = document.getElementById('productImage').files[0];
            const productPrice = document.getElementById('productPrice').value;
            const paymentMethods = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(el => el.value);
            
            if (paymentMethods.length === 0) {
                alert('يرجى اختيار طريقة دفع واحدة على الأقل');
                return;
            }
            
            // قراءة صورة المنتج كـ URL
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
});
