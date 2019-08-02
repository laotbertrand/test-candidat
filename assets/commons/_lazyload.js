import {asyncImportScript} from '../modules/_asyncImportScript';

/**
 * Detect IE browser
 * @const {boolean}
 * @private
 */
const isIE = typeof document !== 'undefined' && document.documentMode;
const defaultConfig = {
  rootMargin: '100px',
  threshold: 0,
  load(element) {
    if (element.nodeName.toLowerCase() === 'picture') {
      const img = document.createElement('img');
      if (isIE && element.getAttribute('data-iesrc')) {
        img.src = element.getAttribute('data-iesrc');
      }
      if (element.getAttribute('data-alt')) {
        img.alt = element.getAttribute('data-alt');
      }
      if (element.getAttribute('data-class')) {
        img.classList.add(element.getAttribute('data-class'));
      }
      element.appendChild(img);
    }
    if (element.getAttribute('data-src'))
      element.src = element.getAttribute('data-src');
    
    if (element.getAttribute('data-srcset'))
      element.setAttribute('srcset', element.getAttribute('data-srcset'));
    
    if (element.getAttribute('data-background-image'))
      element.style.backgroundImage = `url('${element.getAttribute('data-background-image')}')`;

    if (element.getAttribute('data-src-content')) {
      const loadContentEvent = new CustomEvent('contentLoading');
      document.dispatchEvent(loadContentEvent);
    }
    
  },
  loaded() {}
};

/**
 * Add lazy-loaded class when element was loaded
 * @param {*} element 
 */
function markAsLoaded(element) {
  element.classList.add('lazy-loaded');
  element.classList.remove('lazy');
}

const isLoaded = element => element.getAttribute('data-loaded') === 'true';

const onIntersection = (load, loaded) => (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0 || entry.isIntersecting) {
      observer.unobserve(entry.target);

      if (!isLoaded(entry.target)) {
        load(entry.target);
        markAsLoaded(entry.target);
        loaded(entry.target);
      }
    }
  });
};

const getElements = (selector, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }
  if (selector instanceof NodeList) {
    return selector;
  }
  return root.querySelectorAll(selector);
};

function lazyLoad (selector, options = {}) {
  const {root, rootMargin, threshold, load, loaded} = Object.assign({}, defaultConfig, options);
  let observer;

  if (typeof window !== 'undefined' && window.IntersectionObserver) {
    observer = new IntersectionObserver(onIntersection(load, loaded), {
      root,
      rootMargin,
      threshold
    });
  } else {
    asyncImportScript('/static/polyfill/common/_intersectionObserver.js');
  }

  return {
    observe() {
      const elements = getElements(selector, root);
      for (let i = 0; i < elements.length; i++) {
        if (isLoaded(elements[i])) {
          continue;
        }
        if (observer) {
          observer.observe(elements[i]);
          continue;
        }
        load(elements[i]);
        markAsLoaded(elements[i]);
        loaded(elements[i]);
      }
    },
    triggerLoad(element) {
      if (isLoaded(element)) {
        return;
      }

      load(element);
      markAsLoaded(element);
      loaded(element);
    },
    observer
  };
}

export const init = lazyLoad;