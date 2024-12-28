const PLAYERS_DATA = {
    genji: {
        name: "Genji",
        position: { x: 80, y: 100 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/genji/Idle.png",
        viewSrc: "./images/genji/View.png",
        framesMax: 4,
        giveHitAt: 3,
        scale: 2.5,
        health: 100,
        damage: 13,
        offset: { x: 215, y: 170 },
        sprites: {
            idle: {
                imageSrc: "./images/genji/Idle.png",
                framesMax: 4
            },
            run: {
                imageSrc: "./images/genji/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/genji/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/genji/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/genji/Attack1.png",
                framesMax: 4
            },
            takeHit: {
                imageSrc: "./images/genji/Take hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/genji/Death.png",
                framesMax: 7
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 220,
            height: 50
        }
    },
    samurai: {
        name: "Samurai",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/samurai/Idle.png",
        viewSrc: "./images/samurai/View.png",
        framesMax: 8,
        giveHitAt: 5,
        scale: 2.5,
        health: 110,
        damage: 15,
        offset: { x: 205, y: 155 },
        sprites: {
            idle: {
                imageSrc: "./images/samurai/Idle.png",
                framesMax: 8
            },
            run: {
                imageSrc: "./images/samurai/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/samurai/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/samurai/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/samurai/Attack1.png",
                framesMax: 6
            },
            takeHit: {
                imageSrc: "./images/samurai/Take Hit - white silhouette.png",
                framesMax: 4
            },
            death: {
                imageSrc: "./images/samurai/Death.png",
                framesMax: 6
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 230,
            height: 50
        }
    },
    shifu: {
        name: "Shifu",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/shifu/Idle.png",
        viewSrc: "./images/shifu/View.png",
        framesMax: 8,
        giveHitAt: 5,
        scale: 2.5,
        health: 150,
        damage: 10,
        offset: { x: 125, y: 55 },
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
    huntress: {
        name: "Huntress",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/huntress/Idle.png",
        viewSrc: "./images/huntress/View.png",
        framesMax: 10,
        giveHitAt: 4,
        scale: 2.65,
        health: 80,
        damage: 12,
        offset: { x: 90, y: 30 },
        sprites: {
            idle: {
                imageSrc: "./images/huntress/Idle.png",
                framesMax: 10
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
                imageSrc: "./images/huntress/Attack.png",
                framesMax: 6
            },
            takeHit: {
                imageSrc: "./images/huntress/Get Hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/huntress/Death.png",
                framesMax: 10
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 350,
            height: 50
        }
    },
    evilWizard: {
        name: "Evil Wizard",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/evilWizard/Idle.png",
        viewSrc: "./images/evilWizard/View.png",
        framesMax: 10,
        giveHitAt: 10,
        scale: 2.5,
        health: 80,
        damage: 20,
        offset: { x: 140, y: 90 },
        sprites: {
            idle: {
                imageSrc: "./images/evilWizard/Idle.png",
                framesMax: 10
            },
            run: {
                imageSrc: "./images/evilWizard/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/evilWizard/Jump.png",
                framesMax: 3
            },
            fall: {
                imageSrc: "./images/evilWizard/Fall.png",
                framesMax: 3
            },
            attack1: {
                imageSrc: "./images/evilWizard/Attack.png",
                framesMax: 13
            },
            takeHit: {
                imageSrc: "./images/evilWizard/Get hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/evilWizard/Death.png",
                framesMax: 18
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 175,
            height: 50
        }
    },
    halloweenWizard: {
        name: "Halloween Wizard",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/halloweenWizard/Idle.png",
        viewSrc: "./images/halloweenWizard/View.png",
        framesMax: 8,
        giveHitAt: 5,
        scale: 2.3,
        health: 110,
        damage: 10,
        offset: { x: 253, y: 235 },
        sprites: {
            idle: {
                imageSrc: "./images/halloweenWizard/Idle.png",
                framesMax: 8
            },
            run: {
                imageSrc: "./images/halloweenWizard/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/halloweenWizard/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/halloweenWizard/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/halloweenWizard/Attack1.png",
                framesMax: 8
            },
            takeHit: {
                imageSrc: "./images/halloweenWizard/Take hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/halloweenWizard/Death.png",
                framesMax: 7
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 220,
            height: 50
        }
    },
    wizard: {
        name: "Wizard",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/wizard/Idle.png",
        viewSrc: "./images/wizard/View.png",
        framesMax: 6,
        giveHitAt: 6,
        scale: 1.7,
        health: 105,
        damage: 15,
        offset: { x: 140, y: 90 },
        sprites: {
            idle: {
                imageSrc: "./images/wizard/Idle.png",
                framesMax: 6
            },
            run: {
                imageSrc: "./images/wizard/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/wizard/Jump.png",
                framesMax: 2
            },
            fall: {
                imageSrc: "./images/wizard/Fall.png",
                framesMax: 2
            },
            attack1: {
                imageSrc: "./images/wizard/Attack2.png",
                framesMax: 8
            },
            takeHit: {
                imageSrc: "./images/wizard/Hit.png",
                framesMax: 4
            },
            death: {
                imageSrc: "./images/wizard/Death.png",
                framesMax: 7
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 180,
            height: 50
        }
    },
    warrior: {
        name: "Warrior",
        position: { x: 80, y: 0 },
        velocity: { x: 0, y: 0 },
        imageSrc: "./images/warrior/Idle.png",
        viewSrc: "./images/warrior/View.png",
        framesMax: 10,
        giveHitAt: 5,
        scale: 2.8,
        health: 150,
        damage: 10,
        offset: { x: 190, y: 133 },
        sprites: {
            idle: {
                imageSrc: "./images/warrior/Idle.png",
                framesMax: 10
            },
            run: {
                imageSrc: "./images/warrior/Run.png",
                framesMax: 8
            },
            jump: {
                imageSrc: "./images/warrior/Jump.png",
                framesMax: 3
            },
            fall: {
                imageSrc: "./images/warrior/Fall.png",
                framesMax: 3
            },
            attack1: {
                imageSrc: "./images/warrior/Attack1.png",
                framesMax: 7
            },
            takeHit: {
                imageSrc: "./images/warrior/Take hit.png",
                framesMax: 3
            },
            death: {
                imageSrc: "./images/warrior/Death.png",
                framesMax: 7
            }
        },
        attackBox: {
            offset: { x: 0, y: 50 },
            width: 155,
            height: 50
        }
    },
};