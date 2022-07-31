//Naming Buttons
var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");
var allPresses = [green, red, yellow, blue];


gamePattern = [];
y = 0; //playerPattern counter.
playerPattern = [];


//Buttons Animation
function animation(x) {
  $("." + x).addClass("pressed");
  setTimeout(function() {
    $("." + x).removeClass("pressed");
  }, 100)
}


// Play sounds functions
function playRed() {
  redAudio = new Audio("sounds/red.mp3")
  redAudio.play();
}

function playBlue() {
  blueAudio = new Audio("sounds/blue.mp3")
  blueAudio.play();
}

function playYellow() {
  yellowAudio = new Audio("sounds/yellow.mp3")
  yellowAudio.play();
}

function playGreen() {
  greenAudio = new Audio("sounds/green.mp3")
  greenAudio.play();
}

function playWrong() {
  wrongAudio = new Audio("sounds/wrong.mp3")
  wrongAudio.play();
}


// Add sounds to the buttons
$(".btn").on("click", function() {
  if ($("h1").text() === 'Press A Key to Start') {
    console.log("Keyboard must be press to start the game and activate the buttons")
  } else if ($("h1").text() === 'Game Over!') {

    console.log("Refresh to restart")

  } else {
    switch ($(this).css("backgroundColor")) {
      case 'rgb(255, 0, 0)':
        playRed();
        animation("red");
        break;

      case 'rgb(255, 255, 0)':
        playYellow();
        animation("yellow");
        break;

      case 'rgb(0, 0, 255)':
        playBlue();
        animation("blue");
        break;

      case 'rgb(0, 128, 0)':
        playGreen();
        animation("green");
        break;
      default:

    }
  }

})

//Paus compilor
function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  }
  while (curDate - date < millis);
}


//Game Start
$(document).on('keydown', function() {
  if ($("h1").text() === "Press A Key to Start") {
    createPattern();

  }
})
levelNumber = 0;

//Create Game Pattern
function createPattern() {
  levelNumber++;
  $("h1").text("Level " + levelNumber);
  pattern = [];
  for (var i = 0; i < levelNumber; i++) {
    pattern.push(allPresses[Math.floor(Math.random() * 4)]);
  }
  gamePattern = pattern; //Save the pattern array in a variable

  // Play the created pattern
  var t = 0; //  set your counter to 1
  function clickPattern() { //  create a loop function
    setTimeout(function() { //  call a 1s setTimeout when the loop is called
      gamePattern[t].click();
      t++; //  increment the counter
      if (t < gamePattern.length) {
        clickPattern(); //  ..  again which will trigger
      }
    }, 1500) //  ..  setTimeout()
  }
  clickPattern();
  playerPattern = [];
  y = 0;
  return gamePattern, playerPattern, y;
}

// Keep Checking if gamePattern is the same as playerPattern for each click
function keepChecking() {




  if ($(playerPattern[y]).css("backgroundColor") === $(gamePattern[y]).css("backgroundColor")) {
    console.log("ok");
    y++;
    if (y === gamePattern.length ) {
      console.log("hi");
      createPattern();

    }
  } else {
    playWrong();
    $("h1").html("Game Over!");
  }

}


//Creat player pattern and assign it to an array.
$(".btn").on("mousedown", function() {

  if ($("h1").text() === 'Press A Key to Start') {
    console.log("Keyboard must be press to start the game and activate the buttons")
  } else if ($("h1").text() === 'Game Over!') {
    console.log("Refresh to restart")
  } else {
    playerPattern.push(this);
    keepChecking();
  }




})
