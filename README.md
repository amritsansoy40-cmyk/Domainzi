# Art & Second-Hand Marketplace

A full-stack e-commerce web application where users can buy and sell custom artwork/drawings as well as second-hand items. The platform features an OTP-based mobile authentication system and a clean, responsive UI inspired by top e-commerce platforms like Flipkart.

---

## 🚀 Features

- **OTP Mobile Authentication:** Secure user login via 4-digit OTP verification.
- **Dual Category Listing:** 
  - Sell custom hand-made **Drawings & Artworks**.
  - Sell **Second-Hand Goods** (electronics, furniture, books, etc.).
- **Interactive Marketplace Feed:** Browse listed items with dynamic price, image, category tags, and seller contact info.
- **Modern UI/UX:** Clean, responsive, e-commerce style card layout built with custom CSS.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Flipkart Theme), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Phone OTP System (JSON Web Tokens ready)

---

## 📁 Project Structure

```text
multi-marketplace/
├── server.js          # Backend server logic & API routes
├── index.html         # Main user interface (HTML structure)
├── style.css          # Flipkart-styled custom CSS
├── script.js         # Frontend JavaScript & API calls
├── .env               # Environment variables (MongoDB URI, Port)
└── package.json       # Node.js dependencies
 
