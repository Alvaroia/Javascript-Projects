(
    function () {
        setInterval(drawClock, 500);
    }
)();


function drawClock() {
    let canvas = document.getElementById("clock").getContext('2d');

    //Clean screen
    canvas.clearRect(0, 0, 400, 400);

    //Draw circle
    drawnSphere(canvas);


    // Obtain hour
    date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    //full_hour to have more handle precission
    full_hour = hour + min / 60 + sec / 3600;

    console.log(`h: ${hour} m: ${min} s: ${sec}`);

    // Draw clock handles
    let angle = hour2angle(full_hour);
    drawHand(canvas, angle, 100, 5);

    angle = minute2angle(min);
    drawHand(canvas, angle, 180, 3);

    angle = minute2angle(sec);
    drawHand(canvas, angle, 180);

}

function drawnSphere(canvas) {
    canvas.beginPath();
    canvas.arc(200, 200, 200, 0, 2 * Math.PI);
    canvas.stroke();
}


function drawHand(canvas, angle, radius = 80, width = 1) {
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    let center_x = 200;
    let center_y = 200;

    canvas.beginPath();
    canvas.moveTo(center_x, center_y);
    canvas.lineTo(center_x + x, center_y + y);
    canvas.lineWidth = width;
    canvas.stroke();
}


function hour2angle(hour) {
    return (hour - 3) / 6 * Math.PI;
}


function minute2angle(minute) {
    return (minute - 15) / 30 * Math.PI;
}

    // TODO: add hours number and lines to clock; css or canvas? 

    // Comments: other way to do it (more easy?): Using style trasform rotate on html elements
    // instead of canvas

    // Problem: https://stackoverflow.com/questions/29371695/does-canvas-support-floating-point-numbers-when-drawing-line-or-arc
    // canvas and floating point coordinates. Look to subpixel interpolation?