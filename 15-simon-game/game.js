
// variables for running the games
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
// check if the game has started or not
let started = false;
// level variable
let level = 0;

// detect when any button is clicked
const button = $(".btn");

// Step 5 - check for first click
$(document).keypress(() => {
  if (!started) {

    // changes h1 title to level with number
    $("#level-title").text("Level " + level);
    // START OF GAME - it will call the nextSequence function, which randomly selects a button to light up
    nextSequence();
    started = true;
  }
});

// Step 4 - sound and animation on click of button
$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  // checks last element in the user clicked array, passes it to checkAnswer
  checkAnswer(userClickedPattern.length - 1)

});

// Step 1 - nextSequence function - logic of the game
const nextSequence = () => {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // increasing level by 1
  level += 1
  console.log(level)

  // update title to account for level increase
  $("#level-title").text("Level " + level);

  // to make a random number, we need Math.floor(Math.random())
  // where Math.floor rounds the number down and Math.random() makes a random num between 0 and 1(upperbound)
  // we multiply by 4 to allow it to select a value between 0 and 3 corresponding to index
  const randomNumber = Math.floor(Math.random() * 4)
  // we define a random chosen colour by indexing a random value from a defined array of colours, buttonColours
  const randomChosenColour = buttonColours[randomNumber]
  // then to define the sequence of colours, we append it to another array, holding the sequence of colours gamePattern
  gamePattern.push(randomChosenColour)

  // selecting button with same id as randomChosenColour
  const chosenButton = $("#" + randomChosenColour);
  // flash animation
  chosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playing sound with playSound function
  playSound(randomChosenColour)

}

// Step 2 - play sound
const playSound = (name) => {
  // we take the name as the value of the id from the clicked button
  // we call this playSound() function in the event listener for the button click
  // so on click, the ID of the button is passed into this function, which plays the according sound for the button, passing the ID into the template literal
  // which parses the right sound file
  const audio = new Audio(`sounds/${name}.mp3`);
  // play audio
  audio.play();
}

// Step 3 - Animate button when clicked
const animatePress = (currentColour) => {
  // takes single parameter, currentColour - that is the ID of the colour of the clicked button, which we pass in from the eventListener
  // use jQuery to add the .pressed css class to the button that has been clicked on
  const clickedButton = $("#" + currentColour);
  clickedButton.addClass("pressed");

  // after 100 ms we timeout the pressed class
  setTimeout(() => {
    clickedButton.removeClass("pressed");
  }, 100)
}


// Step 6: checkAnswer function
const checkAnswer = (currentLevel) => {
  console.log(currentLevel);
  console.log(userClickedPattern);
  console.log(gamePattern);
  // if value of last user answer index === the value of last game answer index
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    // if the values match, then we check the length of the arrays is the same
    // if they are the same, then we call nextSequence again with a timeout
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000)
    }
  } else {
    // Step 7 - Game over, logic for what happens when the user gets the pattern wrong
    console.log("Failure");
    const wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    const pageBody = $("body");
    pageBody.addClass("game-over");
    setTimeout(() => {
      pageBody.removeClass("game-over");
    }, 200)
    $("h1").text("Game over, press any key to restart.")

    // call startOver function to restart the game
    startOver();
  }
}

// Step 8 - Restart the game

const startOver = () => {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
