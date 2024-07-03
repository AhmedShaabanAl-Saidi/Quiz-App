// Import the Quiz class from the quiz.js file
import { Quiz } from "./quiz.js"; 

// Define and export the Settings class
export class Settings {
  constructor() {
    this.chooseCategory = document.querySelector("#category");
    this.chooseDifficulty = document.getElementsByName("difficulty");
    this.numberOfQuestions = document.querySelector("#numberOfQuestions");
    this.startBtn = document
      .querySelector("#startBtn")
      .addEventListener("click", this.startQuiz.bind(this));
  }

  // Asynchronous method to start the quiz
  async startQuiz() {
    let category = this.chooseCategory.value;
    let difficulty = Array.from(this.chooseDifficulty).find((input) => {
      return input.checked; 
    }).value;
    let numberOfQuestions = this.numberOfQuestions.value;

    // Show alert if the number of questions is not provided
    if (numberOfQuestions == "") {
      $("#questionsAlert").fadeIn(500); 
    } else {
      $("#questionsAlert").fadeOut(100); 

      // Build the API URL with the provided parameters
      let API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
      let questions = await this.callingAPI(API);

      // Fade out the settings section and fade in the quiz section using jQuery
      $("#settings").fadeOut(1000, function () {
        $("#quiz").fadeIn(500);
      });

      const quiz = new Quiz(questions);
    }
  }

  // Asynchronous method to call the API
  async callingAPI(API) {
    let response = await fetch(API);
    let finalResponse = await response.json(); 
    return finalResponse.results; 
  }
}