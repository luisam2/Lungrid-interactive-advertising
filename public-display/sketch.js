
//Create the socket
let socket = io();

let character = {
    x: 0,
    y: 0
};
let speed = 0.01;

let controlScreen = 0;

let screenDisplay;

let imgBowl;

let userName;

let arrayIngredients = [];

let timer;
let score = 0;

function preload() {

    imgBowl = loadImage("assets/bowl.png");
    screenLoad = loadImage("assets/screenLoad.png");
    screenDisplay = loadImage('assets/screenDisplay.png');
    screenFinal = loadImage('assets/ScreenFinal.png');
}

function setup() {
    
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    character.x = windowWidth / 2;
    character.y = (windowHeight/2)+100;
    userName = '';
    timer = 30;

    for (let index = 0; index < 13; index++) {
        arrayIngredients.push(new Ingredients(this,"assets/egg.png",Math.random()*windowWidth,600,Math.random()*10,20));
        arrayIngredients.push(new Ingredients(this,"assets/Chopsticks.png",Math.random()*windowWidth,600,Math.random()*10,5));
        arrayIngredients.push(new Ingredients(this,"assets/Mushroom.png",Math.random()*windowWidth,600,Math.random()*10,15));
        arrayIngredients.push(new Ingredients(this,"assets/Noodles.png",Math.random()*windowWidth,600,Math.random()*10,20));
        arrayIngredients.push(new Ingredients(this,"assets/vegetables.png",Math.random()*windowWidth,600,Math.random()*10,5));
        arrayIngredients.push(new Ingredients(this,"assets/Rice.png",Math.random()*windowWidth,600,Math.random()*10,15));

    }

    console.log(arrayIngredients);
}

//CASOS DE LAS PANTALLAS

function draw() {
    background(0, 10);

    switch(controlScreen){
        case 0:
            image(screenLoad,0, 0, windowWidth, windowHeight);
            startGame();
            break;
        case 1:
            image(screenDisplay,0, 0, windowWidth, windowHeight);
            fill(255);
            noStroke();
            image(imgBowl,character.x,character.y)
            textSize(20);
            text(userName,windowWidth/9,50);
            text(timer,windowWidth-(windowWidth/9),50);
            text(score,windowWidth-(windowWidth/9),95);

            arrayIngredients.forEach(ingre =>{
                ingre.paint();
                ingre.move();
            })
            //ellipse(character.x, character.y, 50, 50);
            directionsDisplay();
            timerGone();
            deletedItemsAndScore();
            break;
        case 2:
            fill(0);
            image(screenFinal,0,0, windowWidth, windowHeight);
            textSize(25);
            text(userName, windowWidth/2, windowHeight/2);
            textSize(14);
            text("Obtuviste un total de " + score +" woks",windowWidth/2,windowHeight/2+30);
            break;
        case 3:
            break;
        case 4:
            break;
    }

}

/*
AQUI SE ESTA ESCUCHA EL EVENTO Y CUANDO HAY UN
CAMBIO SE CAMBIN LAS DIRECCIONES 
*/


function directionsDisplay() {
    let directions = '';
    socket.on('direction', clientPositions => {
        console.log({directions});
        directions = clientPositions;
        console.log(character.x + " "+ character.y);
        switch (directions) {

            case 'LEFT':
                character.x -= speed;
                break;
            case 'RIGHT':
                character.x+= speed;
                break;
            default:
                character.x = character.x;
                character.y = character.y;
                break;
        }
    })
    
}

//ESCUCHAR SI SE ESTA INICIANDO EL JUEGO
function startGame() {
    socket.on('user', userNamw =>{
        userName = userNamw; 
    })
    socket.on('startGame', game =>{

        console.log(game);

        if(game){
            controlScreen = 1;
        }

    })
}

function timerGone(){
    if(frameCount %60 ===0){
        timer-=1;
    }

    if(timer < 0){
        let isWin = false;//cambia a verdadero
        if(score>= 500){
            isWin = true;
            socket.emit('win', isWin);
            controlScreen = 2;
        } else {
            socket.emit('win', isWin);//el tiempó se acaba emite llamado
            controlScreen = 2;
        }
    }
}


function deletedItemsAndScore(){
    arrayIngredients.forEach((item,index) =>{
        if(dist(character.x,character.y,item.posX,item.posY)<50){
            console.log("entro");
            score+= item.value;
            arrayIngredients.splice(index,1);
        }
    })
}