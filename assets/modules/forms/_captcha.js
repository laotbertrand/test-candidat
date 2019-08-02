import { asyncImportScript } from "../_asyncImportScript.js";

export let captchaBehavior = form => {
  if (form.querySelector('.js-g-recaptcha') && !document.getElementById('google_captcha')) {
    asyncImportScript('https://www.google.com/recaptcha/api.js');
  }
};