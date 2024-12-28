const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gameTimer = document.querySelector(".timer");
const gameStatus = document.querySelector(".gamestatus");
const playerHealth = document.querySelector(".playerHealth");
const enemyHealth = document.querySelector(".enemyHealth");
const playersSecletion = document.querySelector(".playersSecletion");
const playersSecletionTitle = document.querySelector(".playersSecletion h2");

// Start Var.
let startTheGame = false;

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

let player = new Fighter(PLAYERS_DATA.samurai);
let enemy = new Fighter({
    ...PLAYERS_DATA.genji,
    faceDir: -1,
    position: { x: 850, y: PLAYERS_DATA.genji.position.y }
});

function animate() {
    // Requesting Animation Frame
    window.requestAnimationFrame(animate);
    // Close the loop if the game is not started!
    if (!startTheGame) return;

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
        player.velocity.x = -5;
        player.faceDir = -1;
        player.switchSprite('run');
    } else if (KEYS.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.faceDir = 1;
        player.switchSprite('run');
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
        enemy.faceDir = -1;
        enemy.switchSprite('run');
    } else if (KEYS.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.faceDir = 1;
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
        player.isAttacking && player.framesCurrent === player.giveHitAt
    ) {
        player.isAttacking = false;
        enemy.takeHit(player);
        gsap.to(enemyHealth, {
            width: (enemy.health * 100 / (enemy.maxHealth)) + "%"
        });
    }
    if (
        rectCollision({ rect1: enemy, rect2: player }) &&
        enemy.isAttacking && enemy.framesCurrent === enemy.giveHitAt
    ) {
        enemy.isAttacking = false;
        player.takeHit(enemy);
        gsap.to(playerHealth, {
            width: (player.health * 100 / (player.maxHealth)) + "%"
        });
    }
    // if player misses
    if (player.isAttacking && player.framesCurrent === player.giveHitAt) {
        player.isAttacking = false;
    }
    if (enemy.isAttacking && enemy.framesCurrent === enemy.giveHitAt) {
        enemy.isAttacking = false;
    }


    // End Game if dead :)
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}

window.addEventListener("keydown", (e) => {
    console.log(e);

    const pressedKey = e.key.toLowerCase();

    if (!startTheGame) {
        switch (pressedKey) {
            case 'a':
                e.preventDefault();
                choosePlayer(-1, false);
                break;
            case 'd':
                e.preventDefault();
                choosePlayer(1, false);
                break;
            case ' ':
                e.preventDefault();
                toggleSelectPlayer(false);
                break;
        }
        switch (pressedKey) {
            case 'ArrowRight'.toLowerCase():
                e.preventDefault();
                choosePlayer(-1, true);
                break;
            case 'ArrowLeft'.toLowerCase():
                e.preventDefault();
                choosePlayer(1, true);
                break;
            case 'ArrowDown'.toLowerCase():
                e.preventDefault();
                toggleSelectPlayer(true);
                break;
        }
    }

    if (!player.dead) {
        switch (pressedKey) {
            case 'a':
                KEYS.a.pressed = true;
                player.lastKey = 'a';
                e.preventDefault();
                break;
            case 'd':
                KEYS.d.pressed = true;
                player.lastKey = 'd';
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
        switch (pressedKey) {
            case 'ArrowRight'.toLowerCase():
                KEYS.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                e.preventDefault();
                break;
            case 'ArrowLeft'.toLowerCase():
                KEYS.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                e.preventDefault();
                break;
            case 'ArrowUp'.toLowerCase():
                enemy.velocity.y = -20;
                e.preventDefault();
                break;
            case 'ArrowDown'.toLowerCase():
                enemy.attack();
                e.preventDefault();
                break;
        }
    }

});

window.addEventListener("keyup", (e) => {
    const pressedKey = e.key.toLowerCase();

    switch (pressedKey) {
        case 'a':
            KEYS.a.pressed = false;
            break;
        case 'd':
            KEYS.d.pressed = false;
            break;
        case 'ArrowRight'.toLowerCase():
            KEYS.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft'.toLowerCase():
            KEYS.ArrowLeft.pressed = false;
            break;
    }
});

function startGame() {
    playersSecletion.style.display = "none";
    startTheGame = true;
    decreaseTimer();
}

// Load fighters (For Selection)
const newFighterView = (key, {name, viewSrc}) => `
<div class="players2Select" --data-fighterName="${key}"
style="--fighterViewURL: url('${viewSrc}');">${name}</div>
`;

const player1Fighters = document.querySelector("#player1fighters");
const player2Fighters = document.querySelector("#player2fighters");

for (const key in PLAYERS_DATA) {
    player1Fighters.innerHTML += newFighterView(key, PLAYERS_DATA[key]);
    player2Fighters.innerHTML += newFighterView(key, PLAYERS_DATA[key]);
}

// Start Animation
animate();
choosePlayer(0);
choosePlayer(0, true);