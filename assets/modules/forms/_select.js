const SPACE  = 32;
const ESCAPE = 27;
const TAB	 = 9;

export let selectBehavior = form => {
	let selectList = form.querySelectorAll('.js-select-wrapper__input');
	lm.forEach(selectList, select => {
		selectArrowBehavior(select);
		selectFocusBehavior(select);
	});
}

let selectArrowBehavior = select => {
	
	lm.forEach(['click', 'keydown'], eventType => {
		select.addEventListener(eventType, e => {
			if(e.keyCode){
				if(e.keyCode !== SPACE){
					return;
				}
			}
			if(select.classList.contains('is-open')){
				select.classList.remove('is-open');
			}else{
				select.classList.add('is-open');
			}
		})
	});
	lm.forEach(['change', 'blur', "keydown"], eventType => {
		select.addEventListener(eventType, e => {
			if(e.keyCode){
				if(e.keyCode !== ESCAPE && e.keyCode !== TAB){
					return;
				}
			}
			select.classList.remove('is-open');
		})
	});
	
}
let selectFocusBehavior = select => {
	const selectWrapper = select.parentNode;
	if(!selectWrapper.classList.contains('js-select-wrapper')){
		return;
	}
	select.addEventListener('focus', () => {
		selectWrapper.classList.add('is-focus');
	})
	select.addEventListener('focusout', () => {
		selectWrapper.classList.remove('is-focus');
	})
}