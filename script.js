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
// jpeg.json se data load karke website par dikhane ka code
document.addEventListener("DOMContentLoaded", function() {
  fetch('jpeg.json')
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('productsList');
      if (!container) return; // Agar productsList nahi mila toh code yahin ruk jayega
      
      container.innerHTML = ""; // Purana text clear karein

      data.products.forEach(product => {
        let card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-title', product.title);
        
        card.style.cssText = "border: 1px solid #ddd; border-radius: 8px; background: white; width: 160px; overflow: hidden; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); padding-bottom: 10px;";

        card.innerHTML = `
          <div class="product-image" style="height: 120px; background-color: #eee; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #eee;">
            <img src="${product.image}" alt="${product.name}" style="max-width:100%; max-height:100%; object-fit:cover;">
          </div>
          <div style="padding: 10px;">
            <h4 style="margin: 0 0 5px 0; font-size:16px;">${product.name}</h4>
            <p style="margin: 0; font-size:14px; color:#555;">${product.price}</p>
            <button class="buy-btn" onclick="handleBuyAction('${product.name}')" style="background-color: #28a745; color: white; border: none; padding: 6px 10px; border-radius: 4px; width: 100%; cursor: pointer; margin-top: 8px; font-size: 13px;">Buy Now</button>
          </div>
        `;
        
        container.appendChild(card);
      });
    })
    .catch(error => console.log('JSON load karne mein error aayi:', error));
});
