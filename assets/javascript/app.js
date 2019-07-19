$(document).ready(function() {
  // event listeners
  $("#remaining-time").hide();
  $("#start").on("click", questionSet.startGame);
  $(document).on("click", ".option", questionSet.guessChecker);
});

var questionSet = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",
  // storing questions,options and answers in objects
  questions: {
    q1: "What horoscope sign has a crab?",
    q2: "Which movie of Arnold Schwarzenegger was first nominated in Oscars?",
    q3: "What is the largest Continent in the World?",
    q4: "What is the tallest mammal in the world?",
    q5:
      "What is the name of the last boy who visited the chocolate factory owned by Mr. Willy Wonka?",
    q6: "Which city the cartoon The Simpsons live ?",
    q7: "What is the capital of Italy",
    q8: "Which of these band is the best band of 2010s?"
  },
  options: {
    q1: ["Libra", "Pisces", "Cancer", "Scorpio"],
    q2: ["Predator", "Terminator 2", "Total Recall", "The Terminator"],
    q3: ["Africa", "North America", "Australia ", "Asia"],
    q4: ["Giraffe", "Giant panda", "Elephant ", "Ostrich"],
    q5: [
      "Mike Teavee",
      "Charlie Bucket",
      "Violet Beauregarde",
      "Augustus Gloop"
    ],
    q6: ["Charlotte", "Raleigh", "Springfield", "Charleston"],
    q7: ["Greece", "Venice", "France", "Rome"],
    q8: ["Coldplay", "X-ambassadors", "Imagine Dragons", "The Script"]
  },
  correctAnswers: {
    q1: "Cancer",
    q2: "Terminator 2",
    q3: "Asia",
    q4: "Giraffe",
    q5: "Charlie Bucket",
    q6: "Springfield",
    q7: "Rome",
    q8: "Imagine Dragons"
  },
  // start game method
  startGame: function() {
    questionSet.currentSet = 0;
    questionSet.correct = 0;
    questionSet.incorrect = 0;
    questionSet.unanswered = 0;
    clearInterval(questionSet.timerId);

    $("#game").show();

    $("#results").html("");

    $("#timer").text(questionSet.timer);

    $("#start").hide();

    $("#remaining-time").show();

    questionSet.nextQuestion();
  },

  nextQuestion: function() {
    questionSet.timer = 15;
    $("#timer").removeClass("last-seconds");
    $("#timer").text(questionSet.timer);

    if (!questionSet.timerOn) {
      questionSet.timerId = setInterval(questionSet.timerRunning, 1000);
    }

    var questionContent = Object.values(questionSet.questions)[
      questionSet.currentSet
    ];
    $("#question").text(questionContent);

    var questionOptions = Object.values(questionSet.options)[
      questionSet.currentSet
    ];

    $.each(questionOptions, function(index, key) {
      $("#options").append(
        $(
          '<button class="option btn btn-primary btn-lg m-1">' +
            key +
            "</button>"
        )
      );
    });
  },

  timerRunning: function() {
    if (
      questionSet.timer > -1 &&
      questionSet.currentSet < Object.keys(questionSet.questions).length
    ) {
      $("#timer").text(questionSet.timer);
      questionSet.timer--;
      if (questionSet.timer === 4) {
        $("#timer").addClass("last-seconds");
      }
    } else if (questionSet.timer === -1) {
      questionSet.unanswered++;
      questionSet.result = false;
      clearInterval(questionSet.timerId);
      resultId = setTimeout(questionSet.guessResult, 1000);
      $("#results").html(
        "<h3>Out of time! The answer is " +
          Object.values(questionSet.correctAnswers)[questionSet.currentSet] +
          "</h3>"
      );
    } else if (
      questionSet.currentSet === Object.keys(questionSet.questions).length
    ) {
      $("#results").html(
        "<h3>Results</h3>" +
          "<p>Correct: " +
          questionSet.correct +
          "</p>" +
          "<p>Incorrect: " +
          questionSet.incorrect +
          "</p>" +
          "<p>Unaswered: " +
          questionSet.unanswered +
          "</p>" +
          "<p>Click start game to play again!</p>"
      );

      $("#game").hide();

      $("#start").show();
    }
  },
  //
  guessChecker: function() {
    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(questionSet.correctAnswers)[
      questionSet.currentSet
    ];

    // if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this)
        .addClass("btn btn-outline-success")
        .removeClass("btn btn-outline-info");

      questionSet.correct++;
      clearInterval(questionSet.timerId);
      resultId = setTimeout(questionSet.guessResult, 1000);
      $("#results").html("<h3>Correct!</h3>");
    }
    // else the user picked the wrong option, increment incorrect
    else {
      // turn button clicked red for incorrect
      $(this)
        .addClass("btn-danger")
        .removeClass("btn btn-outline-info");

      questionSet.incorrect++;
      clearInterval(questionSet.timerId);
      resultId = setTimeout(questionSet.guessResult, 1000);
      $("#results").html(
        "<h3>Wrong! Correct Answer is: " + currentAnswer + "</h3>"
      );
    }
  },
  // method to remove previous question results and options
  guessResult: function() {
    // increment to next question set
    questionSet.currentSet++;

    // remove the options and results
    $(".option").remove();
    $("#results h3").remove();

    // begin next question
    questionSet.nextQuestion();
  }
};
