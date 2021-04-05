/* Java Script for details page, whole article */
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
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.js-whole-article');

/* GETTING THE FAVORITES IDS */
function getFavoritesIds() {
  /* localStorage.removeItem('FAVORITESIDS'); */
  let favoritesIds = localStorage.getItem('FAVORITESIDS');
  if (favoritesIds === null) favoritesIds = [];
  localStorage.setItem('FAVORITESIDS', favoritesIds + JSON.stringify(id));
  const star = document.querySelector('.js-star');
  star.classList.add('star--clicked');
}

const renderDetails = async () => {
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  const post = await res.json();
  
  const template = `
    <div class="whole-post">
      <div class="star js-favorites" onclick="getFavoritesIds()">
        <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="star__img js-star"fill-rule="evenodd" clip-rule="evenodd" d="M16 6.20038C16 6.38185 15.875 6.55325 15.75 6.68431L12.2596 10.2533L13.0865 15.2943C13.0962 15.3648 13.0962 15.4253 13.0962 15.4959C13.0962 15.758 12.9808 16 12.7019 16C12.5673 16 12.4327 15.9496 12.3173 15.879L8 13.4997L3.68269 15.879C3.55769 15.9496 3.43269 16 3.29808 16C3.01923 16 2.89423 15.758 2.89423 15.4959C2.89423 15.4253 2.90385 15.3648 2.91346 15.2943L3.74038 10.2533L0.240385 6.68431C0.125 6.55325 0 6.38185 0 6.20038C0 5.89792 0.298077 5.77694 0.538462 5.73661L5.36538 5.00063L7.52885 0.413359C7.61538 0.221802 7.77885 0 8 0C8.22115 0 8.38462 0.221802 8.47115 0.413359L10.6346 5.00063L15.4615 5.73661C15.6923 5.77694 16 5.89792 16 6.20038Z" fill="#B4C2D3"/>
        </svg>
      </div>
      <h1 class="whole-post__title">${post.title}</h1>
      <p class="whole-post__synopsis">${post.sinopsys}</p>
      <div class="post__author">
        <div class="post__author-info">
          <img class="post__author-photo" src="${post.author.photo}" alt="article photo" role="img"/>
          <div class="post__author-text">
          <p class="post__author-name" role="text">${post.author.name}</p>
          <p class="post__date" role="text">Published on ${post.pubDate}</p>
          </div>
        </div>
        <div class="post__author-social">
          <p class="social-words">share</p>
          <div class="social-logos">
            <a class="social-link">
              <img class="social__img" role="img" src="./images/instagram.svg" alt="instagram logo"/>
            </a>
            <a class="social-link">
              <img class="social__img" role="img" src="./images/facebook.svg" alt="facebook logo"/>
            </a>
            <a class="social-link">
              <img class="social__img" role="img" src="./images/twitter.svg" alt="twitter logo"/>
            </a>
          </div>
        </div>
      </div>
      <div class="post__img">
        <img class="post__img-item" src="${post.img.picture}" alt="article photo" role="img"/>
        <p class="post__img-reference">${post.img.reference}</p>
      </div>
      <p class="post__content" role="text">${post.content}</p>
    </div>
  `
  container.innerHTML = template;
}



window.addEventListener('DOMContentLoaded', () => renderDetails());
