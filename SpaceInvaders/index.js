const grid = document.querySelector(".grid");
let currentShooterIndex = 202;
let width = 15
let invadersId;
let direction = 1;
let right = true;
let results=0;
let aliensRemoved=[];
const resultDisplay = document.querySelector(".results");
for (let i = 0; i < 255; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]


function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add("invader");
    }
}
draw();
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}


squares[currentShooterIndex].classList.add("shooter");


function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
            }
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
            }
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')

}
document.addEventListener('keydown', moveShooter)





const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();
    if (rightEdge && right) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            right = false;
        }
    }
    if (leftEdge && !right) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            right = true;
        }
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    draw();

    if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
        resultDisplay.innerHTML="Game Over";
        clearInterval(invadersId);
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i]>squares.length){
            resultDisplay.innerHTML="Game Over";
            clearInterval(invadersId);

        }
    }
}

invadersId = setInterval(moveInvaders, 200);



const shoot=(e)=>{
    let laserId;
    let currentLaserIndex=currentShooterIndex;
    function moveLaser(){
        if(!squares[currentLaserIndex]){
            return;
        }
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -=width;
        squares[currentLaserIndex].classList.add("laser")
        if(squares[currentLaserIndex].classList.contains("invader")){
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")
            setTimeout(()=>{
                squares[currentLaserIndex].classList.remove("boom")
            },300)
            clearInterval(laserId)
            alienInvaders.splice(alienInvaders.indexOf(currentLaserIndex),1);
            if(alienInvaders.length===0){
                resultDisplay.innerHTML=`You won with and killed all of ${results} invaders`
                clearInterval(laserId);
            }
            else{

                resultDisplay.innerHTML=++results;
            }
        }
    }
    switch(e.key){
        case "ArrowUp":
            laserId=setInterval(moveLaser,50);
            break;
    }
}

document.addEventListener("keydown",shoot);