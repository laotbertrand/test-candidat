export const polyfillFetch = () => {
  if( !self.fetch || typeof Promise === "undefined") {
    
    if( !lm.polyfillsLoading ) {
      lm.polyfillsLoading = [];
    }
    lm.polyfillsLoading.push({"name": "fetchPolyfill", "loaded": false});
    
    let scriptBlock = document.createElement('script');
    scriptBlock.src = "/lmfr-site/static/js/_fetch.js";
    scriptBlock.async = true;
    document.head.appendChild(scriptBlock);
    scriptBlock.addEventListener('load', e => {
      let polyfill;
      lm.polyfillsLoading.forEach(el=>{
        if(el.name==="fetchPolyfill") {
          polyfill = el;
        }
      });
      polyfill.loaded = true;
      document.dispatchEvent(new CustomEvent("fetchPolyfill"));
    });

  }
}


export const lmFetch = ( options = {} ) => {
  
  try {
    if( !options.url ) {
      throw new Error("Le param 'url' est obligatoire : Ex : {url: 'https://www.leroymerlin.fr'}") 
    }

    // Data object for fetch call
    let opt = {
        method: "GET",
        headers: {
            "Content-Type": "text/html",
            "Cache": "no-cache"
        },
        credentials: "same-origin"
    };
    for(let k in options) { 
      if( k != "url" && k != "callback" && k != "data" ) { opt[k] = options[k] }; 
    };

    // callback functions
    let callback = {
      success: options.success || (data => { console.log(data) }),
      error: options.error || (data => { console.log(data) }),
      complete: options.complete || (() => {})
    };

    // Query parameters
    let esc = encodeURIComponent;
    let query = (options.data)?Object.keys(options.data).map(k => `${esc(k)}=${esc(options.data[k])}`).join('&'):'';
    let url = (options.url.indexOf('?') >= 0)? `${options.url}&${query}`:`${options.url}?${query}`;

    fetch(url, opt)
      .then(response => {
        if(response.ok){ // vérifier que le code de statut est bien compris entre 200 et 299 inclus
          response.text().then(data => {
            callback.success(data);
            callback.complete();
          });
        } else {
          response.text().then(data => {
            callback.error(data);
            callback.complete();
          });  
        }
      })
      .catch(error => {
        callback.error(error)
        callback.complete();
      });
  }
  catch(e) {
    return false;
  }
}