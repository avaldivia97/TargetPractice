let score;
let totalHits = 0;
let totalClicks = -1;
let gameLength = 5;
let gameOver = true;
let gameArea = document.getElementById('gameArea');
let target = document.getElementById('target');
let startButton = document.getElementById('startButton');
let timerText = document.getElementById("timer");
let hitsText = document.getElementById("hits");
let clicksText = document.getElementById("clicks");

function showElement(element){
    element.style.display = 'inline';
}

function hideElement(element){
    element.style.display = 'none';
}

function newTargetCoords(){
    let positionX = (Math.random()* 1000).toFixed();
    if (positionX > 900){
        positionX-=100;
    }
    let positionY = (Math.random()* 750).toFixed();
    if(positionY > 650){
        positionY-=100;
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
    timerText.innerText = 0;
    let accuracy = (totalHits/totalClicks * 100).toFixed(2);
    setTimeout(()=>{alert(`In ${gameLength} seconds you hit ${totalHits} targets in ${totalClicks} clicks. For a total accuracy of ${accuracy}%. Play again to keep improving!`)})
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