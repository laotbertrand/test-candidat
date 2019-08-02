/** Fonction d'import de script asynchrone */
export let asyncImportScript = (src, defer = true) => {
    let scriptBlock = document.createElement('script');
    scriptBlock.src = src;
    if( defer ) {
    	scriptBlock.defer = true;
    } else {
    	scriptBlock.async = true;
    }
    document.body.appendChild(scriptBlock);
}