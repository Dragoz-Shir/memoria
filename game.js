var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var first = true;
var level = 0;
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  /* otra manera de hacerlo sin unsar el handler (que es el event)
    puede ser con 
    userChosenColour = $("this").attr("id");
    */
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // console.log(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(50)
    .fadeIn(50);
  playSound(randomChosenColour);

  level += 1;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
function animatePress(currentColour) {
  //  console.log(currentColour);

  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (first) {
    nextSequence();
    first = false;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong!");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $(document.body).addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $(document.body).removeClass("game-over");
    }, 200);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  first = true;
}
