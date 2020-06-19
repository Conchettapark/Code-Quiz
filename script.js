//List of all variables being used for the code quiz pulled from the html

var timeEl = document.querySelector("#time");
var startQuiz = document.querySelector("#start-quiz-button");
var questionText = document.querySelector("#question-text");
var questionsElem = document.querySelector("#Questions");
var choice1 = document.querySelector("#choice-1");
var choice2 = document.querySelector("#choice-2");
var choice3 = document.querySelector("#choice-3");
var isCorrectElem = document.querySelector('#is-correct');
var endGame = document.querySelector('#end-game');
var scoreElem = document.querySelector('#score');
var initialsTextElem = document.querySelector('#initials')
var initialsSubmitElem = document.querySelector('#initialsSubmit')
var scoreboardElem = document.querySelector('#scoreboard')
var scoreboardPage = document.querySelector('#scoreboard-page')
var goBack = document.querySelector('#go-back')
var clearScoreboard = document.querySelector('#clear-scoreboard')
var secondsLeft = 60;
var currentQuestion = 0
var score = 0
var scoreBoard = []
var isCorrect

// Variables set up for the questions so to help keep the code dry
var questions = [{
  text: 'What is the state capital of Pennsylvania?',
  choice1: "Harrisburg",
  choice2: "Philadelphia",
  choice3: "Pittsburgh",
  correctChoice: "choice-1"
},
{
  text: "What is the state capital of California?",
  choice1: "Los Angeles",
  choice2: "Sacramento",
  choice3: "San Francisco",
  correctChoice: "choice-2"
},
{
  text: "What is the state capital of New York?",
  choice1: "New York City",
  choice2: "Utica",
  choice3: "Albany",
  correctChoice: "choice-3"
},
{
  text: "What is the state capital of Texas?",
  choice1: "Austin",
  choice2: "Houston",
  choice3: "Dallas",
  correctChoice: "choice-1"
},
{
  text: "What is the state capital of Florida?",
  choice1: "Miami",
  choice2: "Ft. Lauderdale",
  choice3: "Tallahassee",
  correctChoice: "choice-3"
}]
//startTimer function starts the timer with secondsLeft to count down from 60 seconds. The startQuiz click starts the startTimer function. If secondsLeft is greater
//then 0 it will move to the next question. Each question will will display 3 answers. If the answer is correct display correct, if not display wrong
function startTimer(){
  timeEl.textContent = secondsLeft + " seconds left"
  timeEl.style.visibility="visible"
  startQuiz.removeEventListener("click", startTimer);
  var clockTicker = setInterval(() => {
    timeEl.textContent = secondsLeft + " seconds left"
    secondsLeft--
    var qText = questionText.textContent
    var currentQInfo = questions[currentQuestion]
    if(secondsLeft > 0 && currentQInfo && qText !== currentQInfo.text){
      questionsElem.style.visibility='visible'
      questionText.textContent = currentQInfo.text
      choice1.textContent = currentQInfo.choice1
      choice2.textContent = currentQInfo.choice2
      choice3.textContent = currentQInfo.choice3
      if(isCorrect !== undefined){
        if(isCorrect){
          isCorrectElem.textContent = "Correct!"
        } else {
          isCorrectElem.textContent = "Wrong!"
        }
      }
      //If time runs out before all questions are answered, display Out of Time and game over
    }
    if(!currentQInfo || secondsLeft == 0){
      clearInterval(clockTicker)
      questionsElem.style.visibility='hidden'
      endGame.style.visibility="visible"
      scoreElem.textContent = score
      if(secondsLeft == 0){
        timeEl.textContent = "OUT OF TIME"
      }
    }
  }, 1000)
}
// For the scoreboard if the anwser is correct give 10 points, if wrong mins 5
function answerQuestion(e){
  let choiceId = e.target.id
  let currentQInfo = questions[currentQuestion]
  let correctChoice = currentQInfo.correctChoice
  if(correctChoice == choiceId){
    isCorrect = true
    score = score + 10
  } else {
    isCorrect = false
    secondsLeft = secondsLeft - 5 
  }
  currentQuestion++
}
// Scoreboard for correct or wrong answers. This is at the end of the game and player has input initials
function initialsSubmission(){
  var userInitials = initialsTextElem.value
  scoreBoard.push({userInitials, score})
  timeEl.style.visibility="hidden"
  endGame.style.visibility="hidden"
  scoreboardPage.style.visibility="visible"
  scoreBoard.sort((a, b) => (a.score > b.score) ? 1 : -1)
  scoreboardElem.innerHTML=""
  scoreBoard.map(scoreItem => {
    var userScoreItem = document.createElement("li")
    userScoreItem.appendChild(document.createTextNode(scoreItem.userInitials + "  |  " + scoreItem.score));
    scoreboardElem.appendChild(userScoreItem)
  })
}
//go back to the begining of the game when finished
function restart(){
  score = 0
  currentQuestion = 0
  secondsLeft = 60
  startQuiz.addEventListener("click", startTimer);
  scoreboardPage.style.visibility="hidden"
}

function wipeScores() {
  scoreBoard = []
  restart()
}
// Clickers for all buttons
startQuiz.addEventListener("click", startTimer);
choice1.addEventListener("click", answerQuestion);
choice2.addEventListener("click", answerQuestion);
choice3.addEventListener("click", answerQuestion);
initialsSubmitElem.addEventListener("click", initialsSubmission);
goBack.addEventListener('click', restart)
clearScoreboard.addEventListener("click", wipeScores)