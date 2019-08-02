let _this;
export let uploadBehavior = function(form){
	_this = this;
	let uploadList = form.querySelectorAll('.js-input-upload');
	
	lm.forEach(uploadList, upload => {
		uploadFile(upload);
	});
}

// --------------------- CORE FUNCTIONS -- //
let uploadFile = function(upload) {
	upload.addEventListener('change', e => {
		_this.upload.processUploadedFiles(upload);
	});
}

export let processUploadedFiles = upload => {

	let field = lm.getClosest(upload, ".km-field");
	let wrapper = lm.getClosest(upload, ".km-field__wrapper");
	let hiddenValues = upload.nextElementSibling;
	let sizeLimit = upload.dataset.size;
	let allowedTypes = upload.accept;
	let isMultiple = upload.getAttribute('multiple');

	let fileTable = [];
	let miniatureList = "";
	let fileList = upload.files;
	
	lm.forEach(fileList, file => {

		if( !isSizeValid(file.size, sizeLimit) ){
			console.error('Un fichier uploadé est trop lourd')
			return;
		}
		if( !isTypeValid(file.type, allowedTypes) ){
			console.error('Un fichier uploadé ne correspond pas au format attendu')
			return;
		}
		fileTable.push(file.name);
		miniatureList += generateThumbnail(file, upload);
	});

	if( fileTable.length === 0 ) {
		upload.value = "";
	}

	if( hiddenValues ) {
		hiddenValues.value = fileTable.join(',');
	}

	let miniatureListUl = field.querySelector('.js-field__miniatures');
	if( miniatureListUl ) {
		field.removeChild(miniatureListUl);
	} 
	wrapper.insertAdjacentHTML('beforebegin', `<ul class="js-field__miniatures">${miniatureList}</ul>`);
	clickButtonEvent__Delete(field, upload, hiddenValues);

	upload.dispatchEvent(new Event('blur', {'target': upload }));
}

// --------------------- UTILS -- //

let thumbnailTemplate = `
<li class="km-field__miniature" data-value="{{=it.name}}">
	<img src="{{=it.src}}" class="km-field__miniature__image"> 
	<span class="km-field__miniature__name">{{=it.name}}</span>
	<button class="km-field__miniature__delete">
		<svg class="icon-24">
			<use xlink:href="#Navigation_Publish_Delete_24px" href="#Navigation_Publish_Delete_24px"></use>
		</svg>
	</button>
</li>
`;

let generateThumbnail = (file, upload) => {

	let tplData = {
		"src": window.URL.createObjectURL(file),
		"name": file.name
	}

	return lm.template(thumbnailTemplate, tplData);
}
let clickButtonEvent__Delete = (fieldContainer, field, hiddenValues) => {
	let miniatures = fieldContainer.querySelector('.js-field__miniatures');
	miniatures.delegateEvent('click', '.km-field__miniature', e => {
		hiddenValues.value = hiddenValues.value.split(',').filter(file => file != e.target.dataset.value ).join(',');
		miniatures.removeChild(e.target);
		if(hiddenValues.value === "") {
			field.value = "";
		}
	});
}


/**
 * 
 * @param {number} size : Poids du fichier en octets
 */
let convertToKo = size => Math.round(size / 1024);


// --------------------- TEST -- //
/**
 * 
 * @param {number} fileSize : Poids du fichier en octets
 * @param {number} sizeLimit : Valeur en ko de l'attribut data-size present sur l'input[type=file]
 */
let isSizeValid = (fileSize, sizeLimit) => convertToKo(fileSize) <= sizeLimit;

/**
 * 
 * @param {string} fileType : Type du fichier uploadé
 * @param {string} allowedTypes : Liste des types accepté (champs accept)
 */
let isTypeValid = (fileType, allowedTypes) => allowedTypes.indexOf(fileType) >= 0;