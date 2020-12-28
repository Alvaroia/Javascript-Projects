//@ts-check
'use stric';
import { rectangle, ball, bricks, screen } from "./classes.js";

let movement = 0;
let default_speed = 15;
let speed = default_speed;
let dV = 3;
let maxV = 40;
let score = 0;
let barra;
let gameScreen;
let gameBall;
let gameOver = true;
let lifes = 3;
let bricksArray;


function initGame() {
    // create elements
    gameScreen = new screen(document.getElementById("game-window"));
    console.log(gameScreen);
    bricksArray = new bricks(gameScreen, 5, 6);
    barra = new rectangle([100, 100], [200, 30]);
    gameBall = new ball([500, 400]);

    lifes = 3;
    score = 0;
    initUserPosition();
}

function initUserPosition() {
    barra.setCenter([500, 450]);
    gameBall.setPosition([500, 400]);
    gameBall.speed = [5, -5];
}

function gameLoop() {

    if (!gameOver) {

        console.log(`score ${score}`);

        //update
        updateBarra(gameScreen);
        updateBall(gameScreen);

        // draw output   
        drawGame();
    }
    else {
        drawGame();
        drawMenu();
    }
    window.requestAnimationFrame(gameLoop);
}

function updateBarra(screen) {
    if (movement == 1 && (barra.x + barra.width + speed) < screen.width) {
        barra.x += speed;
        movement = 0;
    }
    else if (movement == -1 && (barra.x - speed) > 0) {
        barra.x -= speed;
        movement = 0;
    }
}

function updateBall(screen) {
    let new_X = gameBall.x + gameBall.speed[0];
    let new_Y = gameBall.y + gameBall.speed[1];

    if (new_X > screen.width || new_X < 0) {
        gameBall.speed[0] = -gameBall.speed[0];
    }

    if (new_Y < 0) {
        gameBall.speed[1] = -gameBall.speed[1];
    }
    else if((new_Y + gameBall.radius) > screen.height) {
        lifes -= 1;

        console.log(lifes);
        
        initUserPosition();
        
        if(lifes==0) {
            gameOver = true;
            initGame();
        }

        return;
    }


    if (new_Y > (barra.y) && new_Y < (barra.y + barra.height) &&
        (new_X > barra.x) && (new_X < barra.x + barra.width)) {
        gameBall.speed[1] = -gameBall.speed[1];
    }

    gameBall.x = new_X;
    gameBall.y = new_Y;


    // Brick collision detection
    for (const brick of bricksArray.brickArray) {
        if (new_Y > (brick.y) && new_Y < (brick.y + brick.height) &&
            (new_X > brick.x) && (new_X < brick.x + brick.width)) {
            const index = bricksArray.brickArray.indexOf(brick);
            bricksArray.brickArray.splice(index, 1);
            gameBall.speed[1] = -gameBall.speed[1];
            score += 10;
        }
    }

    //If all bricks are destroyed:
    if(bricksArray.brickArray.length < 1 || bricksArray.brickArray == undefined){
        gameOver = true;
        initGame();
    }
}

function drawGame() {
    //Clean screen
    gameScreen.ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);

    //Draw bar
    drawElement(gameScreen.ctx, barra);
    drawBall(gameScreen.ctx, gameBall);
    
    for (const brick of bricksArray.brickArray) {
        drawElement(gameScreen.ctx, brick);
    }
    
    drawGUI();
    gameScreen.ctx.stroke();

}

function drawBall(ctx, ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
}

function drawElement(ctx, rect) {
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}


function drawGUI() {
    gameScreen.ctx.fillStyle="rgba(255, 255, 255, 0.75)";;
    let textBackground = new rectangle([10, 10], [100, 30]);
    drawElement(gameScreen.ctx, textBackground);
    gameScreen.ctx.fillStyle="black";
    gameScreen.ctx.font = "20px Arial";
    gameScreen.ctx.fillText(`Score: ${score}`, 50, 25);    

    gameScreen.ctx.stroke();
}


function drawMenu() {

    let boxMargin = 100;
    let textBackground = new rectangle([boxMargin, boxMargin], 
        [gameScreen.width-boxMargin*2, gameScreen.height-boxMargin*2]);
        
        
    drawElement(gameScreen.ctx, textBackground);
        
        
    gameScreen.ctx.font = "40px Arial";
    gameScreen.ctx.textAlign = "center";
    gameScreen.ctx.fillStyle="white";
    gameScreen.ctx.fillText("Break Out like Game", gameScreen.width/2, gameScreen.height/2);  
    
    gameScreen.ctx.font = "20px Arial";
    gameScreen.ctx.fillText("Press Enter to start.", gameScreen.width/2, gameScreen.height/2+60);    
    gameScreen.ctx.fillStyle="black";


}

// handle events
function getInputKeyDown(event) {

    console.log(speed);

    if (event.key == "ArrowLeft") {
        movement = -1;
        speed = Math.min(speed+dV, maxV);
    }
    else if (event.key == "ArrowRight") {
        movement = +1;
        speed = Math.min(speed+dV, maxV);
    }
    else {
        movement = 0;
    }

    if (event.key == "Enter" && gameOver) {
        gameOver = false;
    }
}


function getInputKeyUp(event) {
    if (event.key == "ArrowLeft") {
        movement = -1;
        speed = default_speed;
    }
    else if (event.key == "ArrowRight") {
        movement = +1;
        speed = default_speed;
    }
    else {
        movement = 0;
    }
}

document.addEventListener("keydown", event => {
    console.log(event.key);
    getInputKeyDown(event);
});

document.addEventListener("keyup", event => {
    console.log(event.key);
    getInputKeyUp(event);
});




initGame();

window.requestAnimationFrame(gameLoop);

// Try: https://newfivefour.com/javascript-canvas-smoothly-move-a-player.html