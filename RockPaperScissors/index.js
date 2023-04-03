
let computerResult=0;
let youResult=0;
let options=["rock","paper","scissors"];
let result = document.createElement("h2"); 
let resultDiv = document.querySelector("#result");
let choices = document.querySelectorAll('h2');
console.log(choices)
resultDiv.appendChild(result);


const buttonClicked = (buttonId)=>{
    let picked=options[buttonId];
    let computerChoice = options[Math.floor(Math.random()*3)];

    choices.forEach((temp,i)=>{
        if(i==0){
            temp.innerHTML=`${computerChoice}`;
        }
        else{
            temp.innerHTML=`${picked}`;
        }
    })
    if(picked === computerChoice){
        result.innerHTML=`Draw <br> ${youResult}-${computerResult}`;
    }
    else if((picked === "rock" && computerChoice == "scissors") || (picked === "paper" && computerChoice === "rock") || (picked === "scissors" && computerChoice==="paper")){
        youResult+=1;
        result.innerHTML= `You won <br> ${youResult}-${computerResult}`;
    }
    else{
        computerResult+=1;
        result.innerHTML= `You lost <br> ${youResult}-${computerResult}`;
    }


}