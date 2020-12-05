let score;
let totalHits = 0;
let totalClicks = -1;
let gameLength = 5;
let gameDifficulty = "Medium";
let gameOver = true;
let gameArea = document.getElementById('gameArea');
let target = document.getElementById('target');
let startButton = document.getElementById('startButton');
let timerText = document.getElementById("timer");
let hitsText = document.getElementById("hits");
let clicksText = document.getElementById("clicks");
let difficultyText = document.getElementById("difficulty");
let fiveSeconds = document.getElementById("5s");
let fifteenSeconds = document.getElementById("15s");
let thirtySeconds = document.getElementById("30s");
let sixtySeconds = document.getElementById("60s");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");

function showElement(element){
    element.style.display = 'inline';
}

function hideElement(element){
    element.style.display = 'none';
}

function newTargetCoords(){
    let positionX = (Math.random()* 1900).toFixed();
    if (positionX > 1900-(parseInt(target.style.width, 10))){
        positionX-= (parseInt(target.style.width, 10));
    }
    let positionY = (Math.random()* 800).toFixed();
    if (positionY > 800-(parseInt(target.style.width, 10))){
        positionY-= (parseInt(target.style.width, 10));
    }
    target.style.left = positionX + 'px';
    target.style.top = positionY + 'px';
    showElement(target);
}

function startGame(){
    gameArea.addEventListener('click', gameAreaClick);
    hideElement(startButton);
    gameOver = false;
    totalClicks = -1;
    totalHits = 0;
    hitsText.innerText = 0;
    clicksText.innerText = 0;
    easy.disabled = true; medium.disabled = true; hard.disabled = true;
    fiveSeconds.disabled = true; fifteenSeconds.disabled = true; thirtySeconds.disabled = true; sixtySeconds.disabled = true;
    newTargetCoords();
    let startTime = new Date().getTime();
    let timer = setInterval(()=>{
        let timePassed = (new Date().getTime() - startTime) / 1000;
        if (timePassed < gameLength){
            timerText.innerText = (gameLength - timePassed).toFixed(3);
        }
        else{
            gameOver = true;
            clearInterval(timer);
            endGame();
        }
    }, 1)
}

function endGame(){
    gameArea.removeEventListener('click', gameAreaClick);
    hideElement(target);
    easy.disabled = false; medium.disabled = false; hard.disabled = false;
    fiveSeconds.disabled = false; fifteenSeconds.disabled = false; thirtySeconds.disabled = false; sixtySeconds.disabled = false;
    timerText.innerText = 0;
    let accuracy;
    let hitSpeed;
    if (totalClicks === 0){
        accuracy = 0;
        hitSpeed = gameLength;
    }
    else {
        accuracy = (totalHits/totalClicks * 100).toFixed(2);
        hitSpeed = (gameLength/totalHits).toFixed(2);
    }
    setTimeout(()=>{alert(`In ${gameLength} seconds you hit ${totalHits} targets in ${totalClicks} clicks on ${gameDifficulty.toLowerCase()} difficulty.\nTotal accuracy: ${accuracy}%.\nAverage Reaction Time: ${hitSpeed}s\nPlay again to keep improving!`)})
    showElement(startButton);
}

target.addEventListener('click', ()=>{
    hideElement(target);
    totalHits+=1;
    hitsText.innerText = totalHits;
    newTargetCoords();
});

function gameAreaClick(){
    totalClicks+=1;
    clicksText.innerText = totalClicks;
}

function changeGameLength(){
    if (fiveSeconds.checked){
        gameLength = 5;
        changeStatsText(gameLength, gameDifficulty);
    }
    if (fifteenSeconds.checked){
        gameLength = 15;
        changeStatsText(gameLength, gameDifficulty);
    }
    if (thirtySeconds.checked){
        gameLength = 30;
        changeStatsText(gameLength, gameDifficulty);
    }
    if (sixtySeconds.checked){
        gameLength = 60;
        changeStatsText(gameLength, gameDifficulty);
    }
}
function changeGameDifficulty(){
    if (easy.checked){
        gameDifficulty = "Easy";
        changeStatsText(gameLength, gameDifficulty);
    }
    if (medium.checked){
        gameDifficulty = "Medium";
        changeStatsText(gameLength, gameDifficulty);
    }
    if (hard.checked){
        gameDifficulty = "Hard";
        changeStatsText(gameLength, gameDifficulty);
    }
}

function stopWatch(){

}

function timer(seconds){

}

function changeStatsText(time, difficulty){
    timerText.innerText = time;
    difficultyText.innerText = difficulty;
    changeTargetSize(difficulty);
    hitsText.innerText = 0;
    clicksText.innerText = 0;
}

function changeTargetSize(difficulty){
    if (difficulty === "Easy")
    {
        target.style.width = "200px";
        target.style.height = "200px";
    }
    if (difficulty === "Medium")
    {
        target.style.width = "100px";
        target.style.height = "100px";
    }
    if (difficulty === "Hard")
    {
        target.style.width = "50px";
        target.style.height = "50px";
    }
}