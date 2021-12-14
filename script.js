// add a timer variable
timerFig = document.getElementById("timer");
startButton = document.getElementById("startBtn");
startScreen = document.getElementById("startScrn");
questionScreen = document.getElementById("questionScrn");
question = document.getElementById("questions");
optContainer = document.querySelector(".optContainer");
A = document.getElementById("optA");
B = document.getElementById("optB");
C = document.getElementById("optC");
D = document.getElementById("optD");
answers = document.getElementById("answers");
scoreScreen = document.getElementById("scoreScrn");
userScore = document.getElementById("usrScore");
userInitials = document.getElementById("user-init");
submitButton = document.getElementById("submit");
viewHS = document.getElementById("viewHS");
highScreen = document.getElementById("highscoreScrn");
userRankings = document.getElementById("scoreList");
// Creating an array of objects to hold all of the questions with their respective options and correct answer
var quizQuest = [
  {
    q: "Question 1",
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    ans: "C",
  },
  {
    q: "Question 2",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    ans: "4",
  },
  {
    q: "Question 3",
    a: "5",
    b: "6",
    c: "7",
    d: "8",
    ans: "5",
  },
  {
    q: "Question 4",
    a: "AA",
    b: "BB",
    c: "CC",
    d: "DD",
    ans: "BB",
  },
  {
    q: "Question 5",
    a: "11",
    b: "22",
    c: "33",
    d: "44",
    ans: "11",
  },
];
var timeLeft = 60;
var index = 0;
var score = 0;
var opt = 0;
// This function holds my timer and is called at the start of the quiz
function time() {
  var timeInterval = setInterval(function () {
    // If the timer hasn't reached zero, subtract 1 from timeLeft every 1000 milliseconds
    if (timeLeft > 0) {
      timerFig.textContent = "Timer: " + timeLeft;
      timeLeft--;
    }
    //if the user is on the last question, then switch to saying score and prompting user to enter their initials
    if (opt === 5) {
      getScore(timeLeft);
      console.log(timeLeft);
      timerFig.textContent = "Timer: " + timeLeft;
      clearInterval(timeInterval);
    }
    // if the timer is on 0 then end the game and switch to saying score and prompting user to enter their initials
    if (timeLeft === 0 || timeLeft < 0) {
      getScore(timeLeft);
      console.log(timeLeft);
      timerFig.textContent = "Timer: " + timeLeft;
      clearInterval(timeInterval);
    } else {
      timerFig.textContent = "Timer: " + timeLeft;
      //switch to screen that says score
    }
  }, 1000);
}

function getScore() {
  score = timeLeft;
  questionScreen.style.display = "none";
  question.dataset.state = "hidden";
  scoreScreen.style.display = "block";
  scoreScreen.dataset.state = "shown";
  userScore.textContent = "Score: " + score;
  // save the user's score and initials in local storage as an array of objects
  submitButton.addEventListener("click", function saveScore(event) {
    event.preventDefault();
    console.log(score);
    console.log(userInitials.value);
    // objects will contain initials and score, the array will contain the multiple users that play
    var userScores = JSON.parse(localStorage.getItem("userScores") || "[]");
    var user = {
      usr: userInitials.value.trim(),
      hscore: timeLeft,
    };
    userScores.push(user);
    localStorage.setItem("userScores", JSON.stringify(userScores));
    console.log(userScores);
  });
}
//when the user clicks on 'view highscores' they are presented with a table of initials and scores next to them, ranked from highest to lowest.
viewHS.addEventListener("click", function viewHighScores() {
  questionScreen.style.display = "none";
  questionScreen.dataset.state = "hidden";
  startScreen.style.display = "none";
  startScreen.dataset.state = "hidden";
  scoreScreen.style.display = "none";
  scoreScreen.dataset.state = "hidden";
  timerFig.style.display = "none";
  timerFig.dataset.state = "hidden";
  highScreen.style.display = "block";
  highScreen.dataset.state = "shown";
  var hsList = JSON.parse(localStorage.getItem("userScores"));
  for(let i=0; i<hsList.length; i++){
    var userI = hsList[i].usr;
    var uHS = hsList[i].hscore;
    console.log(hsList[i].usr);
    console.log(hsList[i].hscore);
    var li = document.createElement("li");
    li.textContent = "User: " + userI + " Score: " + uHS;
    userRankings.append(li);
  }
});

// add an event listener to listen for when the start button is pressed
startButton.addEventListener("click", function () {
  //when start button is pressed, start the timer
  time();
  //if start button is pressed then switch to first question
  if (startScreen.dataset.state === "shown") {
    startScreen.style.display = "none";
    startScreen.dataset.state = "hidden";
    questionScreen.style.display = "block";
    questionScreen.dataset.state = "shown";
    question.textContent = quizQuest[0].q;
    A.textContent = quizQuest[0].a;
    B.textContent = quizQuest[0].b;
    C.textContent = quizQuest[0].c;
    D.textContent = quizQuest[0].d;
  }
});

// add event listener to listen for a click on one of the answers

optContainer.addEventListener("click", function (event) {
  var input = event.target;
  opt++;
  if (input.matches(".options")) {
    //when answer is clicked show whether it is right or wrong
    if (input.textContent === quizQuest[index].ans) {
      console.log(input.textContent);
      answers.style.display = "block";
      answers.textContent = answers.dataset.right;
    } else {
      console.log(input.textContent);
      answers.style.display = "block";
      answers.textContent = answers.dataset.wrong;
      // if the answer is wrong then subtract time from the timer and switch to next question
      timeLeft = timeLeft - 10;
    }
    for (let i = 0; i < 3; i++) {
      if (question.textContent === quizQuest[index].q) {
        question.textContent = quizQuest[index + 1].q;
        A.textContent = quizQuest[index + 1].a;
        B.textContent = quizQuest[index + 1].b;
        C.textContent = quizQuest[index + 1].c;
        D.textContent = quizQuest[index + 1].d;
      }
    }
    if (index < 3) {
      index++;
    }
  }
});



//when user clicks on 'view highscores' add an event listener to listen for a click on the button 'clear highscores' to clear all local storage or 'go back' to bring the user back to the start button screen
