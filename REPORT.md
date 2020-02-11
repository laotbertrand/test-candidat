# Compte rendu test

Bonjour Bertrand,
voici donc le compte-rendu de mon test pour cette journée du 6 février.

Je trouve le sujet très complet. Il permet d'être aborder par plusieurs angles et je dirai que c'est toute sa force. Au départ, c'est assez perturbant car lorsqu'on le découvre, on ne sait trop par où commencer.

D'ailleurs, merci pour le déroulement type qui est dans le README. Ca aide à canaliser et à savoir par où commencer. Toutefois je n'ai pas respecté l'ordre proposé, et suivi le suivant :

- 9:00 - 10:00 : Clonage du repo en local, lecture du README.md, repérage des éléments mis à disposition comme les scss et le build.
- 10:00 - 12:00 : Réalisation du module 6 - conception Javascript
- 13:00 - 17:00 : Réalisation de la phase obligatoire et du module 4 - Accessibilité
- 17:00 - 18:00 : Prise de recul sur le travail fourni, alimentation du REPORT.md et tests

Je te propose donc d'aborder chaque moment dans l'ordre :


## Modification du process de build
Avant de commencer, j'ai étudié le process de build et de watch avec rollup et je me suis permis simplement d'ajouter le plugin **rollup-plugin-browsersync** pour utiliser BrowserSync. BrowserSync permet de lancer un serveur de dev et de rafraîchir la page automatiquement lorsqu'il y a une modification de code.
J'ai eu le temps de l'intégrer pour la partie JS, mais je ne l'ai pas fait pour la partie CSS.

Dans le process rollup, j'ai également le plugin **rollup-copy** qui copie automatiquement le fichier index.html du dossier src/ vers le dossier target/.

C'est la première fois que j'ai eu affaire à Rollup. Je connaissais déjà Grunt (de nom), Gulp et Webpack.

## Choix du module 6 : Conception Javascript

Etant développeur fullstack à la base, j'ai choisi ce module étant donné que je suis plutôt à l'aise en développement Javascript (Actuellement je travaille sur un stack Angular, donc avec Typescript).

J'ai directement écrit le code que j'ai imaginé pour traiter le besoin demandé plutôt que de l'écrire de manière algorithmique.
- La classe **Question** représente une question (numéro, titre et réponses possibles)
- La classe **Survey** permet de démarrer le sondage, passer à la question suivante et enfin afficher le résultat

J'ai trouvé les fonctions utilitaires du Common et me suis permis de les utiliser : la classe Popin ainsi que la fonction **lmFetch** qui encapsule la fonction fetch() de Javascript.

C'est la première fois que j'utilise la syntaxe ES6+ sans framework ou librairie. Je ne sais pas si utiliser l'objet document dans les classes est une bonne pratique ou s'il veut mieux avoir des classes avec des fonctions pures et faire appel à ces classes dans des fonctions "impures".
  

## Phase obligatoire
La partie la plus difficile pour moi. Pour le header, j'ai simplement mis une image.
 
J'ai pu constater qu'il y avait des fichiers *.scss déjà présents et j'ai voulu les importer dans le fichier **main.src.scss**. J'ai d'abord importé tous les bundles mais j'ai rencontré 2 problèmes :
- Le fichier _carousel.bundles.scss fait référence à un fichier tiny-slider.scss. Je l'ai donc commenté
- L'import des bundles n'était pas suffisant. J'ai ajouté le fichier all-settings

Sans ces 2 points, le process watch plantait.

J'ai essayé d'intégrer la maquette comme je le pouvais. Le résultat est loin d'être parfait mais j'ai pu reconnaître une certaine logique dans l'utilisation des classes, notamment des classes **col-** inspirées de Bootstrap.

Je n'ai pas géré la vue mobile, mais je sais que ces classes (col-xs, col-md...) permettent de le faire.

Au niveau du formulaire, j'ai géré les attributs de sorte à ce que même si l'utilisateur désactive Javascript, les contrôles de saisie soient en place.
- Type number
- Attributs utilisés : required, min, max, pattern, maxlength

Pour le code Javascript, je n'ai pas utilisé de classe mais des fonctions.
Le code est contenu dans une fonction anonyme auto-appelante avec le mode strict activé. Cela permet d'éviter des effets de bords et de s'assurer que toutes les variables utilisées soient d'abord déclarées.

Je m'appuie notamment sur la méthode **querySelector()** de l'objet document car elle permet de sélectionner des éléments du DOM aussi facilement qu'avec jQuery.

Pour la gestion de l'affichage des messages d'erreurs, une fonction générique toggleErrorMessage() permet d'afficher ou non un élément HTML. Il est possible de passer un ou plusieurs objets à afficher ou masquer à l'aide de la syntaxe Rest Parameters (ex: ...args)
  

## Choix du module 4 : Accessibilité
  Bien que je débute dans la gestion de l'accessibilité pour les sites web, j'ai choisi ce module pour en savoir davantage.
  Au niveau de la sémantique HTML, j'ai veillé à mettre les attributs role (search, main, banner...) afin qu'un utilisateur non-voyant sache l'intérêt de tel ou tel bloc.
  Aussi, j'ai géré l'apparition des messages d'erreurs à l'aide de l'attribut aria-hidden=true/false.
  Pour vérifier le respect des normes d'accessibilité pour le site, je me suis aidé des Chrome Dev Tools (onglet Audit). Je ne connais pas d'autres outils pour l'instant.
  

## Suggestions / Ce que j'aurai fait si j'avais plus de temps
En ayant plus de temps, j'aurai essayé de créer des **webcomponents** (à l'aide de la librairie Polymer par exemple) pour séparer la page en plusieurs blocs logiques et réutilisables.

En séparant par composants, j'aurai aussi essayé de mettre en place des **tests unitaires** à l'aide de Karma (runner) et de Jasmine (framework de tests).

J'aurai également continué à améliorer le **process de build**, voire même peut-être à le changer. Je n'aurai pas utilisé Rollup mais Webpack à la place, qui à mon sens est très facile à configurer à l'aide des loaders. J'en aurai profité pour mettre en place un loader prenant en entrée des fichiers **Typescript** pour les compiler en Javascript (ES5 pour assurer une compatibilité maximale des navigateurs).
