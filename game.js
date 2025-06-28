var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();

var userClickedPattern = new Array();
/*
$(".btn").click(function() {
  console.log("yes");
})*/

/*
this-> tells which button or whatever is clicked
class is also an html attribute
*/

//detecting whether a keyboard key has been pressed..to start a game

var level = 0;
var gameStart = false;

$(document).keypress(function (event) {
  if (!gameStart) {
    console.log(event.key);
  }

  $("#level-title").html("Level " + level);
  nextSequence();
  gameStart = true;
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  //console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  //this line means that userChoiceColour will store the id of the button that got clicked

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //console.log(gamePattern);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //console.log("Current Level is : "+currentLevel);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  
  else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
