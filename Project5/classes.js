'use strict';

export class rectangle {

    constructor(initPoint, size){
        this.x = initPoint[0];
        this.y = initPoint[1];

        this.width = size[0];
        this.heigth = size[1];

    }
    
    getCenter(){
        return([(this.width + this.x)/2, (this.heigth+this.y)/2]);
    }

    setCenter(point){
        let cx = point[0];
        let cy = point[1];

        this.x = cx - this.width/2;
        this.y = cy - this.heigth/2;
    }

    width = 0;
    heigth = 0;
    x = 0;
    y = 0;
}

export class gameState {

}

export class screen {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
    }

    width;
    height;
}

export class ball {
    constructor(Point) {
        this.x = Point[0];
        this.y = Point[1];
        this.radius = 10;
        this.speed = [10, -10];
    }
}