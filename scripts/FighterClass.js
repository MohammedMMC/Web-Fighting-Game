class Fighter extends Sprite {
    /**
     * @param {{ 
     * position: {x: Number, y:Number},
     * velocity: {x: Number, y:Number},
     * offset: {x: Number, y:Number},
     * attackBox: {
     *  offset: {x: Number, y:Number},
     *  width: Number | undefined,
     *  height: Number | undefined
     * },
     * color: String,
     * imageSrc: String,
     * scale: Number,
     * health: Number,
     * damage: Number,
     * framesMax: Number,
     * sprites: {[key: string]:Sprite}
     * }} param0 
     */
    constructor({
        position,
        velocity,
        color = "red",
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        health,
        damage,
        attackBox = { offset: { x: 0, y: 0 }, width: undefined, height: undefined },
        giveHitAt
    }) {
        super({ position, imageSrc, scale, framesMax, offset });
        this.velocity = velocity;
        this.lastKey = "";
        this.width = 50;
        this.height = 150;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.color = color;
        this.isAttacking = false;
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.framesCurrent = 1;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;
        this.giveHitAt = giveHitAt || 4;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    attack() {
        this.switchSprite("attack1");
        this.isAttacking = true;
    }

    takeHit(e) {
        this.health -= e.damage;

        if (this.health <= 0) {
            this.switchSprite("death");
        } else this.switchSprite("takeHit");
    }

    update() {
        this.draw();
        if (!this.dead) this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // ~~ Debugging ~~
        // ctx.fillStyle = "red";
        // ctx.fillRect(
        //     this.attackBox.position.x - this.attackBox.offset.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // );

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.x + this.width > canvas.width - 50) {
            this.position.x = canvas.width - this.width - 50;
        }

        if (this.position.y + this.velocity.y < -80) {
            this.velocity.y *= -0.3;
        }

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0;
            this.position.y = 331;
        } else this.velocity.y += GRAVITY;
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax) {
                this.dead = true;
            }
            return;
        };

        if (
            this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax
        ) return;

        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax
        ) return;

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 1;
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 1;
                }
                break;
        }
    }
}