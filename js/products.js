document.addEventListener('DOMContentLoaded', function() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.getElementById('productsContainer');
    const paymentModal = document.getElementById('paymentModal');
    const paymentContent = document.getElementById('paymentContent');

    // عرض المنتجات
    function displayProducts() {
        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">لا توجد منتجات متاحة حالياً</p>';
            return;
        }

        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">${product.price} ر.س</p>
                    <button class="order-btn" data-id="${product.id}">طلب المنتج</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // إضافة أحداث لأزرار الطلب
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) showPaymentOptions(product);
            });
        });
    }

    // عرض خيارات الدفع
    function showPaymentOptions(product) {
        paymentContent.innerHTML = `
            <h3>الدفع: ${product.name}</h3>
            <p class="payment-price">${product.price} ر.س</p>
            <div class="payment-methods">
                ${product.paymentMethods.includes('paypal') ? 
                    '<button class="pay-btn paypal" data-method="paypal">باي بال</button>' : ''}
                ${product.paymentMethods.includes('rajhi') ? 
                    '<button class="pay-btn rajhi" data-method="rajhi">الراجحي</button>' : ''}
                ${product.paymentMethods.includes('credit') ? 
                    '<button class="pay-btn credit" data-method="credit">بطاقة ائتمان</button>' : ''}
            </div>
        `;
        
        paymentModal.style.display = 'flex';
        
        // إضافة أحداث لأزرار الدفع
        document.querySelectorAll('.pay-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                processPayment(product, method);
            });
        });
    }

    // معالجة الدفع
    function processPayment(product, method) {
        switch(method) {
            case 'paypal':
                paymentContent.innerHTML = `
                    <h3>جاري التوجيه إلى باي بال...</h3>
                    <p>سيتم توجيهك إلى موقع باي بال لإتمام الدفع</p>
                    <div class="payment-actions">
                        <button class="action-btn cancel">إلغاء</button>
                        <button class="action-btn confirm">تأكيد</button>
                    </div>
                `;
                
                document.querySelector('.action-btn.confirm').addEventListener('click', function() {
                    // هنا رابط باي بال الفعلي
                    window.open('https://www.paypal.com/paynow', '_blank');
                    showSuccessMessage(product);
                });
                break;
                
            case 'rajhi':
                paymentContent.innerHTML = `
                    <h3>تحويل بنكي - الراجحي</h3>
                    <div class="bank-details">
                        <p><strong>اسم المستفيد:</strong> متجرنا الإلكتروني</p>
                        <p><strong>رقم الحساب:</strong> SA0380000000608012345678</p>
                        <p><strong>المبلغ:</strong> ${product.price} ر.س</p>
                    </div>
                    <p class="notice">بعد التحويل يرجى تصوير الإيصال وإرساله للدعم الفني</p>
                    <div class="payment-actions">
                        <button class="action-btn support">فتح الدعم الفني</button>
                        <button class="action-btn done">تم التحويل</button>
                    </div>
                `;
                
                document.querySelector('.action-btn.support').addEventListener('click', function() {
                    window.open('https://wa.me/966500000000', '_blank');
                });
                
                document.querySelector('.action-btn.done').addEventListener('click', function() {
                    showSuccessMessage(product);
                });
                break;
                
            case 'credit':
                paymentContent.innerHTML = `
                    <h3>دفع ببطاقة ائتمان</h3>
                    <form id="creditCardForm">
                        <div class="form-group">
                            <label for="cardNumber">رقم البطاقة</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiry">تاريخ الانتهاء</label>
                                <input type="text" id="expiry" placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123">
                            </div>
                        </div>
                        <div class="payment-actions">
                            <button type="submit" class="action-btn confirm">تأكيد الدفع</button>
                        </div>
                    </form>
                `;
                
                document.getElementById('creditCardForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    showSuccessMessage(product);
                });
                break;
        }
    }

    // عرض رسالة النجاح
    function showSuccessMessage(product) {
        paymentContent.innerHTML = `
            <div class="success-message">
                <h3>تمت العملية بنجاح!</h3>
                <p>شكراً لشرائك ${product.name}</p>
                <p class="success-icon">✓</p>
                <p class="notice">يرجى تصوير الشاشة وإرسالها للدعم الفني</p>
                <div class="payment-actions">
                    <button class="action-btn support">فتح الدعم الفني</button>
                    <button class="action-btn close">العودة للمنتجات</button>
                </div>
            </div>
        `;
        
        document.querySelector('.action-btn.support').addEventListener('click', function() {
            window.open('https://wa.me/966500000000', '_blank');
        });
        
        document.querySelector('.action-btn.close').addEventListener('click', function() {
            paymentModal.style.display = 'none';
        });
    }

    // إغلاق النافذة
    document.querySelector('.close-modal').addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });

    // عرض المنتجات عند تحميل الصفحة
    displayProducts();
});
