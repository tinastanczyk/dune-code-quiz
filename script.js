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
// Creating an array of objects to hold all of the questions with their respective options and correct answer
var quizQuest = [{
  q: "Question 1",
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  ans: "A"
},
{
  q: "Question 2",
  a: "",
  b: "",
  c: "",
  d: "",
  ans: ""
},
{
  q: "Question 3",
  a: "",
  b: "",
  c: "",
  d: "",
  ans: ""
},
{
  q: "Question 4",
  a: "",
  b: "",
  c: "",
  d: "",
  ans: ""
},
{
  q: "Question 5",
  a: "",
  b: "",
  c: "",
  d: "",
  ans: ""
}];

function time(){

  var timeLeft = 60;

  var timeInterval = setInterval(function () {
    if(timeLeft > 0){
      timerFig.textContent = "Timer: " + timeLeft;
      timeLeft--;
    }else if(timeLeft === 0){
      clearInterval(timeInterval);
    }else{
      timerFig.textContent = "Timer: " + timeLeft;
      //switch to screen that says score
    }
  }, 1000);


}
// add an event listener to listen for when the start button is pressed
startButton.addEventListener("click", function (){
  //when start button is pressed, start the timer
  time();
  //if start button is pressed then switch to first question 
  if(startScreen.dataset.state === "shown"){
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
})

// add event listener to listen for a click on one of the answers

optContainer.addEventListener("click", function (event){
  var input = event.target;
  if(input.matches(".options")){
    answers.style.display = "block";
    answers.textContent = answers.dataset.right;
    if(question.textContent === quizQuest[0].q){
      question.textContent = quizQuest[1].q;
    }else if(question.textContent === quizQuest[1].q){
      question.textContent = quizQuest[2].q;
    }else if(question.textContent === quizQuest[2].q){
      question.textContent = quizQuest[3].q;
    }else if(question.textContent === quizQuest[3].q){
      question.textContent = quizQuest[4].q;
    }
  }
})


//when answer is clicked show whether it is right or wrong

// if the answer is wrong then subtract time from the timer and switch to next question

// if the timer is on 0 then end the game and switch to saying score and prompting user to enter their initials 

// if the answer is right then switch to the next question

//if the user is on the last question, then switch to saying score and prompting user to enter their initials 

// save the user's score and initials in local storage as an array of objects

// objects will contain initials and score, the array will contain the multiple users that play

//when the user clicks on 'view highscores' they are presented with a table of initials and scores next to them, ranked from highest to lowest.

//when user clicks on 'view highscores' add an event listener to listen for a click on the button 'clear highscores' to clear all local storage or 'go back' to bring the user back to the start button screen