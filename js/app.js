const mobileMenu = document.querySelector(".mobileMenu");
const navbarMenu = document.querySelector(".navbarMenu");
const mainHeader = document.querySelector(".main-header");
const navbar = document.querySelector(".navbar");
const headerCart = document.querySelector(".header-cart");
const backDrop = document.querySelector(".backDrop");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
//events

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
    modalClose(e.target);
});

modalCloseBtn.addEventListener("click", (e) => {
    modalClose(backDrop);
});


// functions
function modalClose(target) {
    target.classList.remove("back-drop--show");
    modal.classList.toggle("show-modal");
}
