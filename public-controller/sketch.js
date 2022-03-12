//Create the socket
// clases cada una debe tener io
let socket = io();

let canvas;

let rightBtn;
let leftBtn;

let screenSetUser;
let screenRotate;
let screenControl;
let screenWin;
let screenLost;

let user;
let userName;

let controlScreen = 0;


function preload(){
    rightBtn = loadImage('assets/right.png');
    leftBtn = loadImage('assets/left.png');
    screenSetUser = loadImage('assets/screenSetUser.png');
    screenRotate = loadImage('assets/screenRotate.png');
    screenControl = loadImage('assets/screenControl.png');
    screenWin = loadImage('assets/screenWin.png');
    screenLost = loadImage('assets/screenLost.png');
    screenGetCoupon = loadImage('assets/screenGetCoupon.png');
    screenCoupon = loadImage('assets/screenCoupon.png');
    user = loadImage('assets/user.png');
}

function setup() {
    
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

}
//CASOS DE LAS PANTALLAS

function draw() {
    background(255);

    switch(controlScreen){
        case 0:
            image(screenSetUser,0,0,windowWidth, windowHeight);
            image(user,windowWidth / 2 - user.width/2,windowHeight/10);
            break;
        case 1:
            image(screenRotate,0,0,windowWidth, windowHeight);
            break;
        case 2:
            imageMode(CORNER);
            image(screenControl,0,0,windowWidth, windowHeight);
            imageMode(CENTER);
            image(leftBtn, windowWidth / 2,windowHeight / 1.5);
            image(rightBtn, windowWidth / 2, windowHeight / 3);
            isOver();
            break;
        case 3:
            imageMode(CORNER);
            image(screenWin,0,0,windowWidth, windowHeight);
            break;
        case 4:
            imageMode(CORNER);
            image(screenLost,0,0,windowWidth, windowHeight);
            break;
        case 5:
            imageMode(CORNER);
            image(screenCoupon,0,0,windowWidth, windowHeight);
            textSize(25);
            text(userName,windowWidth / 2 -25 ,windowHeight/2-130);
            break;
    }
    


}

//AQUI ES DONDE SE INFORMA EL MOVIENTO DEL MOUSE EN LAS FECHAS

function mouseClicked(){
    movementButton('RIGHT', windowWidth / 2, windowHeight / 3);
    movementButton('LEFT', windowWidth / 2, windowHeight / 1.5);

    if(controlScreen === 3){
        if(dist(mouseX,mouseY,  windowWidth / 2, windowHeight / 2)<50){
            controlScreen = 5;
        }
    }
}

function movementButton(direction, posX, posY) {
    ellipse(posX, posY, 50,50);
    if (dist(pmouseX, pmouseY, posX, posY) < 50) {
        //Send the direction to the server
        if(controlScreen === 2){
            socket.emit('direction',direction); //EMITE EL EVENTO ENVIA UNA 
            //SEÑAL A INDEX EL SERCVIDO
        }
        
    }
};

socket.on('connection', function(msg){
    msg('user connected controller');
})

function sendPlayer(userNa){
    
    socket.emit('user',userNa);
    userName = userNa;
    controlScreen = 1;
}

/*CUANDO SE UNDA EL BOTON DE START LLAMA EL METODO A TRUE Y LO RECIBE 
EL SEVIDOR INDEX JS
*/
function startGame(){
    socket.emit('startGame', true); //VARIABLE BOOLEANA
    controlScreen = 2;
}

function isOver(){
    socket.on('win', (isWin)=>{
        if(isWin){
            controlScreen =3;//gana
        } else {
            controlScreen = 4;//pierde
        }
    })
}

//AQUI SE HACE QUE SE PINTE EL IMPUT Y EL BOTON 

(function controller (input){

    if(controlScreen === 0){
        input.render();
        console.log('Hello from controller');
        
    }

})(input);

(function controller (buttonStart){

    buttonStart.onButton = () => {
        console.log("Hello from controler");

        startGame();
        buttonStart.noDisplay();
    }

    buttonStart.getButton();
    buttonStart.noDisplay();

    /*SE PONE EL IMPUT Y EL BOTON PERO LUEGO DEBEN QUITARSE
    PORQUE NO SON ELEMENTOS DEL CANVAS*/


})(buttonStart);

(function controller (button){

    button.onButton = () => {
        console.log("Hello from controler");
        let input = document.getElementById('input_name');
        let btn = document.getElementById('btn_putName');
        let btnStart = document.getElementById('btn_startName');
        sendPlayer(input.value);
        input.style.display = 'none';
        btn.style.display = 'none';
        btnStart.style.display = 'block';
    }

    button.getButton();

    

})(button);




