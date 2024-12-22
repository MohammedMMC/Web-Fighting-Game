const PLAYERS_DATA = {
    kenji: {
        name: "Kenji",
        position: { x: 400, y: 100 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/kenji/Idle.png",
        framesMax: 4,
        giveHitAt: 3,
        scale: 2.5,
        health: 100,
        damage: 13,
        offset: { x: 215, y: 170 },
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
        giveHitAt: 5,
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
        giveHitAt: 5,
        scale: 2.5,
        health: 150,
        damage: 10,
        offset: { x: 130, y: 55 },
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
            width: 175,
            height: 50
        }
    },
    huntress1: {
        name: "Huntress",
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/huntress/Idle.png",
        framesMax: 8,
        giveHitAt: 4,
        scale: 2.8,
        health: 100,
        damage: 12,
        offset: { x: 150, y: 120 },
        sprites: {
            idle: {
                imageSrc: "./images/huntress/Idle.png",
                framesMax: 8
            },
            run: {
                imageSrc: "./images/huntress/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/huntress/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/huntress/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/huntress/Attack1.png",
                framesMax: 5
            },
            takeHit: {
                imageSrc: "./images/huntress/Take Hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/huntress/Death.png",
                framesMax: 8
            }
        },
        attackBox: {
            offset: { x: 10, y: 50 },
            width: 175,
            height: 50
        }
    },
    huntress2: {
        name: "Huntress 2",
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/huntress2/Idle.png",
        framesMax: 10,
        giveHitAt: 4,
        scale: 2.65,
        health: 80,
        damage: 12,
        offset: { x: 100, y: 30 },
        sprites: {
            idle: {
                imageSrc: "./images/huntress2/Idle.png",
                framesMax: 10
            },
            run: {
                imageSrc: "./images/huntress2/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/huntress2/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/huntress2/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/huntress2/Attack.png",
                framesMax: 6
            },
            takeHit: {
                imageSrc: "./images/huntress2/Get Hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/huntress2/Death.png",
                framesMax: 10
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 350,
            height: 50
        }
    }
};