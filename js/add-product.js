document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = 'admin.html';
    }

    const addProductForm = document.getElementById('addProductForm');
    
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
                paymentMethods: paymentMethods,
                createdAt: new Date().toISOString()
            };
            
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            
            alert('تمت إضافة المنتج بنجاح! سيظهر الآن لجميع الزوار');
            addProductForm.reset();
            
            setTimeout(() => {
                window.location.href = 'products.html';
            }, 1500);
        };
        
        reader.readAsDataURL(productImage);
    });

    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'index.html';
    });
});
