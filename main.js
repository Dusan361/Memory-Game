// 6. korak definisemo znakove koji ce se prikazivati
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
// 9. korak pravimo niz kliknutih kockica da bi imali redosled koju smo kockicu kliknuli prethodnu plus poslednju i njih da uporedimo da li su iste, ovo je privremeni niz u koji hvatamo klinute kockice
let twoFlipped = [];
let level = 1;
let allLevels = 5;

levelIcons.push(...allIcons.slice(start,end));
//console.log("Pocetni niz "+levelIcons);
// 1. korak selektujemo boks u kome ce biti kartice
let container = document.querySelector(`.container`);
//console.log(container);

let titel = document.querySelector('.niveau');
//console.log(nivo);

let grusskarte = document.querySelector('.grusskarte');
//console.log(cestitka);

let stars = document.querySelectorAll('.star');
//console.log(stars);

createCards();
// 3. korak selektujemo sve kartice
let cards = document.querySelectorAll('.card'+level);
//console.log(cards);
// 4.korak ovde im dodajemo slusace svakom posebno
cards.forEach(card => card.addEventListener('click', flipCard));

//5. korak pravimo funkcionalnost da karte mogu da se okrecu na klik
function flipCard(e) {
     //dinamicki dodajemo na postojecu klasu novu klasu

    //stari nacin dodavanja klasa na vec postojece klase
    /*
    this.className = this.className+" active";
    */



    //ovaj uslov mi je pravio problem, morao sam da ogranicim da ne moze da se okrece vise od jedne karte 
    if(twoFlipped.length < 2 && !this.classList.contains('active')){
        // 5.novi nacin dodavanja klasa u element tj objekat, znaci za svaku kliknutu kockicu dodajemo novu klasu active pored postojece card na taj objekat, koja rotira kliknutu kockicu  
        this.classList.add('active');
//10. korak posle kliknutih kockica posto su oni objekti dodajemo ih cele u privremeni niz koji proverava sta je korisik kliknuo
        twoFlipped.push(this);
// 11. korak ovde testiramo da li je duzina tog novog privremenog niza jednaka broju znakova koje zelimo da testiramo, na ovaj nacin izlazimo iz funkcije flipcard
        if (twoFlipped.length === 2) {

            twoFlipped[0].classList.add('ausgewählt');
//16. korak ovde pravimo funkcionalnost da ogranicimo korisnika cim klikne na 2 kockice da onda odma posle ne moze da klikce ni na jednu, znaci cim klikne na 2 skidamo klikove za sve
            removeAllClicks();
            checkCards();
        }
    }else{
        removeAllClicks();
    }
    
}
//17. korak pravimo tu funkciju koja skida klikove svim kockicama nakon 2 klika
function removeAllClicks() {
    cards.forEach(card => card.removeEventListener('click', flipCard));
}
//19. korak vracamo klikove ako nije bio pogodak, vracamo im svima klik
function returnClicks() {

    let cardsNotActive = document.querySelectorAll(`.card${level}:not(.active)`);
    cardsNotActive.forEach(card => card.addEventListener('click', flipCard));

}

// 12. korak ulazimo u funkciju koja proverava oprivremeni niz objekata
function checkCards() {
//12. korak, kada smo izvukli elemente na koje je korisnik kliknuo to su sada 2 objekta i mi onda ne moramo da trazimo od DOMA da ih selektujemo nego to mozemo da radimo direktno preko njihovih propertija od tih objekata, znaki svaki objekat ima u sebi metodu koja selektuje odredjeni hml element, u ovom slucaju nam trebaju vrednosti front kartica 
    let front1 = twoFlipped[0].querySelector('.front').innerHTML;
    // objekat prelazi u string tip podatka
    let front2 = twoFlipped[1].querySelector('.front').innerHTML;
//13. testiramo da li se poklapaju ako im se poklapaju vrednosti belezi se pogodak, ako ne onda ulazimo u else i vracamo vrednosti klasa na pocetne i praznimo niz
    if (front1 === front2) {
//15. korak resavamo pogotke, i ovde pravimo funkcionalnost da iako smo pogodili znakove posle jedne sekunde opet praznimo niz da bi presli na sledeci level igirice, tako da mora sve biti restartovano
        setTimeout(() => {

            twoFlipped[0].classList.remove('ausgewählt');

            twoFlipped = [];
            //18. korak sada ako se desio pogodak vracamo klikove onim kockicama koje nisu pogodjenje i nemaju klasu active
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
           // 14. korak prvo resavamo promasaje
        setTimeout(() => {
            twoFlipped[0].className = `card${level}`;
            twoFlipped[1].classList.remove('active');
            twoFlipped = [];

            //console.log(twoFlipped);
            returnClicks();
        }, 400);
    }
}  
// 2. korak preko for loop dinamicki popunjavamo box u kome su karte 
function createCards() {

    let text = ``;

    for (let i = 0; i < 4 * level; i++) {
        // 7. korak random definisemo neki broj koji ce predstavljati index niza icons, znaci ovde dobijamo random broj koji nije veci od duzine niza icons i posto prolazimo kroz for loop taj random broj ce se generisati onoliko puta koliko je dugacak niz icons, niz icons ce menjati svoju duzinu zato sto necemo da dozvolimo da vise od 2 puta prikaze jedan znak...
        let random = Math.floor(Math.random() * levelIcons.length); //uvek daje random broj koji je u okviru duzine niza icons
        text += `
            <div class="card${level}">
                <div class="front">${levelIcons[random]}</div>
                <div class="back"></div>
            </div>
        `.trim();
        // 8. korak praznimo array icons svaki put kada kliknemo na neku kockicu, na taj nacin dobijamo da se taj znak ne ponovi opet u random kombinaciji, nego na svako kliktanje taj element izlazi iz arrya i uzimaju se u obzir uvek ovi sto su ostali
        levelIcons.splice(random, 1);
    }

    titel.innerHTML = `<h1>Niveau ${level}</h1>`;
    container.className = `container${level}`;
    //ovde smo dodali kartice u DOM na ovaj nacin
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
