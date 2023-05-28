let NAV_IS_OPEN = false;

const home = document.querySelector('#home');
const pageTitle = document.querySelector('.page-title');
const pageTitleLink = document.querySelector('.page-header > a');
const pageNav = document.querySelector('.page-nav');
const navLink = pageNav.querySelectorAll('a');
const btnToggleNav = document.querySelector('.btn-toggle-nav');
const iconMenu = document.querySelector('.icon-menu');
const downArrow = document.querySelector('.down-arrowhead');
const cardImage = document.querySelectorAll('.card');

pageTitleLink.addEventListener('click', () => {
  navLink.forEach(link => {
    link.removeAttribute('aria-current');
  });
  pageNav.querySelector('a[href="#home"]').setAttribute('aria-current', 'page');
  pageTitle.querySelector('span:last-child').classList.remove('___none');
  home.scrollIntoView({behavior: "smooth"});
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

// herlaad pagina bij draaien
if (screen.orientation) {
screen.orientation.addEventListener('change', () => {
  document.location.reload();
});
} else {
  window.addEventListener('resize', () => {
    document.location.reload();
  })
}

// intersectionObserver maakt navigatie fixed
// let navigationObserver = new IntersectionObserver(entries => {
//   if (entries[0].boundingClientRect.y < 0) {
//     pageNav.classList.add('___sticky');
//     NAV_IS_FIXED = true;
//   } else {
//     pageNav.classList.remove('___sticky');
//     NAV_IS_FIXED = false;
//   }
// });
// navigationObserver.observe(document.querySelector('#navigation-observer-nav'));

// IntersectionObserver voor de koppeling tussen secties en navigatie

// TODO


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
    NAV_IS_OPEN = true;
  }
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
    pageTitle.querySelector('span:last-child').classList.remove('___none');
  }
})

const photos = [
  {
    index: 1,
    imgName: 'dj-piggel-001@0.5x.webp',
    imgNameHi: 'dj-piggel-001.webp'
  },
  {
    index: 2,
    imgName: 'dj-piggel-002@0.5x.webp',
    imgNameHi: 'dj-piggel-002.webp'
  },
  {
    index: 3,
    imgName: 'dj-piggel-003@0.5x.webp',
    imgNameHi: 'dj-piggel-003.webp'
  },
  {
    index: 4,
    imgName: 'dj-piggel-004@0.5x.webp',
    imgNameHi: 'dj-piggel-004.webp'
  },
  {
    index: 5,
    imgName: 'dj-piggel-005@0.5x.webp',
    imgNameHi: 'dj-piggel-005.webp'
  },
  {
    index: 6,
    imgName: 'dj-piggel-006@0.5x.webp',
    imgNameHi: 'dj-piggel-006.webp'
  },
  {
    index: 7,
    imgName: 'dj-piggel-008.webp',
    imgNameHi: 'dj-piggel-008.webp'
  },
  {
    index: 8,
    imgName: 'dj-piggel-009.webp',
    imgNameHi: 'dj-piggel-009.webp'
  },
  {
    index: 9,
    imgName: 'dj-piggel-010.webp',
    imgNameHi: 'dj-piggel-010.webp'
  },
  {
    index: 10,
    imgName: 'dj-piggel-011@0.5x.webp',
    imgNameHi: 'dj-piggel-011.webp'
  },
  {
    index: 11,
    imgName: 'dj-piggel-012@0.5x.webp',
    imgNameHi: 'dj-piggel-012.webp'
  },
{
    index: 12,
    imgName: 'dj-piggel-013@0.5x.webp',
    imgNameHi: 'dj-piggel-013.webp'
  },
{
    index: 13,
    imgName: 'dj-piggel-014@0.5x.webp',
    imgNameHi: 'dj-piggel-014.webp'
  },
];

// initialize carousel
const photosSection = document.getElementById('photos')
const imageElement = document.querySelector('.carousel-item img');
const imageModal = document.querySelector('.carousel-modal');
const btnCloseModal = imageModal.querySelector('.btn-close');
const imageModalImage = imageModal.querySelector('img');
let image = photos[11]; // index of first image to be shown
let index = image.index;
let imageSrc = `assets/photos/${image.imgName}`;
let imageSrcHi = `assets/photos/${image.imgNameHi}`;
imageElement.src = imageSrc;

const previous = document.querySelector('.previous');
const next = document.querySelector('.next');

function showPrevious () {
  index --;
  if (index <= 0) {
    index = photos.length
  }
    image = photos[index - 1];
    imageSrc = `assets/photos/${image.imgName}`;
    if (image.imgNameHi) {
      imageSrcHi = `assets/photos/${image.imgNameHi}`;
    }
    imageElement.src = imageSrc;
}

function showNext () {
  index ++;
  if (index > photos.length) {
    index = 1;
  }
    image = photos[index - 1];
    imageSrc = `assets/photos/${image.imgName}`;
    if (imageSrcHi) {
      imageSrcHi = `assets/photos/${image.imgNameHi}`;
    }
    imageElement.src = imageSrc;
}

function showModal () {
  imageModalImage.src = imageSrcHi;
  imageModal.classList.add('___show');
}

function closeModal () {
  imageModalImage.src= '';
  imageModal.classList.remove('___show');
  photosSection.focus();
}

previous.addEventListener('click', showPrevious);
next.addEventListener('click', showNext);
imageElement.addEventListener('click', showModal);
btnCloseModal.addEventListener('click', closeModal);
imageModalImage.addEventListener('click', closeModal);

photosSection.addEventListener('keyup', event => {
  console.log(event)
  if (event.key === 'ArrowRight') {
    showNext();
  } else if (event.key === 'ArrowLeft') {
    showPrevious()
  }
})


cardImage.forEach(card => card.addEventListener('click', (event) => {
  imageModalImage.src = event.target.dataset.imgHires;
  imageModal.classList.add('___show');
}));
