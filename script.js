/* =========================
   FACEBOOK ORDER PAGE
========================= */

const facebookOrderUrl =
  "https://www.facebook.com/profile.php?id=61565052770927";

/* =========================
   HEADER
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
  });
});

/* =========================
   MENU FILTER
========================= */

const menuTabs = document.querySelectorAll(".menu-tab");

const menuItems = document.querySelectorAll(".menu-item");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedCategory = tab.dataset.category;

    /* Change active category */

    menuTabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    /* Filter menu items */

    menuItems.forEach((item) => {
      const itemCategory = item.dataset.category;

      if (selectedCategory === "all" || itemCategory === selectedCategory) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

/* =========================
   CART STATE
========================= */

let cart = [];

function parsePrice(priceString) {
  const digits = priceString.replace(/[^0-9.]/g, "");

  return parseFloat(digits) || 0;
}

function formatPrice(amount) {
  return "₱" + amount.toLocaleString("en-PH");
}

function saveCartAndRender() {
  renderCart();
  updateCartCount();
}

function addToCart(item, quantity) {
  const existing = cart.find((entry) => entry.name === item.name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name: item.name,
      price: parsePrice(item.price),
      priceLabel: item.price,
      image: item.image,
      quantity: quantity,
    });
  }

  saveCartAndRender();

  const cartCount = document.getElementById("cartCount");

  cartCount.classList.remove("bump");

  void cartCount.offsetWidth;

  cartCount.classList.add("bump");
}

function updateCartCount() {
  const totalQty = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  document.getElementById("cartCount").textContent = totalQty;

  document.getElementById("receiveReceiptBtn").disabled = cart.length === 0;
}

function cartTotal() {
  return cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  const cartEmpty = document.getElementById("cartEmpty");

  cartItems.querySelectorAll(".cart-item").forEach((node) => node.remove());

  if (cart.length === 0) {
    cartEmpty.style.display = "flex";
  } else {
    cartEmpty.style.display = "none";

    cart.forEach((entry, index) => {
      const row = document.createElement("div");

      row.className = "cart-item";

      row.innerHTML = `
        <img src="${entry.image}" alt="${entry.name}" />
        <div class="cart-item-info">
          <strong>${entry.name}</strong>
          <span>${entry.priceLabel} each</span>
        </div>
        <div class="cart-item-controls">
          <button type="button" class="cart-minus" data-index="${index}" aria-label="Decrease quantity">−</button>
          <span>${entry.quantity}</span>
          <button type="button" class="cart-plus" data-index="${index}" aria-label="Increase quantity">+</button>
          <button type="button" class="cart-item-remove" data-index="${index}">Remove</button>
        </div>
      `;

      cartItems.appendChild(row);
    });
  }

  document.getElementById("cartTotal").textContent = formatPrice(cartTotal());

  cartItems.querySelectorAll(".cart-minus").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart[index].quantity -= 1;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }

      saveCartAndRender();
    });
  });

  cartItems.querySelectorAll(".cart-plus").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart[index].quantity += 1;

      saveCartAndRender();
    });
  });

  cartItems.querySelectorAll(".cart-item-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      saveCartAndRender();
    });
  });
}

/* =========================
   CART DRAWER OPEN/CLOSE
========================= */

const cartDrawer = document.getElementById("cartDrawer");

const cartToggle = document.getElementById("cartToggle");

const cartBackdrop = document.getElementById("cartBackdrop");

const cartClose = document.getElementById("cartClose");

function openCart() {
  cartDrawer.classList.add("active");

  cartDrawer.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeCart() {
  cartDrawer.classList.remove("active");

  cartDrawer.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

cartToggle.addEventListener("click", openCart);

cartBackdrop.addEventListener("click", closeCart);

cartClose.addEventListener("click", closeCart);

/* =========================
   MENU MODAL
========================= */

const menuModal = document.getElementById("menuModal");

const modalBackdrop = document.getElementById("modalBackdrop");

const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalPrice = document.getElementById("modalPrice");

const modalDescription = document.getElementById("modalDescription");

const modalDetails = document.getElementById("modalDetails");

const modalIngredients = document.getElementById("modalIngredients");

const modalServing = document.getElementById("modalServing");

const qtyStepper = document.getElementById("qtyStepper");

const qtyValue = document.getElementById("qtyValue");

const qtyMinus = document.getElementById("qtyMinus");

const qtyPlus = document.getElementById("qtyPlus");

const addToCartButton = document.getElementById("addToCart");

let currentModalItem = null;

let currentQty = 1;

/* =========================
   OPEN MODAL
========================= */

function openMenuModal(item) {
  const name = item.dataset.name;

  const price = item.dataset.price;

  const image = item.dataset.image;

  const description = item.dataset.description;

  const details = item.dataset.details;

  const ingredients = item.dataset.ingredients;

  const serving = item.dataset.serving;

  modalImage.src = image;

  modalImage.alt = name;

  modalTitle.textContent = name;

  modalPrice.textContent = price;

  modalDescription.textContent = description;

  modalDetails.textContent = details;

  modalIngredients.textContent = ingredients;

  modalServing.textContent = serving;

  currentModalItem = { name, price, image };

  currentQty = 1;

  qtyValue.textContent = currentQty;

  addToCartButton.classList.remove("added");

  addToCartButton.innerHTML = "Add to Cart<span>🛒</span>";

  menuModal.classList.add("active");

  menuModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

/* =========================
   CLOSE MODAL
========================= */

function closeMenuModal() {
  menuModal.classList.remove("active");

  menuModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

/* =========================
   QUICK ADD-TO-CART (MENU CARDS)
========================= */

menuItems.forEach((item) => {
  const menuContent = item.querySelector(".menu-content");

  if (!menuContent) {
    return;
  }

  const quickAddBtn = document.createElement("button");

  quickAddBtn.type = "button";

  quickAddBtn.className = "quick-add-btn";

  quickAddBtn.setAttribute("aria-label", `Add ${item.dataset.name} to cart`);

  quickAddBtn.innerHTML = "Add to Cart<span>🛒</span>";

  quickAddBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    addToCart(
      {
        name: item.dataset.name,
        price: item.dataset.price,
        image: item.dataset.image,
      },
      1,
    );

    quickAddBtn.classList.add("added");

    quickAddBtn.innerHTML = "Added ✓<span></span>";

    setTimeout(() => {
      quickAddBtn.classList.remove("added");

      quickAddBtn.innerHTML = "Add to Cart<span>🛒</span>";
    }, 900);
  });

  menuContent.appendChild(quickAddBtn);
});

/* =========================
   MENU CARD CLICK
========================= */

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    openMenuModal(item);
  });
});

/* =========================
   CLOSE BUTTON
========================= */

modalClose.addEventListener("click", closeMenuModal);

/* =========================
   BACKDROP
========================= */

modalBackdrop.addEventListener("click", closeMenuModal);

/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuModal.classList.contains("active")) {
    closeMenuModal();
  }
});

/* =========================
   QTY STEPPER
========================= */

qtyMinus.addEventListener("click", () => {
  if (currentQty > 1) {
    currentQty -= 1;

    qtyValue.textContent = currentQty;
  }
});

qtyPlus.addEventListener("click", () => {
  currentQty += 1;

  qtyValue.textContent = currentQty;
});

/* =========================
   ADD TO CART
========================= */

addToCartButton.addEventListener("click", () => {
  if (!currentModalItem) {
    return;
  }

  addToCart(currentModalItem, currentQty);

  addToCartButton.classList.add("added");

  addToCartButton.innerHTML = "Added ✓<span></span>";

  setTimeout(() => {
    closeMenuModal();
  }, 500);
});

/* =========================
   RECEIVE RECEIPT
========================= */

const receiptModal = document.getElementById("receiptModal");

const receiptBackdrop = document.getElementById("receiptBackdrop");

const receiptClose = document.getElementById("receiptClose");

const receiptLines = document.getElementById("receiptLines");

const receiptTotal = document.getElementById("receiptTotal");

const receiptDateTime = document.getElementById("receiptDateTime");

const receiptCopyBtn = document.getElementById("receiptCopyBtn");

const receiveReceiptBtn = document.getElementById("receiveReceiptBtn");

const customerNameInput = document.getElementById("customerName");

const customerAddressInput = document.getElementById("customerAddress");

const cartCustomerHint = document.getElementById("cartCustomerHint");

const receiptCustomer = document.getElementById("receiptCustomer");

function buildReceiptText() {
  const name = customerNameInput.value.trim();

  const address = customerAddressInput.value.trim();

  const now = new Date();

  const orderLines = cart
    .map((entry) => `${entry.quantity}x ${entry.name}`)
    .join(", ");

  return [
    `Name: ${name}`,
    `Address: ${address}`,
    `Date/Time: ${now.toLocaleString("en-PH")}`,
    `Order: ${orderLines}`,
    `Total: ${formatPrice(cartTotal())}`,
  ].join("\n");
}

function validateCustomerFields() {
  const name = customerNameInput.value.trim();

  const address = customerAddressInput.value.trim();

  const isValid = name.length > 0 && address.length > 0;

  customerNameInput.classList.toggle("field-error", name.length === 0);

  customerAddressInput.classList.toggle("field-error", address.length === 0);

  cartCustomerHint.classList.toggle("error", !isValid);

  cartCustomerHint.textContent = isValid
    ? "Please fill in your name and address before requesting a receipt."
    : "Name and address are required before requesting a receipt.";

  return isValid;
}

customerNameInput.addEventListener("input", () => {
  if (customerNameInput.classList.contains("field-error")) {
    validateCustomerFields();
  }
});

customerAddressInput.addEventListener("input", () => {
  if (customerAddressInput.classList.contains("field-error")) {
    validateCustomerFields();
  }
});

function openReceipt() {
  if (cart.length === 0) {
    return;
  }

  if (!validateCustomerFields()) {
    customerNameInput.focus();

    return;
  }

  const name = customerNameInput.value.trim();

  const address = customerAddressInput.value.trim();

  receiptCustomer.innerHTML = `
    <div><span class="rc-label">Name</span><span>${name}</span></div>
    <div><span class="rc-label">Address</span><span>${address}</span></div>
  `;

  receiptLines.innerHTML = "";

  cart.forEach((entry, index) => {
    const lineTotal = entry.price * entry.quantity;

    const row = document.createElement("div");

    row.className = "receipt-line";

    row.style.animationDelay = `${0.15 + index * 0.08}s`;

    row.innerHTML = `
      <span class="rl-name">${entry.name} <span class="rl-qty">x${entry.quantity}</span></span>
      <span>${formatPrice(lineTotal)}</span>
    `;

    receiptLines.appendChild(row);
  });

  receiptTotal.textContent = formatPrice(cartTotal());

  receiptDateTime.textContent = new Date().toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  receiptCopyBtn.classList.remove("copied");

  receiptCopyBtn.innerHTML = "Copy Order Details<span>⧉</span>";

  closeCart();

  receiptModal.classList.add("active");

  receiptModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeReceipt() {
  receiptModal.classList.remove("active");

  receiptModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

receiveReceiptBtn.addEventListener("click", openReceipt);

receiptBackdrop.addEventListener("click", closeReceipt);

receiptClose.addEventListener("click", closeReceipt);

receiptCopyBtn.addEventListener("click", async () => {
  const text = buildReceiptText();

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textarea = document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);
  }

  receiptCopyBtn.classList.add("copied");

  receiptCopyBtn.innerHTML = "Copied ✓<span></span>";

  setTimeout(() => {
    receiptCopyBtn.classList.remove("copied");

    receiptCopyBtn.innerHTML = "Copy Order Details<span>⧉</span>";
  }, 2000);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && receiptModal.classList.contains("active")) {
    closeReceipt();
  }
});

/* =========================
   STICKY ORDER BUTTON
========================= */

const orderButton = document.querySelector(".order-button");

orderButton.href = facebookOrderUrl;

/* =========================
   NAVIGATION ORDER BUTTON
========================= */

const navOrder = document.querySelector(".nav-order");

navOrder.href = facebookOrderUrl;

/* =========================
   FOOTER FACEBOOK
========================= */

const footerFacebook = document.querySelector(
  ".footer-column a[href*='facebook']",
);

if (footerFacebook) {
  footerFacebook.href = facebookOrderUrl;
}

/* =========================
   IMAGE ERROR HANDLING
========================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.background = "#eee5d5";
  });
});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   HERO INITIAL ANIMATION
========================= */

window.addEventListener("load", () => {
  document.querySelectorAll(".hero .reveal").forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, index * 180);
  });
});
