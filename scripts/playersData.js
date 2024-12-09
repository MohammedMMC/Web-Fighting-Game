const PLAYERS_DATA = {
    kenji: {
        name: "Kenji",
        position: { x: 400, y: 100 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/kenji/Idle.png",
        framesMax: 4,
        scale: 2.5,
        health: 100,
        damage: 13,
        offset: { x: 15, y: 170 },
        sprites: {
            idle: {
                imageSrc: "./images/kenji/Idle.png",
                framesMax: 4
            },
            run: {
                imageSrc: "./images/kenji/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/kenji/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/kenji/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/kenji/Attack1.png",
                framesMax: 4
            },
            takeHit: {
                imageSrc: "./images/kenji/Take hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/kenji/Death.png",
                framesMax: 7
            }
        },
        attackBox: {
            offset: { x: -170, y: 50 },
            width: 170,
            height: 50
        }
    },
    samuraiMack: {
        name: "Samurai Mack",
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/samuraiMack/Idle.png",
        framesMax: 8,
        scale: 2.5,
        health: 110,
        damage: 15,
        offset: { x: 215, y: 155 },
        sprites: {
            idle: {
                imageSrc: "./images/samuraiMack/Idle.png",
                framesMax: 8
            },
            run: {
                imageSrc: "./images/samuraiMack/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/samuraiMack/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/samuraiMack/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/samuraiMack/Attack1.png",
                framesMax: 6
            },
            takeHit: {
                imageSrc: "./images/samuraiMack/Take Hit - white silhouette.png",
                framesMax: 4
            },
            death: {
                imageSrc: "./images/samuraiMack/Death.png",
                framesMax: 6
            }
        },
        attackBox: {
            offset: { x: 80, y: 50 },
            width: 170,
            height: 50
        }
    },
    shifu: {
        name: "Shifu",
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/shifu/Idle.png",
        framesMax: 8,
        scale: 2.5,
        health: 150,
        damage: 10,
        offset: { x: 15, y: 55 },
        sprites: {
            idle: {
                imageSrc: "./images/shifu/Idle.png",
                framesMax: 10
            },
            run: {
                imageSrc: "./images/shifu/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/shifu/Jump.png",
                framesMax: 3
            },
            fall: {
                imageSrc: "./images/shifu/Fall.png",
                framesMax: 3
            },
            attack1: {
                imageSrc: "./images/shifu/Attack1.png",
                framesMax: 7
            },
            takeHit: {
                imageSrc: "./images/shifu/Take Hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/shifu/Death.png",
                framesMax: 11
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 60,
            height: 50
        }
    }
};