"use strict";

function changeBackgroundColor() {
    let R = Math.round(Math.random()*255);
    let G = Math.round(Math.random()*255);
    let B = Math.round(Math.random()*255);
    let queryRGB = "rgb(" +R.toString()+", "+G.toString()+", "+B.toString() + ")";

    let invR = 255 - R;
    let invG = 255 - G;
    let invB = 255 - B;
    let queryInvRGB = "rgb(" + invR.toString() + ", " + invG.toString() + ", " + invB.toString() + ")";


    document.getElementsByClassName("main")[0].style.backgroundColor = queryRGB;
    console.log(`New color: ${queryRGB}`);

    document.getElementsByClassName("colorButton")[0].style.color = queryRGB;
    document.getElementsByClassName("colorButton")[0].style.backgroundColor = queryInvRGB;
    console.log(`New button color: ${queryInvRGB}`);

}


// DOMContentLoaded is different from load. The first one is just the html DOM
// and the second one is the entire web
window.addEventListener("DOMContentLoaded", function(){
    document.getElementsByClassName("colorButton")[0].addEventListener("click", changeBackgroundColor);
    console.log("DOMContentLoaded");
});