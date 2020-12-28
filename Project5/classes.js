//@ts-check
'use strict';

export class rectangle {

    constructor(initPoint, size){
        this.x = initPoint[0];
        this.y = initPoint[1];

        this.width = size[0];
        this.height = size[1];

    }
    
    getCenter(){
        return([(this.width + this.x)/2, (this.height+this.y)/2]);
    }

    setCenter(point){
        let cx = point[0];
        let cy = point[1];

        this.x = cx - this.width/2;
        this.y = cy - this.height/2;
    }

    width = 0;
    height = 0;
    x = 0;
    y = 0;
}

export class gameState {

}

export class screen {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
    }

    width;
    height;
    ctx;
}

export class ball {
    constructor(Point) {
        this.x = Point[0];
        this.y = Point[1];
        this.radius = 10;
        this.speed = [5, -5];
    }

    setPosition(Point) {
        this.x = Point[0];
        this.y = Point[1];
    }
}

export class bricks {

    constructor(screen, nRows, nCols) {

        let margin_X = 10; //px
        let margin_Y = 10; //px
        let brick_width = ( (screen.width - margin_X) / nCols) - margin_X;
        let brick_height = ((0.6*screen.height) / nRows) - margin_Y; //60% of screen available

        for(let row = 0; row < nRows; row++) {
            for(let col = 0; col < nCols; col++) {
                let x_pos = (margin_X + brick_width) * col;
                let y_pos = (margin_Y + brick_height) * row;

                this.brickArray.push( new rectangle([margin_X + x_pos, margin_Y + y_pos], [brick_width, brick_height]));
            }
        }
    }

    brickArray = [];

}