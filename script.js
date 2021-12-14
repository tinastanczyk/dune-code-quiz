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
goBackButton = document.getElementById("goBack");
clearHSButton = document.getElementById("clear");
// Creating an array of objects to hold all of the questions with their respective options and correct answer
var quizQuest = [
  {
    q: "Question 1: Who is Shai-Hulud?",
    a: "The Duke of Atriedes",
    b: "Reverend Mother of the Fremen",
    c: "A laser weapon",
    d: "The Sandworm of Arrakis",
    ans: "The Sandworm of Arrakis",
  },
  {
    q: "Question 2: A _____ is used in the desert to reclaim moisture released from the body and recycle it.",
    a: "Orinthopter",
    b: "Melange",
    c: "Stillsuit",
    d: "Crysknife",
    ans: "Stillsuit",
  },
  {
    q: "Question 3: The fremen want to hide their abundant fields of melange from this space travel monopoly:",
    a: "The Guild",
    b: "The Kwisatz Haderach",
    c: "The Judge of Change",
    d: "The Gom Jabbar",
    ans: "The Guild",
  },
  {
    q: "Question 4: Paul Atriedes is known as all of the following except:",
    a: "Lisan al-Gaib",
    b: "Mentat",
    c: "Maud’dib",
    d: "Kwisatz Haderach",
    ans: "Mentat",
  },
  {
    q: "Question 5: Lady Jessica is the biological daughter of:",
    a: "Baron Harkonnen",
    b: "Liet-Kynes",
    c: "Stilgar",
    d: "Duncan Idaho",
    ans: "Baron Harkonnen",
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
      timerFig.textContent = "Timer: " + timeLeft;
      clearInterval(timeInterval);
    }
    // if the timer is on 0 then end the game and switch to saying score and prompting user to enter their initials
    if (timeLeft === 0 || timeLeft < 0) {
      getScore(timeLeft);
      timerFig.textContent = "Timer: " + timeLeft;
      clearInterval(timeInterval);
    } else {
      timerFig.textContent = "Timer: " + timeLeft;
      //switch to screen that says score
    }
  }, 1000);
}
function viewHighScores() {
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
  if (hsList === null) {
    return;
  }
  userRankings.innerHTML = "";
  for (let i = 0; i < hsList.length; i++) {
    var userI = hsList[i].usr;
    var uHS = hsList[i].hscore;
    var li = document.createElement("li");
    li.textContent = "User: " + userI + " Score: " + uHS;
    userRankings.append(li);
  }
}
 // save the user's score and initials in local storage as an array of objects
function saveScore(event) {
  event.preventDefault();
  // objects will contain initials and score, the array will contain the multiple users that play
  var userScores = JSON.parse(localStorage.getItem("userScores") || "[]");
  var user = {
    usr: userInitials.value.trim(),
    hscore: timeLeft,
  };
  userScores.push(user);
  localStorage.setItem("userScores", JSON.stringify(userScores));
  viewHighScores();
}
// This function shows the users score on the screen and prompts them to enter their initals.
function getScore() {
  questionScreen.style.display = "none";
  question.dataset.state = "hidden";
  scoreScreen.style.display = "block";
  scoreScreen.dataset.state = "shown";
  userScore.textContent = "Score: " + timeLeft;
 
}
//When the user clicks the submit button, then the function saveScore is called
submitButton.addEventListener("click", saveScore);
//when the user clicks on 'view highscores' they are presented with a table of initials and scores next to them.
viewHS.addEventListener("click", viewHighScores);
//when user clicks on 'view highscores' add an event listener to listen for a click on the button 'clear highscores' to clear all local storage
clearHSButton.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.clear();
  userRankings.textContent = "";
});
//When the go back button is clicked the start screen is displayed and all other screens are hidden
goBackButton.addEventListener("click",function(){
  questionScreen.style.display = "none";
  questionScreen.dataset.state = "hidden";
  startScreen.style.display = "flex";
  startScreen.dataset.state = "shown";
  scoreScreen.style.display = "none";
  scoreScreen.dataset.state = "hidden";
  timerFig.style.display = "flex";
  timerFig.dataset.state = "shown";
  highScreen.style.display = "none";
  highScreen.dataset.state = "hidden";
});
//this function resets all of the indices, answers and time and displays the first question on the screen
function startGame() {
  timeLeft = 60;
  index = 0;
  opt = 0;
  answers.innerHTML = "";
  
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
}

// add an event listener to listen for when the start button is pressed
startButton.addEventListener("click", startGame);

// This function checks whether the user clicked the right answer and skips to the next question once an answer is selected.
function checkOptions(event){
  var input = event.target;
  opt++;
  if (input.matches(".options")) {
    //when answer is clicked show whether it is right or wrong
    if (input.textContent === quizQuest[index].ans) {
      answers.style.display = "block";
      answers.textContent = answers.dataset.right;
    } else {
      answers.style.display = "block";
      answers.textContent = answers.dataset.wrong;
      // if the answer is wrong then subtract time from the timer and switch to next question
      timeLeft = timeLeft - 10;
    }
    if (index < 4) {
      for (let i = 0; i < 4; i++) {
        if (question.textContent === quizQuest[index].q) {
          question.textContent = quizQuest[index + 1].q;
          A.textContent = quizQuest[index + 1].a;
          B.textContent = quizQuest[index + 1].b;
          C.textContent = quizQuest[index + 1].c;
          D.textContent = quizQuest[index + 1].d;
        }
      }
      index++;
    }
  }
}

// add event listener to listen for a click on one of the answers
optContainer.addEventListener("click", checkOptions);

