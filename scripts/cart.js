// Centralized Cart Management

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} has been added to your cart!`);
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
          <img src="images/${item.name.toLowerCase().replace(" ", "-")}.jpg" alt="${item.name}">
          <div class="details">
              <span>${item.name} - ₹${item.price}</span>
          </div>
          <button onclick="removeFromCart(${index})">Remove</button>
      `;
    cartContainer.appendChild(cartItem);
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

// Display cart when the page loads
if (document.getElementById("cart-items")) {
  displayCart();
}
