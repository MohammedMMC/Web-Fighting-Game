class Sprite {
    /**
     * @param {{ 
     * position: {x: Number, y:Number},
     * offset: {x: Number, y:Number},
     * imageSrc: String,
     * scale: Number,
     * framesMax: Number
     * }} param0 
     */
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 1;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    }

    draw() {
        ctx.drawImage(
            this.image,
            (this.framesCurrent - 1) * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 1;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}