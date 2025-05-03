document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>لا توجد منتجات متاحة حالياً</p>';
        return;
    }

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">${product.price} ر.س</p>
                    <a href="#" class="order-btn" data-id="${product.id}">طلب المنتج</a>
                </div>
            </div>
        `;
    });

    productsContainer.innerHTML = productsHTML;

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            
            if (product) {
                alert(`تم طلب المنتج: ${product.name}\nالسعر: ${product.price} ر.س`);
            }
        });
    });
});
