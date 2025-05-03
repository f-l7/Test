document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    const products = [
        {
            id: 1,
            name: "منتج تجريبي",
            description: "هذا وصف للمنتج التجريبي",
            price: "100",
            image: "https://via.placeholder.com/300"
        }
    ];

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>لا توجد منتجات متاحة حالياً</p>';
        return;
    }

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price} ر.س</p>
                <button class="order-btn">طلب المنتج</button>
            </div>
        `;
    });

    productsContainer.innerHTML = productsHTML;
});
