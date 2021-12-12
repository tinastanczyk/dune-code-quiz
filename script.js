// add a timer variable
timerFig = document.getElementById("timer");
startButton = document.getElementById("startBtn");
startScreen = document.getElementById("startScrn");
questionScreen = document.getElementById("questionScrn");
options = document.querySelector(".options");

function time(){

  var timeLeft = 60;

  var timeInterval = setInterval(function () {
    if(timeLeft > 0){
      timerFig.textContent = "Timer: " + timeLeft;
      timeLeft--;
    }else{
      timerFig.textContent = "Timer: " + timeLeft;
      //switch to screen that says score
    }
  }, 1000);


}
// add an event listener to listen for when the start button is pressed
startButton.addEventListener("click", function (){
  time();
  if(startScreen.dataset.state === "shown"){
    startScreen.style.display = "none";
    startScreen.dataset.state = "hidden";
    questionScreen.style.display = "block";
    questionScreen.dataset.state = "shown";
  }
})



//if start button is pressed then switch to first question 



//when start button is pressed, start the timer

// add event listener to listen for a click on one of the answers

//when answer is clicked show whether it is right or wrong

// if the answer is wrong then subtract time from the timer and switch to next question

// if the timer is on 0 then end the game and switch to saying score and prompting user to enter their initials 

// if the answer is right then switch to the next question

//if the user is on the last question, then switch to saying score and prompting user to enter their initials 

// save the user's score and initials in local storage as an array of objects

// objects will contain initials and score, the array will contain the multiple users that play

//when the user clicks on 'view highscores' they are presented with a table of initials and scores next to them, ranked from highest to lowest.

//when user clicks on 'view highscores' add an event listener to listen for a click on the button 'clear highscores' to clear all local storage or 'go back' to bring the user back to the start button screen