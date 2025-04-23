var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    started = true;
    level = level + 1;
    $("h1").text("Level "+level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * (3 + 1));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

$(document).ready(function(){
    $("div[type='button']").on("click",function(){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        if(userClickedPattern.length === level){
            checkAnswer();
        }
    })
})

$(document).keypress(function(){
    if(started === false){
        nextSequence();
    }
})
    
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100)
}

function checkAnswer(){
    for(let i = 0; i<userClickedPattern.length; i++){
        if(gamePattern[i] === userClickedPattern[i]){
            continue;
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over")
            setTimeout(function(){$("body").removeClass("game-over")},200)
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver()
            return;
        }
    }
    setTimeout(function(){nextSequence();},1000);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}