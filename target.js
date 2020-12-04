let score;
let gameLength = 5;
let gameOver = true;
let gameArea = document.getElementById('gameArea');
let target = document.getElementById('target');

function showElement(element){
    element.style.display = 'inline';
}

function hideElement(element){
    element.style.display = 'none';
}

function newTargetCoords(){
    let positionX = (Math.random()* 1000).toFixed();
    if (positionX > 900){
        positionX = 900;
    }
    let positionY = (Math.random()* 750).toFixed();
    if(positionY > 650){
        positionY = 650;
    }
    target.style.left = positionX + 'px';
    target.style.top = positionY + 'px';
    showElement(target);
    console.log(target);
}

target.addEventListener('click', ()=> {
    hideElement(target);
    newTargetCoords();
})