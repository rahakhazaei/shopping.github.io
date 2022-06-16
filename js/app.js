//imports
import { productsData } from "./products.js";

const mobileMenu = document.querySelector(".mobileMenu");
const navbarMenu = document.querySelector(".navbarMenu");
const mainHeader = document.querySelector(".main-header");
const navbar = document.querySelector(".navbar");
const headerCart = document.querySelector(".header-cart");
const backDrop = document.querySelector(".backDrop");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
const productsDOM = document.querySelector(".productItem");
const cartTotalPrice = document.querySelector(".cartTotalPrice");
const cartItemsNumber = document.querySelector(".cartItemsNumber");
const modalContent = document.querySelector(".modalContent");
const clearCartBtn = document.querySelector(".clearCartBtn");
let cart = [];
let buttonsDom = [];

// get products
class Products {
  getProducts() {
    return productsData;
  }
}

// display Products

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<div class="product__item-wrapper">
      <div class="product__item">
        <div class="product__item-img" style="background-image:url('${item.imageUrl}');"></div>
        <div class="product__item-caption">
          <div class="product__item-info">
            <div class="product__item-price">${item.price} $</div>
          <div class="product__item-name">${item.title}</div>
          </div>
          <button class="product-btn addToCartBtn" data-id=${item.id}>Add to Cart</button>
        </div>
      </div>
    </div>`;
    });
    productsDOM.innerHTML = result;
  }

  getAddToCartBtns() {
    const addToCartBtns = [...document.querySelectorAll(".addToCartBtn")];
    buttonsDom = addToCartBtns;
    addToCartBtns.forEach((btn) => {
      const id = btn.dataset.id;
      // check if this product id is in cart or not
      const isInCart = cart.find((p) => p.id === parseInt(id));
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        //get product from products
        const addedProduct = { ...storage.getProduct(id), quantity: 1 };
        // add to cart

        cart = [...cart, addedProduct];
        // save cart to local storage
        storage.saveCart(cart);
        // update cart value
        this.setCartValue(cart);
        // add to cart item
        this.addCartItem(addedProduct);
        //get cart storage
      });
    });
  }

  addCartItem(cartItem) {
    modalContent.innerHTML += `<div class="modal__cart-item">
      <div class="modal__cart-img">
        <img src="${cartItem.imageUrl}" alt="">
      </div>
      <div class="modal__cart-caption">
        <span>${cartItem.title}</span>
        <p class="modal__cart-price">${cartItem.price} $</p>
      </div>
      
      <div class="modal__cart-counter">
        <i class='fas fa-angle-up count-up' data-id=${cartItem.id}></i>
        <span class="counter">${cartItem.quantity}</span>
        <i class='fas fa-angle-down count-down' data-id=${cartItem.id}></i>

      </div>
      <span class="modal__cart-remove" data-id=${cartItem.id}><i class='far fa-trash-alt'></i>
      </span>
    </div>`;
  }

  setCartValue(cart) {
    // cart items ->total numbers of items
    // cart total price
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);

    cartTotalPrice.innerText = `${totalPrice} $`;
    cartItemsNumber.innerText = tempCartItems;
  }

  setUpApp() {
    // get cart from storage;
    cart = storage.getCart() || [];
    // add cart item and show in modal
    cart.forEach((cartItem) => {
      this.addCartItem(cartItem);
    });

    // set values : total price and cart total numbers
    this.setCartValue(cart);
  }

  cartLogic() {
    clearCartBtn.addEventListener("click", (e) => this.clearCart());
  }

  clearCart() {
    cart.forEach((cItem) => this.removeItem(cItem.id));
    while (modalContent.children.length) {
      modalContent.removeChild(modalContent.children[0]);
    }
    modalClose();
  }

  removeItem(id) {
    cart = cart.filter((cItem) => cItem.id !== id);
    this.setCartValue(cart);
    storage.saveCart(cart);

    // get add to cart bins  => update text and disables
    this.getSingleButton(id);
  }

  getSingleButton(id) {
    const button = buttonsDom.find((btn) => parseInt(btn.dataset.id) == id);
    button.innerText = "Add To Cart";
    button.disabled = false;
  }
}

// storage

class storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart"));
  }
}

//events

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  // set up : get cart and set up app:
  ui.setUpApp();
  ui.displayProducts(productsData);
  storage.saveProducts(productsData);
  ui.getAddToCartBtns();
  ui.cartLogic();
});

mobileMenu.addEventListener("click", (e) => {
  navbarMenu.classList.toggle("show");
});

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    navbar.style.backgroundColor = "#693eb1";
    mainHeader.style.top = "0px";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
    mainHeader.style.top = "20px";
  }
};

headerCart.addEventListener("click", (e) => {
  backDrop.classList.add("back-drop--show");
  modal.classList.toggle("show-modal");
});

backDrop.addEventListener("click", (e) => {
  modalClose();
});

modalCloseBtn.addEventListener("click", (e) => {
  modalClose(backDrop);
});

// functions
function modalClose() {
  backDrop.classList.remove("back-drop--show");
  modal.classList.remove("show-modal");
}
