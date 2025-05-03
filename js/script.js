// إدارة حالة تسجيل الدخول
let isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

// تسجيل الدخول للمسؤول
if (document.getElementById('adminLoginForm')) {
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // بيانات الدخول الافتراضية (يمكنك تغييرها)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            isAdminLoggedIn = true;
            window.location.href = 'add-product.html';
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    });
}

// تسجيل الخروج
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('products');
        isAdminLoggedIn = false;
        window.location.href = 'index.html';
    });
}

// عرض المنتجات
if (document.getElementById('productsContainer')) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
        document.getElementById('productsContainer').innerHTML = `
            <div class="no-products">
                <p>لا توجد منتجات متاحة حالياً</p>
            </div>
        `;
    } else {
        let productsHTML = '';
        
        products.forEach(product => {
            productsHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="product-price">${product.price} ر.س</p>
                        <a href="#" class="order-btn" data-product='${JSON.stringify(product)}'>طلب المنتج</a>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('productsContainer').innerHTML = productsHTML;
        
        // معالجة طلب المنتج
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const product = JSON.parse(this.getAttribute('data-product'));
                
                // هنا يمكنك إضافة منطق معالجة الطلب
                alert(`تم طلب المنتج: ${product.name}\nالسعر: ${product.price} ر.س`);
                
                // توجيه المستخدم لصفحة الدفع
                // window.location.href = 'payment.html';
            });
        });
    }
}

// إضافة منتج جديد
if (document.getElementById('addProductForm')) {
    // التحقق من تسجيل الدخول
    if (!isAdminLoggedIn) {
        window.location.href = 'admin.html';
    }
    
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').files[0];
        const productPrice = document.getElementById('productPrice').value;
        
        const paymentMethods = Array.from(
            document.querySelectorAll('input[name="payment"]:checked')
        ).map(el => el.value);
        
        if (!productImage) {
            alert('يرجى اختيار صورة للمنتج');
            return;
        }
        
        if (paymentMethods.length === 0) {
            alert('يرجى اختيار طريقة دفع واحدة على الأقل');
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
            document.getElementById('addProductForm').reset();
        };
        
        reader.readAsDataURL(productImage);
    });
}

// إدارة ظهور زر تسجيل الدخول/الخروج
function updateAdminButton() {
    const adminLinks = document.querySelectorAll('.admin-login, .logout-btn');
    
    adminLinks.forEach(link => {
        if (isAdminLoggedIn && link.classList.contains('admin-login')) {
            link.style.display = 'none';
        } else if (!isAdminLoggedIn && link.classList.contains('logout-btn')) {
            link.style.display = 'none';
        }
    });
}

// تحديث الأزرار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateAdminButton);
