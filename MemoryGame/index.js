const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
]

cardArray.sort(()=> 0.5- Math.random());

const grid=document.querySelector("#grid");
const cardsChosen =[];
const cardsChosenIds=[]

const createBoard = () => {
    let i=0;
    for(let elem of cardArray){
        const card = document.createElement("img");
        card.setAttribute("src","images/blank.png")
        card.setAttribute("data-id",i);
        card.addEventListener("click",(e)=>{
            flipCard(e);
        })
        grid.appendChild(card);
        i+=1;

    }
}
createBoard();
let score=0;

async function flipCard(e){
    let cardId= e.target.attributes["data-id"].value;
    let cardName= cardArray[cardId].name;
    let cardSrc = cardArray[cardId].img;
    cardsChosen.push(cardName);
    cardsChosenIds.push(cardId);
    e.target.attributes["src"].value=cardSrc;
    if(cardsChosen.length == 2){
        function timeout(seconds) {
            return new Promise((resolve,reject) => setTimeout(()=>{
                let cards=document.querySelectorAll("#grid img");
                if(cardsChosen[0] == cardsChosen[1]){
                    cards[cardsChosenIds[0]].setAttribute("src","images/white.png");
                    cards[cardsChosenIds[1]].setAttribute("src","images/white.png");
                    score+=1;
                    document.getElementById("result").innerText=score;
                    alert("Its a match");
                }
                else{
                    cards[cardsChosenIds[0]].setAttribute("src","images/blank.png");
                    cards[cardsChosenIds[1]].setAttribute("src","images/blank.png");
                }
                cardsChosenIds.pop();
                cardsChosenIds.pop();
                cardsChosen.pop();
                cardsChosen.pop();
                resolve();
    
            }, seconds * 1000));
        }
        await timeout(0.5);
    }
}