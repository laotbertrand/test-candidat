class Survey {
  // Démarre le sondage
  startSurvey() {
    this.openModal();
    this.getFirstQuestion();
  }

  // Ouvre le sondage dans une nouvelle popin (modal Bootstrap)
  openModal() {
    $('#formModal').modal();
  }

  // Obtenir la première question
  getFirstQuestion() {
    const requestUrl = "http://.../api/startSurvey";
    fetch(requestUrl).then(insertQuestion);
  }

  // Insère la question dans la formulaire
  insertQuestion(response) {
    // Récupération de la question
    const question = new Question(response);

    // Stockage des informations dans un champs caché
    var json = JSON.stringify(question);
    document.querySelector('#quest_hidden').value = json;
    document.querySelector('#quest_id').value = question.number;

    // Affichage de la question et des réponses à l'utilisateur
    document.querySelector('#quest_title').value = question.title;

    // La fonction Utils.fillAnswers() se charge de générer des boutons radios pour chaque réponse possible
    Utils.fillAnswers('input[name="quest_answer"]', question.answers);
  }

  // Envoi la réponse et récupère la prochaine question
  getNextQuestion() {
    var questionNumber = document.querySelector('#quest_id').value;
    var answer = document.querySelector('input[name="quest_answer"]:checked').value;

    const requestUrl = "http://.../api/nextQuestion";
    const body = { questionNumber, answer };

    fetch(requestUrl, { method: 'POST', body }).then(response => {
      // Si la réponse est nulle, on charge la page de résultats
      if (!response) {
        finishSurvey();
      } else {
      // Dans le cas contraire, on affiche la question
        insertQuestion(response);
      }
    });
  }

  // Récupère la page de résultats
  finishSurvey() {
    const requestUrl = "http://.../api/results";

    fetch(requestUrl).then(response => {
      document.querySelector('#page').innerHTML = response;
    });
  }
}

/**
 * Classe correspondant à une question
 */
class Question {
  constructor(response) {
    this.number = response.number; // Numéro de la question
    this.title = response.title; // Titre de la question
    this.possibleAnswers = response.possibleAnswers; // Réponses possibles (tableau d'objets contenant id et texte)
  }
}

const mySurvey = new Survey();
document.querySelector('#openFormButton').addEventListener('click', survey.startSurvey);
document.querySelector('#openFormButton').addEventListener('submit', survey.startSurvey);
