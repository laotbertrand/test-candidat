import { lmFetch } from '../../assets/commons/_fetch';
import { Popin } from '../../assets/commons/_popin.class';

class Survey {
  // Ouvre le sondage dans une nouvelle popin (modal Bootstrap)
  startSurvey() {
    this.popin = new Popin({ content: "#surveyForm" });
    this.getFirstQuestion();
  }

  // Obtenir la première question
  getFirstQuestion() {
    lmFetch({ url: 'http://.../api/startSurvey' }).then(insertQuestion);
  }

  // Insère la question dans la formulaire
  insertQuestion(response) {
    // Récupération de la question
    const question = new Question(response);

    // Stockage des informations dans un champs caché
    const json = JSON.stringify(question);
    document.querySelector('#quest_hidden').value = json;
    document.querySelector('#quest_id').value = question.number;

    // Affichage de la question et des réponses à l'utilisateur
    document.querySelector('#quest_title').value = question.title;

    // La fonction Utils.fillAnswers() se charge de générer des boutons radios pour chaque réponse possible
    Utils.fillAnswers('input[name="quest_answer"]', question.answers);
  }

  // Envoi la réponse et récupère la prochaine question
  getNextQuestion() {
    const questionNumber = document.querySelector('#quest_id').value;
    const answer = document.querySelector('input[name="quest_answer"]:checked').value;
    const body = { questionNumber, answer };

    lmFetch({ url: 'http://.../api/nextquestion', method: 'POST', body }).then(response => {
      // Si la réponse est nulle, on charge la page de résultats
      if (!response) {
        finishSurvey();
      } else {
        // Dans le cas contraire, on affiche la question
        insertQuestion(response);
      }
    });

    return false; // pour éviter un rechargement de page
  }

  // Récupère la page de résultats
  finishSurvey() {
    lmFetch({ url: 'http://.../api/results' }).then(response => {
      document.querySelector('#page').innerHTML = response;
    });

    this.popin.close();
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

// Gestion des évènements
const survey = new Survey();
document.querySelector('#openQuestionFormButton').addEventListener('click', survey.startSurvey);
document.querySelector('#questionForm').onsubmit = survey.getNextQuestion;
