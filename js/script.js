let NAV_IS_FIXED = false;
let NAV_IS_OPEN = false;

const pageTitle = document.querySelector('.page-title');
const pageTitleLink = document.querySelector('.page-header > a');
const pageNav = document.querySelector('.page-nav');
const navLink = pageNav.querySelectorAll('a');
const btnToggleNav = document.querySelector('.btn-toggle-nav');
const iconMenu = document.querySelector('.icon-menu');

pageTitleLink.addEventListener('click', () => {
  navLink.forEach(link => {
    link.removeAttribute('aria-current');
  });
  pageNav.querySelector('a[href="#home"]').setAttribute('aria-current', 'page')
})
navLink.forEach(link => {
  if (link.hash === "#home") {
    link.setAttribute('aria-current', 'page')
  }
});

// herlaadt pagina bij draaien
screen.orientation.addEventListener('change', () => {
  document.location.reload()
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

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;
  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
let fontSize = window.getComputedStyle(pageTitle).getPropertyValue('font-size')
fontSize = fontSize.substring(0,fontSize.length - 2);
const options = {
  root: null,
  threshold: buildThresholdList()
}

let homeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (fontSize * entry.intersectionRatio <= 48) {
        pageTitle.style.fontSize = '48px';
      } else {
        pageTitle.style.fontSize = (fontSize * entry.intersectionRatio).toString() + 'px';
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

function setLinkActive(event) {
  navLink.forEach(link => {
    link.removeAttribute('aria-current');
    event.target.setAttribute('aria-current', 'page');
  })
}

btnToggleNav.addEventListener('click', toggleNav);
pageNav.addEventListener('click', toggleNav);
navLink.forEach(link => link.addEventListener('click', setLinkActive));


window.onSpotifyIframeApiReady = (IFrameAPI) => {
  let element = document.getElementById('embed-iframe');
  let options = {
    uri: 'spotify:5pEvgjKVb9ZTn8nZCSbaXx?si=8z7aUenaRyG0j8EOXl_CNQ'
  };
  let callback = (EmbedController) => {
  };
  IFrameAPI.createController(element, options, callback);
};

