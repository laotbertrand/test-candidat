// Form validation module
import * as _validation from './forms/_validation.js';
// Input type specific behavior
import * as _select from './forms/_select.js';
import * as _upload from './forms/_upload.js';
import * as _textarea from './forms/_textarea.js';
import * as _captcha from './forms/_captcha.js';

export class Formulaire {
	constructor(form) {

		this.validation = _validation;
		this.select = _select;
		this.upload = _upload;
		this.textarea = _textarea;
    this.captcha = _captcha;

		// Init input type specific behavior
		this.select.selectBehavior.call(this, form);
		this.upload.uploadBehavior.call(this, form);
		this.textarea.textareaBehavior.call(this, form);
    this.captcha.captchaBehavior.call(this, form);

		// Init form validation
		this.validation.formValidation.call(this, form);
	}
}
