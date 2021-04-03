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

const renderDetails = async () => {
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  const post = await res.json();
  
  const template = `
    <div class="whole-post">
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
