var pattern = new Array();

var userPattern = new Array();
var buttonColors = new Array();
buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;
$(document).keypress(function (event) {
  if (!start) {
    nextSequence();
    start = true;
  }
});

$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userPattern.push(userChoosenColor);
  $("#" + userChoosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChoosenColor);
  animePress(userChoosenColor);
  checkAnswer(userPattern.length - 1);
});

function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColors[randomNumber];
  pattern.push(randomChoosenColor);
  playSound(randomChoosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currLevel) {
  if (pattern[currLevel] === userPattern[currLevel]) {
    console.log("success");

    if (userPattern.length === pattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    var over = new Audio("sounds/wrong.mp3");
    over.play();
    console.log("wrong");
    startOver(pattern.length - 1);
  }
}

function startOver(score) {
  if (score < 0) {
    score = 0;
  }
  setTimeout(function () {
    $("h1").text("Player score " + score + " Press A Key to Start");
  }, 2000);
  level = 0;
  pattern = [];
  userPattern = [];
  start = false;
}
