// Import the Finish class
import { Finish } from "./finish.js"; 

export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.startQuiz();
    document
      .querySelector("#next")
      .addEventListener("click", this.nextQuestion.bind(this));
    this.score = 0;
  }

  startQuiz() {
    // Update question number and total questions
    document.querySelector("#currentQuestion").innerHTML =
      this.currentQuestion + 1;
    document.querySelector("#totalNumberOfQuestions").innerHTML =
      this.questions.length;
    document.querySelector("#question").innerHTML =
      this.questions[this.currentQuestion].question;

    // Get answers and shuffle them
    let correctAnswer = this.questions[this.currentQuestion].correct_answer;
    let incorrectAnswer = this.questions[this.currentQuestion].incorrect_answers;
    let answers = [correctAnswer, ...incorrectAnswer].sort();

    // Generate HTML for answers
    let quizBox = ``;
    for (let i = 0; i < answers.length; i++) {
      quizBox += `<div class="form-check ms-2" >
                    <label class="form-check-label mb-1">
                      <input type="radio" class="form-check-input me-2" name="answer" value="${answers[i]}">
                      ${answers[i]}
                    </label>
                  </div>`;
    }

    document.querySelector("#rowAnswer").innerHTML = quizBox;
  }

  nextQuestion() {
    let correctAnswer = this.questions[this.currentQuestion].correct_answer;
    let userAnswer = Array.from(document.getElementsByName("answer")).find(
      (answer) => answer.checked
    );

    if (userAnswer != undefined) {
      $("#alert").fadeOut(500);
      this.checkAnswer(userAnswer.value, correctAnswer);
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.startQuiz();
      } else {
        $("#quiz").fadeOut(1000, function () {
          $("#finish").fadeIn(500);
        });

        const finish = new Finish(this.score);
      }
    } else {
      $("#alert").fadeIn(500);
    }
  }

  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      $("#Correct").fadeIn(500).fadeOut(500);
      this.score++;
    } else {
      $("#inCorrect").fadeIn(500).fadeOut(500);
    }
  }
}
