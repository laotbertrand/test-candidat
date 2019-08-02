export let textareaBehavior = form => {
	let textareaList = form.querySelectorAll('textarea:not(.g-recaptcha-response)');
	
	lm.forEach(textareaList, textarea => {
		maxLengthCounter(textarea);
	});
}

// --------------------- CORE FUNCTIONS -- //
let maxLengthCounter = textarea => {
	if( !textarea.maxLength ) { return; }

	let remainingCharDiv = document.createElement('div');
	remainingCharDiv.classList.add('km-field__remaining-character')
	textarea.insertAdjacentElement('afterend', remainingCharDiv);

	lm.forEach(['keydown', 'mousedown'], eventType => {
		textarea.addEventListener(eventType, e => {
			setTimeout( () => {
				let remainingChar = getRemainingChar(textarea);
				if ( remainingChar >= 0 ) { 
					textarea.value = textarea.value.substring(0, textarea.maxLength)
				}
				remainingCharDiv.innerHTML = `${remainingChar} caractère${remainingChar > 1 ? 's' : ''} restant${remainingChar>1?'s':''}`;
			}, 16);

		});
	});
	textarea.dispatchEvent( new Event('keydown' ) );
}

// --------------------- UTILS -- //
let getRemainingChar = textarea => textarea.maxLength - textarea.value.length;