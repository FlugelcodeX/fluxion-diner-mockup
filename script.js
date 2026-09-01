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

const modalOrder = document.getElementById("modalOrder");

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
   ORDER THIS DISH
========================= */

modalOrder.addEventListener("click", (event) => {
  event.preventDefault();

  /*
      Close the menu modal.
    */

  closeMenuModal();

  /*
      Scroll all the way to the
      bottom of the website.
    */

  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, 180);
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
