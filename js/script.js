let NAV_IS_FIXED = false;
let NAV_IS_OPEN = false;

const pageTitle = document.querySelector('.page-title');
const pageTitleLink = document.querySelector('.page-header > a');
const pageNav = document.querySelector('.page-nav');
const navLink = pageNav.querySelectorAll('a');
const btnToggleNav = document.querySelector('.btn-toggle-nav');
const iconMenu = document.querySelector('.icon-menu');
const downArrow = document.querySelector('.down-arrowhead');

pageTitleLink.addEventListener('click', () => {
  navLink.forEach(link => {
    document.body.style.position = 'fixed';
    link.removeAttribute('aria-current');
  });
  pageNav.querySelector('a[href="#home"]').setAttribute('aria-current', 'page');
  pageTitle.querySelector('span:last-child').classList.remove('___none');
  document.body.style.position = 'static';
});

downArrow.addEventListener('click', () => {
  navLink.forEach(link => {
    link.removeAttribute('aria-current');
  });
  pageNav.querySelector('a[href="#bio"]').setAttribute('aria-current', 'page');
  pageTitle.querySelector('span:last-child').classList.add('___none');
});

navLink.forEach(link => {
  if (link.hash === '#home') {
    pageTitle.querySelector('span:last-child').classList.remove('___none');
    link.setAttribute('aria-current', 'page');
  }
});

// herlaadt pagina bij draaien
screen.orientation.addEventListener('change', () => {
  document.location.reload();
});

// intersectionObserver maakt navigatie fixed
let navigationObserver = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.y < 0) {
    pageNav.classList.add('___sticky');
    NAV_IS_FIXED = true;
  } else {
    pageNav.classList.remove('___sticky');
    NAV_IS_FIXED = false;
  }
});
navigationObserver.observe(document.querySelector('#navigation-observer-nav'));

// Voor de responsieve header homeObserver
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;
  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}

let fontSize = window.getComputedStyle(pageTitle).getPropertyValue('font-size');
fontSize = fontSize.substring(0, fontSize.length - 2);
const options = {
  root: null,
  threshold: buildThresholdList()
};

let homeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (fontSize * entry.intersectionRatio <= 48) {
      pageTitle.style.fontSize = '48px';
    } else {
      pageTitle.style.fontSize = (fontSize * entry.intersectionRatio).toString() + 'px';
    }
    if (entry.intersectionRatio < 0.9) {
      downArrow.classList.add('___hidden');
      downArrow.classList.add('___none');
    }
    if (entry.intersectionRatio >= 0.95) {
      downArrow.classList.remove('___none');
      downArrow.classList.remove('___hidden');
    }
  });
}, options);
homeObserver.observe(document.querySelector('.home'));


function toggleNav() {
  if (getComputedStyle(pageNav).getPropertyValue('left') !== '0px') {
    return;
  }
  if (NAV_IS_OPEN) {
    pageNav.classList.remove('___slide-in');
    iconMenu.classList.remove('close-menu');
    iconMenu.classList.add('open-menu');
    NAV_IS_OPEN = false;
  } else {
    pageNav.classList.add('___slide-in');
    iconMenu.classList.add('close-menu');
    iconMenu.classList.remove('open-menu');
    // document.body.style.position = 'fixed';
    NAV_IS_OPEN = true;
  }
}

function setLinkActive(event) {

}

btnToggleNav.addEventListener('click', toggleNav);
pageNav.addEventListener('click', toggleNav);

window.addEventListener('hashchange', () => {
  navLink.forEach(link => {
    link.removeAttribute('aria-current');
    if (link.hash === document.location.hash) {
      link.setAttribute('aria-current', 'page');
    }
  });
  if (document.location.hash !== '#home') {
    pageTitle.querySelector('span:last-child').classList.add('___none');
  }
  if (document.location.hash === '#home') {
    console.log('home');
    pageTitle.querySelector('span:last-child').classList.remove('___none');
  }
})

const photos = [
  {
    index: 1,
    imgName: '1988-dj-piggel-flash-1@0.5x.webp'
  },
  {
    index: 2,
    imgName: '2005 DJ-Piggel-02@0.5x.webp'
  },
  {
    index: 3,
    imgName: '2014 DJ Piggel-2@0.5x.webp'
  },
  {
    index: 4,
    imgName: '2014 foto  gemaakt door Marleen@0.5x.webp'
  },
  {
    index: 5,
    imgName: '2015 DJ Piggel bw@0.5x.webp'
  },
  {
    index: 6,
    imgName: '2015 DJ Piggel-1@0.5x.webp'
  },
];

const carouselFirst = document.querySelector('.carousel-item.first');
const carouselMain = document.querySelector('.carousel-item.main');
const carouselLast = document.querySelector('.carousel-item.last');

carouselFirst.style.backgroundImage = `url( /assets/photos/${photos[0].imgName} )`;
carouselMain.style.backgroundImage = `url( /assets/photos/${photos[1].imgName} )`;
carouselLast.style.backgroundImage = `url( /assets/photos/${photos[2].imgName} )`;
