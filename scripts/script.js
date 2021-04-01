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
function loadMore() {
  i += 3;
  renderPosts();
  
}
const renderPosts = async (term) => {
  let uri = `http://localhost:3000/posts?_limit=${i}`;
  if (term) {
    uri += `&q=${term}`;
  }
  const res = await fetch(uri);
  const posts = await res.json();
  if (i > posts.length) {
    loadMoreBtn.classList.add('load-more--disable');
  }
  let template = '';
  posts.forEach(post => {
    template += `
      <div class="post" role="card" onclick="linkToArticle()">
        <div class="post__img">
          <img class="post__img-item" src="${post.img}" alt="article photo" role="img"/>
        </div>
        <div class="post__body">
          <h3 class="post__title" role="text">${post.title}</h3>
          <p class="post__content role="text">${post.content.slice(0, 80)}...</p>
          <div class="post__author">
            <img class="post__author-photo" src="${post.author.photo}" alt="article photo" role="img"/>
            <p class="post__author-name" role="text">${post.author.name}</p>
            <p class="post__date" role="text">${post.pubDate}</p>
          </div>
        </div>
      </div>
    `
  });
  container.innerHTML = template;
}
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());

