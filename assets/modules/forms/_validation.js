export let formValidation = form => {
	
	submitFormEvent__Form(form);
	invalidFormEvent__Form(form);
	clickButtonEvent__SubmitButton(form);
	focusInputEvent__Field(form);
	blurInputEvent__Field(form);
	changeCheckableEvent__Field(form);

	changeInputEvent__Criterion(form);
}


// --------------------- CORE FUNCTIONS -- //
let submitFormEvent__Form = form => {
	// Support Safari, iOS Safari, and the Android browser—each of which do not prevent
	// form submissions by default
	form.addEventListener( "submit", function( event ) {
        if ( !this.checkValidity() ) {
            event.preventDefault();
        }
    });
}

let invalidFormEvent__Form = form => {
	form.addEventListener( "invalid", e => {
		turnInvalid(e.target);
		e.preventDefault();
    }, true );
}

let clickButtonEvent__SubmitButton = form => {
	// Submit on reset tout les champs invalides
	let submitButton = form.querySelector( "button[type=submit], input[type=submit]" );
	submitButton.addEventListener( "click", e => {
		let inputs = form.querySelectorAll('.is-invalid:not(.km-field__criteria-list__item)');
		lm.forEach(inputs, field => {
			resetValidity(field)
		});
	});
}

let focusInputEvent__Field = form => {
	let fields = form.querySelectorAll('.km-field input, .km-field select, .km-field textarea');
	lm.forEach(fields, field => {
		field.addEventListener("focus", e => {
			resetValidity(field);
		});
	});
}

let blurInputEvent__Field = form => {
	let fields = form.querySelectorAll('.km-field input, .km-field select, .km-field textarea');
	lm.forEach(fields, field => {
		field.addEventListener("blur", e => {
			resetValidity(field);

			if( isTrimable(field) ) {
				field.value = field.value.trim();
			}
			
			if(field.checkValidity()) {
				
				if(field.matches('.js-input-criterion')) {
					if( field.nextElementSibling.querySelectorAll('.is-invalid').length > 0 ){
						turnInvalid(field);
						return;
					}
				}

				if( !isEmpty(field) ) {
					turnValid(field);
				}
			}

		});
		preValidThisField(field);
	});
}

let changeCheckableEvent__Field = form => {
	// Sur les listes de bouton radio
	let fields = form.querySelectorAll('.km-field input[type=radio], .km-field input[type=checkbox]');
	lm.forEach(fields, field => {
		field.addEventListener("change", e => {
			let a = lm.getClosest(field, ".km-field").querySelectorAll('input');
			lm.forEach(a, el => {
				el.dispatchEvent(new Event('blur', {'target': el }));
			})
		});
	});
}

let changeInputEvent__Criterion = form => {
	let inputsWithCriterion = form.querySelectorAll( ".js-input-criterion" );
	lm.forEach(inputsWithCriterion, input => {
		
		let criterionList = getCriterion(input);

		lm.forEach(['keyup', 'mouseup', 'change'], eventType => {
			input.addEventListener(eventType, e => {
				validCriterion(input, criterionList);
			});
		});
		input.dispatchEvent( new Event("change", {'target': input }) );
	});
}


// --------------------- UTILS -- //

let resetValidity = field => {
	field.classList.remove('is-valid', 'is-invalid');
	manageErrorMsg(field);
};
let preValidThisField = field => {
	if( !isEmpty(field) && !isRadio(field) && !isCheckbox(field) ) {
		if(field.checkValidity()) {
			turnValid(field);
		} else {
			turnInvalid(field);
		}
	}
}
let turnValid = field => {
	field.classList.remove('is-invalid');
	field.classList.add('is-valid');
	manageErrorMsg(field);
};
let turnInvalid = field => {
	field.classList.remove('is-valid');
	field.classList.add('is-invalid');
	manageErrorMsg(field);
};
let manageErrorMsg = field => {
	let fieldContainer = lm.getClosest(field, ".km-field");
	let errorMsg = fieldContainer.querySelector('.js-form-error');
	if( errorMsg ) {
		field.removeAttribute('aria-describedby');
		fieldContainer.removeChild(errorMsg);
	}


	if( field.matches('.js-input-criterion.is-invalid') ) {
		if( isEmpty(field)) {
			field.insertAdjacentHTML('afterend', makeError(field, "missing"));
		} else {
			field.insertAdjacentHTML('afterend', makeError(field, "mismatch"));
		}
		return;
	}

	if( field.matches('.is-invalid:not(.km-field__criteria-list__item)') ) {
		if( isEmpty(field) || isRadio(field) || isCheckbox(field) ) {
			fieldContainer.insertAdjacentHTML('beforeend', makeError(field, "missing"));
		} else {
			fieldContainer.insertAdjacentHTML('beforeend', makeError(field, "mismatch"));
		}
	}
};
let makeError = (field, errorType) => {
	let msg;
	if( isRadio(field) || isCheckbox(field) ) {
		msg = lm.getClosest(field, "ul").getAttribute(`data-${errorType}`);
	} else {
		msg = field.getAttribute(`data-${errorType}`);
	}
	// role alert ? only on blur ?
	field.setAttribute('aria-describedby', `${field.id}-error`);
	let tpl = `<p class="km-field__message ka-feedback ka-feedback--invalid js-form-error" id="{{=it.id}}-error">{{=it.msg}}</p>`;
	return lm.template(tpl, {"msg": msg, "id": field.id});
}


let getCriterion = field => {
	let criterion = lm.getClosest(field, '.km-field').querySelectorAll('.km-field__criteria-list li');
	let criterionList = [];
	lm.forEach(criterion, criteria => {
		let pattern = {
			"pattern": new RegExp( criteria.getAttribute('data-pattern')),
			"element": criteria
		}
		criterionList.push( pattern );
	});
	return criterionList;
}
let validCriterion = (field, criterionList) => {
	lm.forEach(criterionList, criteria => {
		let pattern = criteria.pattern;
		if( pattern.test( field.value ) ) {
			turnValid(criteria.element);
		} else {
			turnInvalid(criteria.element);
		}
	});
}


// --------------------- TEST -- //
let isEmpty = field => (field.value === "");
let isRadio = field => (field.type === "radio");
let isCheckbox = field => (field.type === "checkbox");
let isTrimable = field => (field.type === "text");