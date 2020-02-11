(function () {
  'use strict';

  document.querySelector('#isolationForm').onsubmit = onsubmit;

  /*
   * Déclenché lorsque l'utilisateur valide le formulaire
   * Vérifie la saisie du code psotal et de la surface
   */
  function onsubmit() {
    // Masquage des messages d'erreur
    toggleErrorMessage({ field: 'postCode', show: false }, { field: 'surface', show: false });

    const postCode = document.querySelector('#postCode').value;
    const surface = document.querySelector('#surface').value;

    if(!isPostalCodeValid(postCode)) {
      toggleErrorMessage({ field: 'postCode', show: true });
      return false; // Empêcher la validation du formulaire
    }

    if(!isSurfaceValid(surface)) {
      toggleErrorMessage({ field: 'surface', show: true });
      return false; // Empêcher la validation du formulaire
    }

    return true;
  }

  // Vérifie que le code postal est saisi et comporte 5 chiffres
  function isPostalCodeValid(postCode) {
    return !!postCode && !isNaN(postCode) && postCode.length == 5;
  }

  // Vérifie que la surface est saisie et située entre 1 et 10000
  function isSurfaceValid(surface) {
    return !!surface && !isNaN(surface) && surface >= 1 && surface <= 10000;
  }

  // Affiche ou masque le message d'erreur associé à un élément HTML
  // Exemple: { field: 'postCode', show: true } => afficher le champs dont l'id est postCode
  function toggleErrorMessage(...args) {
    args.forEach(arg => {
      const element = document.querySelector(`#error_${arg.field}`);
      element.style.visibility = !!arg.show ? 'visible' : 'hidden';
      element.setAttribute('aria-hidden', !arg.show);
    });
  }

})();
