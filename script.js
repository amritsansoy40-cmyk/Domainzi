const API = 'http://localhost:5000/api';

// Page load hone par items fetch karein
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    
    // Form submit event
    document.getElementById('productForm').addEventListener('submit', postProduct);
});

async function fetchProducts() {
    try {
        const res = await fetch(`${API}/products`);
        const products = await res.json();
        const list = document.getElementById('productList');
        
        list.innerHTML = products.map(p => `
            <div class="product-card">
                <img src="${p.image}" alt="${p.title}">
                <small>${p.category.toUpperCase()}</small>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <strong>₹${p.price}</strong>
                <p><small>Contact: ${p.sellerPhone}</small></p>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading products:', err);
    }
}

async function postProduct(e) {
    e.preventDefault();
    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value,
        sellerPhone: document.getElementById('sellerPhone').value,
    };

    await fetch(`${API}/products`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    alert('Item successfully list ho gaya!');
    fetchProducts();
    document.getElementById('productForm').reset();
}

function openLoginModal() { 
    document.getElementById('otpModal').classList.remove('hidden'); 
}

async function sendOTP() {
    const phone = document.getElementById('phoneInput').value;
    await fetch(`${API}/auth/send-otp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone })
    });
    document.getElementById('phoneStep').classList.add('hidden');
    document.getElementById('verifyStep').classList.remove('hidden');
    alert('OTP sent! Server console check karein.');
}

async function verifyOTP() {
    const phone = document.getElementById('phoneInput').value;
    const otp = document.getElementById('otpInput').value;
    const res = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone, otp })
    });
    const data = await res.json();
    if(data.token) {
        alert('Login Successful!');
        document.getElementById('otpModal').classList.add('hidden');
    } else {
        alert(data.error);
    }
}
