export let activeModules = [];
export let kobiEvents = {
  'addPanier': {
    'async': true,
    'description': 'Ajout d\'un article au panier',
    'data': [ 'count' ]
  },
  'context': {
    'async': false,
    'description': 'Changement du magasin de contextualization',
    'data': [ 'idMag' ]
  },
  'componentTcVarsReady': {
    'async': false,
    'description': 'Fired lorsque les données CommandersAct du composant sont prêtes pour envoi',
    'data': [ 'tcvars' ]
  },
  'userInfoAvailable': {
    'async': true,
    'description': 'Fired lorsque les données clients de l\'internaute sont disponible (retour API ou cache)',
    'data': [ 'userInfo' ]
  },
  'selectedFilters': {
        'async': true,
        'description': 'Fired lorsque l\'utilisateur sélectionne un filtres dans les pages famille produits',
        'data': [ 'filters' ]
  }
};

export class Composant {
  constructor(id, noHTML = false) {
    // On teste si l'attirbut noHTML est passé en paramètre à true, si c'estle cas, c'est un composant non visuel (Commandersact...)
    if(!noHTML) {
      // On récupère toutes les sections qui ont cet ID
      let modulesKobi = document.querySelectorAll(`[id^=component-${id}], header[id^=${id}], footer[id^=${id}]`);

      // On Boucle dans chaque élément trouvé
      // --> Il est possible d'avoir plusieurs composants identiques ( produits-complementaire-1, produits-complementaire-2, ... )
      for (var i = 0; i < modulesKobi.length; i++) {

        // On vérifie si cet élément en particulier a déjà été instancié
        let alreadyExist = false;
        for (var j = activeModules.length - 1; j >= 0; j--) {
          if( activeModules[j].id == modulesKobi[i].id ) {
            alreadyExist = true;
          }
        }

        // Si cette section n'est pas encore init, on le fait
        if( !alreadyExist ) {
          this.target = modulesKobi[i];
          this.id = modulesKobi[i].id;
          break;
        }
      }

      // Si on a pas trouvé de composant HTML correspondant
      if ( !this.target ) {
        throw Error(`Le module <${id}> n'existe pas dans la page ou a déjà été instancié.`)
      }

      // On documente la liste des modules instanciés
      // activeModules.push(this);
      activeModules.push({ "id": this.id, "target": this.target });

      if (performance.mark !== undefined) {
        performance.mark(`Component ${id} ready`);
      }
      console.log(`Le module <${id}> a été instancié.`);
    }

    // On ajoute à l'instance les fonctions d'events
    for( let event in kobiEvents ) {
      addLMEvent.call(this, event);
    }

    // Les éléments spécifiques à un site peuvent être injecté dans le constructeur via cette méthode
    // `Composant.prototype.customExtend = function(){...}`
    if( this.customExtend ) {
      this.customExtend.call(this);
    }




  }
}

const addLMEvent = function(eventName) {

    let async = kobiEvents[eventName].async;
    let dataValidation = kobiEvents[eventName].data;

    this[eventName] = (data) => {

      // Validation des paramètres obligatoire
      for (var i = 0; i < dataValidation.length; i++) {
        if ( typeof data[dataValidation[i]] === 'undefined' ) {
          console.error(`Le param <${dataValidation[i]}> est manquant`);
          return;
        }
      }

      // Création de l'événement
      data.emitterId = this.id;
      let event = new CustomEvent(
        eventName,
        { detail: data }
      );

      // Gestion sync/async
      if(async) {
        setTimeout( () => {
          document.dispatchEvent(event);
        }, 1);
      } else {
        document.dispatchEvent(event);
      }
    };

    // la fonction est une CONST
    Object.defineProperty(this, eventName, {writable:false});
}