# Test front-end Leroy Merlin France

## Principe et déroulement
- Le test démarre à 9:00 et se termine à 18:00. A vous d'aménager votre travail comme vous le souhaitez sur cette période. 
- Vous tirerez une branche avec cette nomenclature : ```feature/[Votre nom prenom en minusucle séparé par des tirets]``` (ex : ```feature/maynard-james-keanan```). L'heure du dernier commit fera foi par rapport au temps passé sur l'exercice ainsi que l'heure de la réception de la notification de la merge request.
- Privilégiez la qualité à la quantité. Le barême d'évaluation se basera sur les atouts qui ressortent de votre travail et non sur le fait que vous ayez fini tous les exercices.
- Vous bénéficiez d'une base SCSS et d'un build sommaire pour faire ce travail. L'idée est de vous faire gagner du temps mais vous pouvez très bien les adapter à votre besoin et il sera intéressant que vous justifiez ces choix.
- Le test se base sur deux maquettes Zeplin que vous trouverez ici (vous aurez normalement créé un compte en avance de phase que l'on puisse vous y donner accès) :
    - [Isolation des combles desktop](https://zpl.io/b6DOmGK)
    - [Isolation des combles mobile](https://zpl.io/beKrj3B)
- Le test se déroule en deux phases : 
    - Une phase obligatoire (troncs communs) d'intégration HTML /CSS 
    - Une phase composée de modules qui vous permettra de mettre en valeurs les compétences où vous vous sentez le plus à l'aise. Encore une fois l'idée n'est pas finir tous ces modules en huit heures, concentrez-vous sur les notions où vous vous jugez expert.
- Vous pourrez compléter le fichier REPORT.md à la racine du projet pour expliquer vos choix techniques, faire part des difficultés rencontrées, les modules que vous aurez choisis et tout ce que vous pourrez juger utile à la bonne compréhension du livrable.

## Phase obligatoire
- Le travail de base consistera à intégrer la partie haute (le bandeau images avec le formulaire) de la page sans header / footer en version desktop
- Vous avez à disposition un watcher et un build sommaire, rien ne vous empêche de l'améliorer ou d'en utliser un autre et vous pourrez le commiter et documenter dans le REPORT.md.
- Le travail se fera dans les deux fichiers _main.src.scss_ et _main.src.js_
- Le formulaire doit avoir une validation de surface lorsque l'on clique sur le lien suivant

## Modules
### 1. Intégration partie basse
- Intégrer le reste de la maquette

### 2. Reponsive
- Gérer grâce à la maquette mobile l'affichage sur de plus petites résolutions d'écran.
- Vous bénéficiez des points de rupture LMFR dans le fichier *assets/commons/sass/_breakpoints.variables.scss*.

### 3. Performance web
- Optimiser votre livrable pour qu'il soit conforme aux bonnes pratiques de webperf.
- Documenter votre démarche : quels ont été vos points d'attention, vos outils pour y arriver.

### 4. Accessibilité
Deux axes à travailler :
- Navigation possible uniquement au clavier
- Toutes les informations de la page sont vocalisables

### 5. Rétrocompatibilité navigateurs
Attentes :
- Desktop
    - IE11, Edge dernière version
    - Firefox dernière version
    - Chrome dernière version
    - Safari MAC dernière version
- Mobile
    - Android 7 & 8 : Navigateur constructeur / Chrome
    - iOS : Safari 

### 6. Contrôle de surface formulaire
- Mettre en place une mécanique de contrôle des champs du formulaire à la soumission
- Le style des champs en erreur, des messages et des conseils à la saisie ne sont pas dans la maquette. Vous pourrez donc proposer un style pour ceux-ci.

### 7. Conception javascript
Le but de ce test n'est pas d'écrire intégralement un code Javascript fonctionnel mais plutôt de voir votre logique conceptuelle au niveau architecturelle et fonctionnelle de votre code. Vous pourrez utiliser le fichier _conception.js_ à cet effet.

Vous trouverez à la suite, un mini descriptif fonctionnel d'un projet Leroy Merlin auquel vous devez imaginer la représentation technique, voici ce que l'on attend de ce test :
- Utilisation des derniers standards Javascript, soit l'ES6 à minima.
- L'explication des différentes relations entre chaque choix conceptuel fait si nécessaire (un diagramme de classe serait l'idéal si le temps vous le permet).
- Une explication en français et algorithmique de ce que le code ferait, ex : Clique sur le bouton myButton, instanciation d'une popin.
Maintenant voici les mini-specs fonctionnelles de ce projet : 
- En tant que client, je dois pouvoir répondre à un système de questions/réponses. 
- En tant que client, une fois que j'ai fini le wizard/formulaire je souhaite accéder à une page de résultat. 
- En tant que client, une fois le résultat obtenu, je souhaite pouvoir être recontacté. 
En détail, voici ce qui est attendu côté technique : 
- Nous avons un wizard/formulaire de questions/réponses qui s'enchainent où à chaque fois une requête serveur est instanciée côté client pour soumettre le résultat et obtenir la question suivante si la question suivante est nulle c'est qu'on souhaite avoir le résultat.
- La page de résultat est récupéré à l'aide d'une requête serveur côté client.
- Le formulaire s'ouvre dans une popin, la soumission se fait à l'aide d'une requête serveur.  

Exemple de résultat attendu :
```javascript 
class myClass {
    constructor() {
    }
    myFunction() {
        /** Au clique sur le bouton myButton;
        Si l'attribut data-attribut est égale à toto alors 
            ...
        Sinon 
            ...
        FinSi **/
    }
}
```

## Déroulement
- Ne perdez pas de temps sur le header / footer du site. Une image fera le travail pour ces deux parties.
- Vous utiliserez ```main.src.scss``` avec le maximum d'élements trouvés dans _assets/sass_ pour le CSS.
- Idem pour le JS, ```main.src.js```et ce que vous trouverez dans _assets_.
