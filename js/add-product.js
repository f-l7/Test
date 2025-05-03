document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value
    };
    
    alert('تمت إضافة المنتج بنجاح');
    this.reset();
});
