export class Finish {
  constructor(score) {
    // Display the score on the finish screen
    document.querySelector("#score").innerHTML = score;
    // Add click event listener to try again button
    document
      .querySelector("#tryAgainBtn")
      .addEventListener("click", this.tryAgain);
  }

  // Method to handle try again functionality
  tryAgain() {
    // Hide finish screen, show settings screen
    $("#finish").fadeOut(1000, function () {
      $("#settings").fadeIn(500);
    });

    // Reset quiz settings
    document.querySelector("#category option:nth-child(1)").selected = true;
    document.querySelector("#easy").checked = true;
    document.querySelector("#numberOfQuestions").value = "";
  }
}
