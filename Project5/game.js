'use stric';
import {rectangle, ball, screen} from "./classes.js";

let movement = 0;
let speed = 20;
let barra;
let gameScreen;
let gameBall;


function initGame() {
    // create elements
    gameScreen = new screen(document.getElementById("game-window"));
    console.log(gameScreen);
    barra = new rectangle([100, 100], [200, 30]);
    barra.setCenter([500, 450]);
    gameBall = new ball([500, 400]);
}

function gameLoop() {
    
    //update
    updateBarra(gameScreen);
    updateBall(gameScreen);

    // draw output   
    draw();
}

function updateBarra(screen) {
    if(movement == 1 && (barra.x + barra.width + speed) < screen.width) {
        barra.x += speed;
        movement = 0;
    }
    else if(movement == -1 && (barra.x - speed) > 0) {
        barra.x -= speed;
        movement = 0;
    }
}

function updateBall(screen) {
    let new_X = gameBall.x + gameBall.speed[0];
    let new_Y = gameBall.y + gameBall.speed[1];

    if(new_X > screen.width || new_X < 0) {
        gameBall.speed[0] = -gameBall.speed[0]; 
    }

    if(new_Y > screen.height || new_Y < 0) {
        gameBall.speed[1] = -gameBall.speed[1]; 

    }

    console.log(barra.y, new_Y);
    if(new_Y > (barra.y) &&  new_Y < (barra.y + barra.heigth) && 
        (new_X > barra.x) && (new_X < barra.x+barra.width)) 
    {
        gameBall.speed[1] = -gameBall.speed[1]; 
    }

    gameBall.x = new_X;
    gameBall.y = new_Y;
}

function draw() {
    let canvas = document.getElementById("game-window");
    let ctx = canvas.getContext('2d');

    //Clean screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw bar
    drawElement(ctx, barra);
    drawBall(ctx, gameBall);
    ctx.stroke();

}

function drawBall(ctx, ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y , ball.radius, 0, 2*Math.PI);
    ctx.fill();
}

function drawElement(ctx, rect) {
    ctx.fillRect(rect.x, rect.y , rect.width, rect.heigth);
}

// handle events
function getInput(event) {
    if(event.key == "ArrowLeft"){
        movement =  -1;
    }
    else if(event.key == "ArrowRight"){
        movement =  +1;
    }
    else {
        movement = 0;
    }

}


document.addEventListener("keydown", event => {
    console.log(event.key);
    getInput(event);
});


initGame();
setInterval(gameLoop, 50);