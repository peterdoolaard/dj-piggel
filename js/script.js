let NAV_IS_FIXED = false;
let NAV_IS_OPEN = false;

pageNav = document.querySelector('.page-nav');
btnToggleNav = document.querySelector('.btn-toggle-nav');
iconMenu = document.querySelector('.icon-menu');

// intersectionObserver maakt navigatie fixed
let navigationObserverNav = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.y < 0) {
    pageNav.classList.add('___fixed');
    NAV_IS_FIXED = true;
  } else {
    pageNav.classList.remove('___fixed');
    NAV_IS_FIXED = false;
  }
});
navigationObserverNav.observe(document.querySelector('#navigation-observer-nav'));

function toggleNav() {
  console.log(getComputedStyle(pageNav).getPropertyValue('left'))
  if (getComputedStyle(pageNav).getPropertyValue('left') !== '0px') {
    return
  }
  if (NAV_IS_OPEN) {
    pageNav.classList.remove('___slide-in');
    iconMenu.classList.remove('close-menu');
    iconMenu.classList.add('open-menu');
    document.body.style.position = 'static';
    NAV_IS_OPEN = false;
  } else {
  pageNav.classList.add('___slide-in');
    iconMenu.classList.add('close-menu');
    iconMenu.classList.remove('open-menu');
    document.body.style.position = 'fixed';
    NAV_IS_OPEN = true;
  }
}

btnToggleNav.addEventListener('click', toggleNav);
pageNav.addEventListener('click', toggleNav);
