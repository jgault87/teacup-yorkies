var score = 0;
var sectionShowing = 'start';
var lastQuestionIndex = 11;

const playGame = () => {
  var startSection = document.getElementById('start');
  startSection.classList.add('d-none');
  var firstQuestion = document.getElementById('question-0');
  firstQuestion.classList.remove('d-none');

  var answers = document.querySelectorAll('.answer');

  answers.forEach(function (answer) {
    answer.addEventListener('click', function (event) {
      var buttonClasses = event.target.classList;
      var currentQuestion = event.target.parentElement.id;
      var currentQuestionClasses = event.target.parentElement.classList;

      let isPotato = currentQuestionClasses.contains('potato');
      let correctAnswer = isPotato ? 'potato' : 'pitbull';

      if (buttonClasses.contains(correctAnswer)) {
        score += 10;
      }

      let nextSection = '';
      questionNumber = parseInt(currentQuestion.split('-')[1]);
      nextQuestion = questionNumber + 1;
      if (nextQuestion == 12) {
        nextSection = 'finish';
        var scoreElement = document.getElementById('finalScore');
        scoreElement.innerHTML = score;
      } else {
        nextSection = `question-${nextQuestion}`;
      }

      event.target.parentElement.classList.add('d-none');
      var nextElement = document.getElementById(nextSection);
      nextElement.classList.remove('d-none');
    });
  });

  var playAgain = document.getElementById('playAgain');
  playAgain.addEventListener('click', function () {
    var finishSection = document.getElementById('finish');
    finishSection.classList.add('d-none');
    var startSection = document.getElementById('start');
    startSection.classList.remove('d-none');
  });
};

var startQuiz = document.getElementById('startQuiz');

startQuiz.addEventListener('click', playGame);
