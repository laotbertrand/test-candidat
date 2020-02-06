(function () {
  'use strict';

  document.querySelector('#isolationForm').onsubmit = onsubmit;

  function onsubmit() {
    toggleErrorMessage({ field: 'postCode', show: false }, { field: 'surface', show: false });

    const postCode = document.querySelector('#postCode').value;
    const surface = document.querySelector('#surface').value;

    if(!isPostalCodeValid(postCode)) {
      toggleErrorMessage({ field: 'postCode', show: true });
      return false;
    }

    if(!isSurfaceValid(surface)) {
      toggleErrorMessage({ field: 'surface', show: true });
      return false;
    }

    return true;
  }

  function isPostalCodeValid(postCode) {
    return !!postCode && !isNaN(postCode) && postCode.length == 5;
  }

  function isSurfaceValid(surface) {
    return !!surface && !isNaN(surface) && surface >= 1 && surface <= 1000;
  }

  function toggleErrorMessage(...args) {
    args.forEach(arg => {
      const element = document.querySelector(`#error_${arg.field}`);
      element.style.display = !!arg.show ? 'block' : 'none';
      element.setAttribute('aria-hidden', !arg.show);
    });
  }

})();
