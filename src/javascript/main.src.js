
document.getElementById("nextFormButton").addEventListener("click", checkForm);

function checkForm() {

  // Reset input form (should be done at "focus" event)
  document.getElementById("cpFormWarningContainer").innerHTML = '';
  document.getElementById("surfaceFormWarningContainer").innerHTML = '';

  let cp = document.forms["comblesForm"]["cp"].value;
  let surface = document.forms["comblesForm"]["surface"].value;
  let errorFound = false;

  if (!cp) {
    document.getElementById("cpFormWarningContainer").innerHTML = 'Veuillez saisir le code postal';
    errorFound = true;
  } else if (cp.length < 5) {
    document.getElementById("cpFormWarningContainer").innerHTML = 'Le code postal doit être composé d\'au moins 5 chiffres';
    errorFound = true;
  }

  if (!surface) {
    document.getElementById("surfaceFormWarningContainer").innerHTML = 'Veuillez saisir la surface';
    errorFound = true;
  }

  if (!errorFound) {
    console.log('Le formulaire est prêt pour la soumission!');
  }
}
