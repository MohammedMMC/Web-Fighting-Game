const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gameTimer = document.querySelector(".timer");
const gameStatus = document.querySelector(".gamestatus");
const playerHealth = document.querySelector(".playerHealth");
const enemyHealth = document.querySelector(".enemyHealth");

// Canvas Sie
canvas.width = 1024;
canvas.height = 576;

// Variables
const GRAVITY = 0.7;
const KEYS = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false, },
    ArrowRight: { pressed: false },
}

let timer = 60;
let timerId;

const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./images/background.png"
});

const shop = new Sprite({
    position: { x: 620, y: 128 },
    imageSrc: "./images/shop.png",
    scale: 2.75,
    framesMax: 6
});

ctx.fillRect(0, 0, canvas.width, canvas.height);

const player = new Fighter(PLAYERS_DATA.huntress2);
const enemy = new Fighter(PLAYERS_DATA.kenji);

function animate() {
    // Requesting Animation Frame
    window.requestAnimationFrame(animate);

    // Clearing The Background and Updating The Players.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    // Player Movement
    player.velocity.x = 0;
    if (KEYS.a.pressed && player.lastKey === 'a') {
        player.switchSprite('run');
        player.velocity.x = -5;
    } else if (KEYS.d.pressed && player.lastKey === 'd') {
        player.switchSprite('run');
        player.velocity.x = 5;
    } else {
        player.switchSprite('idle');
    }
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    // Enemy Movement
    enemy.velocity.x = 0;
    if (KEYS.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (KEYS.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // Detect for collision & enemy gets hit
    if (
        rectCollision({ rect1: player, rect2: enemy }) &&
        player.isAttacking && player.framesCurrent === enemy.giveHitAt - 1
    ) {
        player.isAttacking = false;
        enemy.takeHit(player);
        gsap.to(enemyHealth, {
            width: (enemy.health * 100 / (enemy.maxHealth)) + "%"
        });
    }
    if (
        rectCollision({ rect1: enemy, rect2: player }) &&
        enemy.isAttacking && enemy.framesCurrent === player.giveHitAt - 1
    ) {
        enemy.isAttacking = false;
        player.takeHit(enemy);
        gsap.to(playerHealth, {
            width: (player.health * 100 / (player.maxHealth)) + "%"
        });
    }
    // if player misses
    if (player.isAttacking && player.framesCurrent === enemy.giveHitAt - 1) {
        player.isAttacking = false;
    }
    if (enemy.isAttacking && enemy.framesCurrent === player.giveHitAt - 1) {
        enemy.isAttacking = false;
    }



    // End Game if dead :)
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}

window.addEventListener("keydown", (e) => {
    if (!player.dead) {
        switch (e.key) {
            case 'a':
                KEYS.a.pressed = true;
                player.lastKey = e.key;
                e.preventDefault();
                break;
            case 'd':
                KEYS.d.pressed = true;
                player.lastKey = e.key;
                e.preventDefault();
                break;
            case 'w':
                player.velocity.y = -20;
                e.preventDefault();
                break;
            case ' ':
                player.attack();
                e.preventDefault();
                break;
        }
    }
    if (!enemy.dead) {
        switch (e.key) {
            case 'ArrowRight':
                KEYS.ArrowRight.pressed = true;
                enemy.lastKey = e.key;
                e.preventDefault();
                break;
            case 'ArrowLeft':
                KEYS.ArrowLeft.pressed = true;
                enemy.lastKey = e.key;
                e.preventDefault();
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                e.preventDefault();
                break;
            case 'ArrowDown':
                enemy.attack();
                e.preventDefault();
                break;
        }
    }

});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'a':
            KEYS.a.pressed = false;
            break;
        case 'd':
            KEYS.d.pressed = false;
            break;
        case 'ArrowRight':
            KEYS.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            KEYS.ArrowLeft.pressed = false;
            break;
    }
});

// function startGame() {
animate();
decreaseTimer();
// }