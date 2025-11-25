const menuItems = [
  {
    id: 'mild-pepper-chicken',
    name: 'Mild Pepper Chicken with Jollof Rice',
    price: 13,
    description: 'Tender chicken, peppers, and fragrant jollof rice finished with house herbs.',
    image: 'two_chicken_kebabs_over_jollof_rice.jpg',
    featured: true,
  },
  {
    id: 'plantain-side',
    name: 'Side of Plantain',
    price: 6,
    description: 'Caramelized plantains with a hint of spice.',
    image: 'jerk_chicken.jpg',
  },
  {
    id: 'jumbo-shrimp',
    name: '12 Jumbo Shrimp with Jollof Rice',
    price: 20,
    description: 'Juicy shrimp over smoky jollof rice.',
    image: 'shrimp.jpg',
    featured: true,
  },
  {
    id: 'attieke-side',
    name: 'Side of Attiéké',
    price: 6,
    description: 'Classic cassava couscous, light and fluffy.',
    image: 'two_chicken_kebab.jpg',
  },
  {
    id: 'potato-salad-chicken',
    name: 'Potato Salad with Chicken',
    price: 13,
    description: 'Creamy potato salad topped with seasoned chicken.',
    image: 'jerk_chicken.jpg',
  },
  {
    id: 'potato-salad-small',
    name: 'Potato Salad Small bowl',
    price: 7,
    description: 'Snack-size portion of our signature potato salad.',
    image: 'jerk_chicken.jpg',
  },
  {
    id: 'plantain-beef',
    name: 'Plantain with Beef',
    price: 13,
    description: 'Sweet plantains paired with tender beef strips.',
    image: 'two_beef_kebab.jpg',
  },
  {
    id: 'extra-jollof',
    name: 'Extra Jollof Rice',
    price: 6,
    description: 'A hearty scoop of extra jollof for rice lovers.',
    image: 'two_chicken_kebabs_over_jollof_rice.jpg',
  },
];

const cart = [];

const menuGrid = document.getElementById('menuGrid');
const mostOrderedGrid = document.getElementById('mostOrderedGrid');
const cartPanel = document.getElementById('cartPanel');
const cartScrim = document.getElementById('cartScrim');
const cartItemsEl = document.getElementById('cartItems');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartCountEl = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const splashEl = document.getElementById('splash');

function currency(value) {
  return `$${value.toFixed(2)}`;
}

function addToCart(itemId) {
  const existing = cart.find((c) => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    const item = menuItems.find((m) => m.id === itemId);
    if (!item) return;
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function changeQty(itemId, delta) {
  const target = cart.find((c) => c.id === itemId);
  if (!target) return;
  target.qty += delta;
  if (target.qty <= 0) {
    const idx = cart.indexOf(target);
    cart.splice(idx, 1);
  }
  updateCartUI();
}

function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.innerHTML = `
    <img src="${item.image || 'holyhandslogo.png'}" alt="${item.name}">
    <div class="menu-card-body">
      <h3>${item.name}</h3>
      <p>${item.description || ''}</p>
      <div class="menu-actions">
        <span class="menu-price">${currency(item.price)}</span>
        <button class="add-btn" data-id="${item.id}">Add</button>
      </div>
    </div>
  `;
  return card;
}

function renderMenu() {
  menuGrid.innerHTML = '';
  menuItems.forEach((item) => {
    const card = renderCard(item);
    menuGrid.appendChild(card);
  });
}

function renderMostOrdered() {
  mostOrderedGrid.innerHTML = '';
  menuItems
    .filter((m) => m.featured)
    .forEach((item) => {
      const card = renderCard(item);
      mostOrderedGrid.appendChild(card);
    });
}

function updateCartUI() {
  cartItemsEl.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-header">
        <strong>${item.name}</strong>
        <span>${currency(item.price * item.qty)}</span>
      </div>
      <div class="quantity">
        <button aria-label="Remove one" data-action="dec" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button aria-label="Add one" data-action="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  cartSubtotalEl.textContent = currency(subtotal);
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  checkoutBtn.disabled = cart.length === 0;
}

function openCart() {
  cartPanel.classList.add('open');
  cartScrim.classList.add('visible');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartScrim.classList.remove('visible');
  cartPanel.setAttribute('aria-hidden', 'true');
}

function wireEvents() {
  menuGrid.addEventListener('click', (evt) => {
    const btn = evt.target.closest('button[data-id]');
    if (!btn) return;
    addToCart(btn.dataset.id);
  });

  mostOrderedGrid.addEventListener('click', (evt) => {
    const btn = evt.target.closest('button[data-id]');
    if (!btn) return;
    addToCart(btn.dataset.id);
  });

  cartItemsEl.addEventListener('click', (evt) => {
    const btn = evt.target.closest('button[data-id]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    changeQty(id, action === 'inc' ? 1 : -1);
  });

  document.getElementById('viewCart').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  cartScrim.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    const msg = 'Checkout connects to delcotechdivision.com for secure Stripe processing. Plug in your payment link to go live.';
    alert(msg);
  });
}

function initSplash() {
  setTimeout(() => {
    splashEl.classList.add('hide');
    document.body.classList.remove('show-splash');
  }, 1200);
}

function init() {
  renderMenu();
  renderMostOrdered();
  wireEvents();
  initSplash();
}

document.addEventListener('DOMContentLoaded', init);