let gameLength = 5;
let speedRunTotal = 5;
let gameType = "timeLimit";
let gameDifficulty = "Medium";
let numTargets = 1;
let totalHits = 0;
let totalClicks = -1;

let gameArea = document.getElementById('gameArea');
let target1 = document.getElementById('target1');
let startButton = document.getElementById('startButton');

let stopWatchDiv = document.getElementById("stopwatchDiv");
let timerDiv = document.getElementById("timerDiv");
let stopwatchText = document.getElementById("stopwatch");
let timerText = document.getElementById("timer");
let hitsText = document.getElementById("hits");
let clicksText = document.getElementById("clicks");
let difficultyText = document.getElementById("difficulty");
let targetsRemainingDiv = document.getElementById("targetsRemainingDiv");
let targetsRemaining = document.getElementById("targetsRemaining");


let timeLimit = document.getElementById("timeLimit");
let speedRun = document.getElementById("speedRun");

let fiveTargets = document.getElementById("5targets");
let fiveTargetsLabel = document.getElementById("5targetsLabel")
let fifteenTargets = document.getElementById("15targets");
let fifteenTargetsLabel = document.getElementById("15targetsLabel")
let thirtyTargets = document.getElementById("30targets");
let thirtyTargetsLabel = document.getElementById("30targetsLabel")
let sixtyTargets = document.getElementById("60targets");
let sixtyTargetsLabel = document.getElementById("60targetsLabel")

let fiveSeconds = document.getElementById("5s");
let fiveSecondsLabel = document.getElementById("5sLabel");
let fifteenSeconds = document.getElementById("15s");
let fifteenSecondsLabel = document.getElementById("15sLabel");
let thirtySeconds = document.getElementById("30s");
let thirtySecondsLabel = document.getElementById("30sLabel");
let sixtySeconds = document.getElementById("60s");
let sixtySecondsLabel = document.getElementById("60sLabel");

let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");

class Game{
    constructor(gameLength, gameDifficulty){
        this.gameLength = gameLength;
        this.gameDifficulty = gameDifficulty;
        this.gameOver = true;
    }
    start(){
        if (gameType === "timeLimit"){
            this.initGame();
            newTargetCoords(target1);
            let startTime = new Date().getTime();
            let timer = setInterval(()=>{
                let timePassed = (new Date().getTime() - startTime) / 1000;
                if (timePassed < this.gameLength){
                    timerText.innerText = (this.gameLength - timePassed).toFixed(3);
                }
                else{
                    this.gameOver = true;
                    clearInterval(timer);
                    this.endTimeLimit();
                }
            }, 1)
        }

        if (gameType === "speedRun"){
            this.initGame();
            targetsRemaining.innerText = speedRunTotal;
            newTargetCoords(target1);
            console.log(1);
            let startTime = new Date().getTime();
            console.log(2);
            let stopwatch = setInterval(()=>{
                let timePassed = (new Date().getTime() - startTime) / 1000;
                if (speedRunTotal !== 0)
                {
                    stopwatchText.innerText = timePassed.toFixed(3);
                }
                else{
                    this.gameOver = true;
                    clearInterval(stopwatch);
                    this.endSpeedRun();
                }
            })
        }
    }
    endTimeLimit(){
        this.uninitGame();
        timerText.innerText = 0;
        let accuracy;
        let hitSpeed;
        if (totalClicks === 0){
            accuracy = 0;
            hitSpeed = this.gameLength;
        }
        else{
            accuracy = (totalHits/totalClicks * 100).toFixed(2);
            hitSpeed = (this.gameLength/totalHits).toFixed(2);
        }
        setTimeout(()=>{alert(`In ${this.gameLength} seconds you hit ${totalHits} targets in ${totalClicks} clicks on ${this.gameDifficulty.toLowerCase()} difficulty.\nTotal accuracy: ${accuracy}%.\nAverage Reaction Time: ${hitSpeed}s\nPlay again to keep improving!`)})
        showElement(startButton);
    }

    endSpeedRun(){
        this.uninitGame();
        changeSpeedRunTotal();
        let accuracy = (totalHits/totalClicks * 100).toFixed(2);
        let hitSpeed = (parseFloat(stopwatchText.innerText, 10)/speedRunTotal).toFixed(2);
        setTimeout(()=>{alert(`It took you ${stopwatchText.innerText} to hit ${speedRunTotal} targets.\nTotal Accuracy: ${accuracy}%\nAverage Reaction Time: ${hitSpeed}\nPlay again to keep improving!`)})
        showElement(startButton);
    }

    uninitGame(){
        gameArea.removeEventListener('click', gameAreaClick);
        target1.removeEventListener('click', targetClick);
        hideElement(target1);
        enableAllRadios();
    }

    initGame(){
        totalHits = 0;
        totalClicks = -1;
        hitsText.innerText = totalHits;
        clicksText.innerText = 0;
        gameArea.addEventListener('click', gameAreaClick);
        target1.addEventListener('click', targetClick);
        hideElement(startButton);
        this.gameOver = false;
        disableAllRadios();
    }
}

function disableAllRadios(){
    timeLimit.disabled = true; speedRun.disabled = true;
    easy.disabled = true; medium.disabled = true; hard.disabled = true;
    fiveSeconds.disabled = true; fifteenSeconds.disabled = true; thirtySeconds.disabled = true; sixtySeconds.disabled = true;
    fiveTargets.disabled = true; fifteenTargets.disabled = true; thirtyTargets.disabled = true; sixtyTargets.disabled = true;
}

function enableAllRadios(){
    timeLimit.disabled = false; speedRun.disabled = false;
    easy.disabled = false; medium.disabled = false; hard.disabled = false;
    fiveSeconds.disabled = false; fifteenSeconds.disabled = false; thirtySeconds.disabled = false; sixtySeconds.disabled = false;
    fiveTargets.disabled = false; fifteenTargets.disabled = false; thirtyTargets.disabled = false; sixtyTargets.disabled = false;
}

function gameAreaClick(){
    totalClicks +=1;
    clicksText.innerText = totalClicks;
}
function targetClick(){
    hideElement(target1);
    totalHits+=1;
    hitsText.innerText = totalHits;
    if(gameType ==="speedRun"){
        speedRunTotal-=1;
        targetsRemaining.innerText = speedRunTotal;
    }
    newTargetCoords(target1);
}

function showElement(element){
    element.style.display = 'inline';
}

function hideElement(element){
    element.style.display = 'none';
}

function newTargetCoords(element){
    let positionX = (Math.random()* 1900).toFixed();
    if (positionX > 1900-(parseInt(element.style.width, 10))){
        positionX-= (parseInt(element.style.width, 10));
    }
    let positionY = (Math.random()* 800).toFixed();
    if (positionY > 800-(parseInt(element.style.width, 10))){
        positionY-= (parseInt(element.style.width, 10));
    }
    element.style.left = positionX + 'px';
    element.style.top = positionY + 'px';
    showElement(element);
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

function changeStatsText(time, difficulty){
    timerText.innerText = time;
    difficultyText.innerText = difficulty;
    changeTargetSize(difficulty, target1);
    hitsText.innerText = 0;
    clicksText.innerText = 0;
}

function changeTargetSize(difficulty, element){
    if (difficulty === "Easy")
    {
        element.style.width = "200px";
        element.style.height = "200px";
    }
    if (difficulty === "Medium")
    {
        element.style.width = "100px";
        element.style.height = "100px";
    }
    if (difficulty === "Hard")
    {
        element.style.width = "50px";
        element.style.height = "50px";
    }
}

function changeGameType(){
    if (timeLimit.checked){
        hideElement(stopWatchDiv); hideElement(targetsRemainingDiv);
        hideElement(fiveTargets); hideElement(fifteenTargets); hideElement(thirtyTargets); hideElement(sixtyTargets);
        hideElement(fiveTargetsLabel); hideElement(fifteenTargetsLabel); hideElement(thirtyTargetsLabel); hideElement(sixtyTargetsLabel);

        showElement(timerDiv);
        showElement(fiveSeconds); showElement(fifteenSeconds); showElement(thirtySeconds); showElement(sixtySeconds);
        showElement(fiveSecondsLabel); showElement (fifteenSecondsLabel); showElement(thirtySecondsLabel); showElement(sixtySecondsLabel);
        gameType = "timeLimit"
    }
    if (speedRun.checked){
        hideElement(timerDiv);
        hideElement(fiveSeconds); hideElement(fifteenSeconds); hideElement(thirtySeconds); hideElement(sixtySeconds);
        hideElement(fiveSecondsLabel); hideElement (fifteenSecondsLabel); hideElement(thirtySecondsLabel); hideElement(sixtySecondsLabel);

        showElement(stopWatchDiv); showElement(targetsRemainingDiv);
        showElement(fiveTargets); showElement(fifteenTargets); showElement(thirtyTargets); showElement(sixtyTargets);
        showElement(fiveTargetsLabel); showElement(fifteenTargetsLabel); showElement(thirtyTargetsLabel); showElement(sixtyTargetsLabel);
        gameType = "speedRun"
    }
}

function changeSpeedRunTotal(){
    if (fiveTargets.checked){
        speedRunTotal = 5;
        targetsRemaining.innerText = speedRunTotal;
    }
    if (fifteenTargets.checked){
        speedRunTotal = 15;
        targetsRemaining.innerText = speedRunTotal;
    }
    if (thirtyTargets.checked){
        speedRunTotal = 30;
        targetsRemaining.innerText = speedRunTotal;
    }
    if (sixtyTargets.checked){
        speedRunTotal = 60;
        targetsRemaining.innerText = speedRunTotal;
    }
}