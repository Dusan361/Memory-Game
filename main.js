
let allIcons = [
    "🥷",
    "🥷",
    "👻",
    "👻",
    "👽",
    "👽",
    "🧑‍💻",
    "🧑‍💻",
    "🐸",
    "🐸",
    "🐬",
    "🐬",
    "🐋",
    "🐋",
    "🦈",
    "🦈",
    "🍆",
    "🍆",
    "🥕",
    "🥕",
    "🐷",
    "🐷",
    "💾",
    "💾",
    "📱",
    "📱",
    "😂",
    "😂",
    "🤣",
    "🤣",
    "😈",
    "😈",
    "💩",
    "💩",
    "🙈",
    "🙈",
    "🙊",
    "🙊",
    "🐶",
    "🐶",
    "🐱",
    "🐱",
    "💀",
    "💀",
    "🕵️‍♀️",
    "🕵️‍♀️",
    "👮‍♀️",
    "👮‍♀️",
    "👰‍♀️",
    "👰‍♀️",
    "🧑‍🔧",
    "🧑‍🔧",
    "👩‍🍳",
    "👩‍🍳",
    "👩‍🚀",
    "🧑‍🚀",
    "👩‍✈️",
    "👩‍✈️",
    "🧑‍🏫",
    "🧑‍🏫",
    "👨‍👩‍👧‍👦",
    "👨‍👩‍👦‍👦",
    "👯‍♀️",
    "👯",
    "👩‍🌾",
    "👩‍🌾",
    "😥",
    "😥",
    "🤔",
    "🤔",
    "😆",
    "😆",
    "😍",
    "😍",
    "🥰",
    "🥰",
    "😘",
    "😘",
    "😛",
    "😛",
    "😝",
    "😝",
    "😜",
    "😜",
    "🐻",
    "🐻",
    "🐼",
    "🐼",
    "🐨",
    "🐨",
    "🐯",
    "🐯",
    "🦁",
    "🦁",
    "🦆",
    "🦆",
    "🦞",
    "🦞",
    "🦀",
    "🦀",
    "🐺",
    "🐺",
    "🐔",
    "🐔",
  ];

let levelIcons = [];
let start = 0;
let end = 4;
let twoFlipped = [];
let level = 1;
let allLevels = 5;

levelIcons.push(...allIcons.slice(start,end));
//console.log("Pocetni niz "+levelIcons);

let container = document.querySelector(`.container`);
//console.log(container);

let titel = document.querySelector('.niveau');
//console.log(nivo);

let grusskarte = document.querySelector('.grusskarte');
//console.log(cestitka);

let stars = document.querySelectorAll('.star');
//console.log(stars);

createCards();

let cards = document.querySelectorAll('.card'+level);
//console.log(cards);

cards.forEach(card => card.addEventListener('click', flipCard));


function flipCard(e) {
    
    //ovaj uslov mi je pravio problem, morao sam da ogranicim da ne moze da se okrece vise od jedne karte 
    if(twoFlipped.length < 2 && !this.classList.contains('active')){

        this.classList.add('active');

        twoFlipped.push(this);

        if (twoFlipped.length === 2) {

            twoFlipped[0].classList.add('ausgewählt');

            removeAllClicks();
            checkCards();
        }
    }else{
        removeAllClicks();
    }
    
}

function removeAllClicks() {
    cards.forEach(card => card.removeEventListener('click', flipCard));
}

function returnClicks() {

    let cardsNotActive = document.querySelectorAll(`.card${level}:not(.active)`);
    cardsNotActive.forEach(card => card.addEventListener('click', flipCard));

}


function checkCards() {

    let front1 = twoFlipped[0].querySelector('.front').innerHTML;
    let front2 = twoFlipped[1].querySelector('.front').innerHTML;

    if (front1 === front2) {

        setTimeout(() => {

            twoFlipped[0].classList.remove('ausgewählt');

            twoFlipped = [];
            
            returnClicks();
        
            if (document.querySelectorAll(`.card${level}:not(.active)`).length===0) {
                
                stars.forEach((star,index) =>{
                    if((index+1)===level){
                        star.classList.add('gold');
                    }
                });
                
                nextLevel();
            }
        
        }, 400);
    } else {
        setTimeout(() => {
            twoFlipped[0].className = `card${level}`;
            twoFlipped[1].classList.remove('active');
            twoFlipped = [];

            //console.log(twoFlipped);
            returnClicks();
        }, 400);
    }
}  

function createCards() {

    let text = ``;

    for (let i = 0; i < 4 * level; i++) {
        let random = Math.floor(Math.random() * levelIcons.length);
        text += `
            <div class="card${level}">
                <div class="front">${levelIcons[random]}</div>
                <div class="back"></div>
            </div>
        `.trim();
        levelIcons.splice(random, 1);
    }

    titel.innerHTML = `<h1>Niveau ${level}</h1>`;
    container.className = `container${level}`;
    container.innerHTML = text;
    //console.log("Kontejner je "+container); 
}


function nextLevel() {
    if (level < allLevels) {
    
        //console.log(start);

        end += 4;
        //console.log(end); 

        levelIcons.push(...allIcons.slice(start,end));
        //console.log("Novi niz znakova iz nextLevela \n"+levelIcons);

        level++;

        createCards();
        
        let cards = document.querySelectorAll('.card'+level);

        //console.log(cards);

        cards.forEach(card => card.addEventListener('click', flipCard));

    } else {

       let text = ``;

        text+= `<p>Herzlichen Glückwunsch, Sie haben das Ende erreicht, Sie haben ein ausgezeichnetes Gedächtnis!!!</p>`;
        grusskarte.innerHTML = text;
    }
}
