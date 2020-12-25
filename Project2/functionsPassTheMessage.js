"use strict";

function createMessage() {
    console.log("Pressed");

    let message = document.getElementById("messageRequest").value;
    document.getElementById("messageRequest").value = "";

    if(message != "") {
        console.log(message);
        addMessage(message);
    }
    else {
        alert("Msg empty!");
        console.log("empty msg");
    }


}



function addMessage(msg) {
    let newElement = document.createElement("p");
    let elementText = document.createTextNode(msg);
    newElement.className = "message";
    newElement.appendChild(elementText);
    document.getElementById("messageBoard").appendChild(newElement);
}


//IIFE (Immediately Invoked Function Expression)
(
    function() {
        document.getElementById("SubmitButton").addEventListener("click", createMessage);
        document.addEventListener("keydown", (event)=> {
            console.log(event.key);
            if(event.key == "Enter"){
                console.log("Enter key pressed");
                createMessage();
            }
        });

    }
)();