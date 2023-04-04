const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
let hit=null;
let results=0;
let currentTime=60;


const randomSquare=()=>{
    squares.forEach(e=>{
        e.classList.remove("mole");
    })
    let randomSquare = squares[Math.floor(Math.random()*9)];
    randomSquare.classList.add("mole");
    hit=randomSquare.id;
}

for(let square of squares){
    square.addEventListener("mousedown",()=>{
        if(square.id == hit){
            results++;
            score.textContent=results;
            hit=null;
        }
    })
}

let moveMole = ()=>{
    setInterval(randomSquare,500);
}
moveMole();

function countDown(){
    currentTime--;
    timeLeft.textContent=currentTime;
    if(currentTime==0){
        clearInterval(countDownID)
        alert(`Game over your score is ${results}`)
    }
}

let countDownId = setInterval(countDown,1000);