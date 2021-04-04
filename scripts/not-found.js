
/* NAVBAR */
/* getting elements */
const navBar = document.querySelector('.js-navbar');
const header = document.querySelector('.js-header');
const menuBtn = document.querySelector('.js-hamburguer-btn');
const closeBtn = document.querySelector('.js-x-btn');

/* active item on navbar */
let navItem = document.querySelectorAll('.js-navbar-item');
navItem.forEach(item => {
  item.addEventListener('click', function() {
    navItem.forEach(navItem => navItem.classList.remove('navbar__item--active'));
    this.classList.add('navbar__item--active');
  });
});

/* scrolled menu */
window.onscroll = function() {
  if(window.pageYOffset > 80) {
    header.classList.add('header--scrolled');
    menuBtn.classList.add('hamburger-btn--scrolled');
    closeBtn.classList.add('x-btn--scrolled');

    if(!scrolled) {
      header.style.transform = 'translateY(-70px)';
    }
    setTimeout(function() {
      header.style.transform = 'translate(0)';
      scrolled = true;
    }, 500)
  } else {
    header.classList.remove('header--scrolled');
    menuBtn.classList.remove('hamburger-btn--scrolled');
    closeBtn.classList.remove('x-btn--scrolled');
    scrolled = false;
  }
};

/* click on hamburger menu */
function showMenu() {
  if (navBar.classList.contains('navbar', 'js-navbar')) {
    menuBtn.classList.add('hamburger-btn--clicked');
    closeBtn.classList.add('x-btn');
    closeBtn.classList.remove('x-btn--clicked');
    navBar.classList.remove('navbar');
    navBar.classList.add('navbar--mobile');
    disableScroll();
  } else {
    menuBtn.classList.remove('hamburger-btn--clicked');
    closeBtn.classList.remove('x-btn');
    closeBtn.classList.add('x-btn--clicked');
    navBar.classList.remove('navbar--mobile');
    navBar.classList.add('navbar');
    enableScroll();
  }
}

/* disable and enable srolling */
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.querySelector('html').scrollTop = window.scrollY;
}

function enableScroll() {
  document.body.style.overflow = null;
}
/* FETCHING DATA */
let i = 6;
const container = document.querySelector('.js-blogs');
const searchForm = document.querySelector('.js-search');
const loadMoreBtn = document.querySelector('.js-load-more');
const searchBtn = document.querySelector('.js-search-btn');
localStorage.setItem('OUTTERM', null);

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
  const outTerm = searchForm.term.value.trim();
  console.log(outTerm);
  localStorage.setItem('OUTTERM', outTerm);
  window.location.href="./index.html"; 
});
