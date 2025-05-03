// إعدادات الدفع
const paymentConfig = {
    paypalLink: "https://www.paypal.com/paypalme/TechnoBoxStore",
    rajhiAccount: {
        name: "TechnoBox Store",
        number: "SA0380000000608012345678",
        bank: "الراجحي"
    },
    admin: {
        username: "TechnoBoxAdmin2023",
        password: "TechnoBox@123"
    }
};

// نافذة الدفع
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
    document.getElementById('paymentContent').innerHTML = `
        <h2>اختر طريقة الدفع</h2>
        <div class="payment-methods">
            <button class="method-btn paypal" onclick="payWithPaypal()">
                الدفع عبر باي بال
            </button>
            <button class="method-btn rajhi" onclick="payWithRajhi()">
                التحويل البنكي - الراجحي
            </button>
            <button class="method-btn credit" onclick="payWithCredit()">
                بطاقة ائتمان
            </button>
        </div>
    `;
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// طرق الدفع
function payWithPaypal() {
    window.open(paymentConfig.paypalLink, '_blank');
    showSuccessMessage();
}

function payWithRajhi() {
    document.getElementById('paymentContent').innerHTML = `
        <h2>معلومات التحويل البنكي</h2>
        <div class="bank-info">
            <p><strong>اسم المستفيد:</strong> ${paymentConfig.rajhiAccount.name}</p>
            <p><strong>رقم الحساب:</strong> ${paymentConfig.rajhiAccount.number}</p>
            <p><strong>اسم البنك:</strong> ${paymentConfig.rajhiAccount.bank}</p>
        </div>
        <button class="method-btn" onclick="showSuccessMessage()">
            تم التحويل
        </button>
    `;
}

function showSuccessMessage() {
    document.getElementById('paymentContent').innerHTML = `
        <h2>شكراً لشرائك من TechnoBox</h2>
        <p>تم استلام طلبك بنجاح</p>
        <button class="method-btn" onclick="closePaymentModal()">
            إغلاق
        </button>
    `;
}

// إعداد الأحداث
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.close-modal').addEventListener('click', closePaymentModal);
    
    // تحديث السنة تلقائياً
    document.querySelector('footer p').innerHTML = 
        `<i class="far fa-copyright"></i> ${new Date().getFullYear()} جميع الحقوق محفوظة لـ TechnoBox`;
});
