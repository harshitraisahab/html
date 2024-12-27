// cart.js: Centralized JavaScript for managing cart functionality

// Add an item to the cart and store it in localStorage
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} has been added to your cart!`);
}

// Display cart items on the Cart page
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
          <span>${item.name} - ₹${item.price}</span>
          <button onclick="removeFromCart(${index})">Remove</button>
      `;
    cartContainer.appendChild(cartItem);
  });
}

// Remove an item from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Place an order by sending cart details via WhatsApp
function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const phoneNumber = "9540724212"; // Replace with café's WhatsApp number
  let message = "Hello, I would like to order:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\nTotal: ₹${total}`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  localStorage.removeItem("cart");
  displayCart();
}
