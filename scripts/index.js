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

let player = new Fighter(PLAYERS_DATA.samuraiMack);
let enemy = new Fighter(PLAYERS_DATA.kenji);

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
    if (!startTheGame) {
        switch (e.key) {
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
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                choosePlayer(-1, true);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                choosePlayer(1, true);
                break;
            case 'ArrowDown':
                e.preventDefault();
                toggleSelectPlayer(true);
                break;
        }
    }

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

animate();
choosePlayer(0);
choosePlayer(0, true);
function startGame() {
    playersSecletion.style.display = "none";
    startTheGame = true;
    decreaseTimer();
}

// Main Menu Functions

let startingSec = 3;
let statingGameTimeoutInterval = null;

function toggleSelectPlayer(secNDfighter) {
    const all1Players = [...playersSecletion.querySelectorAll("#player1fighters .players2Select")];
    const all2Players = [...playersSecletion.querySelectorAll("#player2fighters .players2Select")];
    if (!secNDfighter) {
        const isSelect1 = !all1Players.map(el => el.classList.contains("selected")).includes(true);
        all1Players.forEach(el => el.classList.contains("active") ? el.classList[isSelect1 ? "add" : "remove"]("selected") : null);
    } else {
        const isSelect2 = !all2Players.map(el => el.classList.contains("selected")).includes(true);
        all2Players.forEach(el => el.classList.contains("active") ? el.classList[isSelect2 ? "add" : "remove"]("selected") : null);
    }

    const isSelect1 = !all1Players.map(el => el.classList.contains("selected")).includes(true);
    const isSelect2 = !all2Players.map(el => el.classList.contains("selected")).includes(true);

    const selected1FighterName = all1Players.filter(el => el.classList.contains("selected"))[0].getAttribute("--data-fighterName");
    const selected2FighterName = all2Players.filter(el => el.classList.contains("selected"))[0].getAttribute("--data-fighterName");

    if (!isSelect1 && !isSelect2) {
        startingSec = 3;
        statingGameTimeoutInterval = setInterval(() => {
            playersSecletionTitle.textContent = `Starting In ${startingSec}..`;
            startingSec--;
            if (startingSec <= 0) {
                player = new Fighter(PLAYERS_DATA[selected1FighterName]);
                enemy = new Fighter(PLAYERS_DATA[selected2FighterName]);
                startGame();
                clearInterval(statingGameTimeoutInterval);
                playersSecletionTitle.textContent = "Started!";
            }
        }, 1000);
    } else {
        playersSecletionTitle.textContent = "Select Your Player!";
        clearInterval(statingGameTimeoutInterval);
    }
}

function choosePlayer(count, secNDfighter) {
    if (!secNDfighter) {
        const all1Players = [...playersSecletion.querySelectorAll("#player1fighters .players2Select")];
        if (all1Players.map(el => el.classList.contains("selected")).includes(true)) return;
        let selected1Index = all1Players.findIndex(el => el.classList.contains("active"));
        if (!selected1Index || selected1Index === -1) selected1Index = 0;
        selected1Index += count;
        if (selected1Index < 0) selected1Index = all1Players.length - 1;
        all1Players.forEach(el => el.classList.remove("active"));
        if (all1Players.length <= selected1Index) selected1Index = 0;
        all1Players[selected1Index]?.classList?.add("active");
        const selected1FighterName = all1Players.filter(el => el.classList.contains("active"))[0].getAttribute("--data-fighterName");
        changePlayersInfo(PLAYERS_DATA[selected1FighterName]);
    } else {
        const all2Players = [...playersSecletion.querySelectorAll("#player2fighters .players2Select")];
        if (all2Players.map(el => el.classList.contains("selected")).includes(true)) return;
        let selected2Index = all2Players.findIndex(el => el.classList.contains("active"));
        if (!selected2Index || selected2Index === -1) selected2Index = 0;
        selected2Index += count;
        if (selected2Index < 0) selected2Index = all2Players.length - 1;
        all2Players.forEach(el => el.classList.remove("active"));
        if (all2Players.length <= selected2Index) selected2Index = 0;
        all2Players[selected2Index]?.classList?.add("active");
        const selected2FighterName = all2Players.filter(el => el.classList.contains("active"))[0].getAttribute("--data-fighterName");
        changePlayersInfo(PLAYERS_DATA[selected2FighterName], true);
    }
}

function changePlayersInfo(playerData, secNDfighter = false) {
    if (!playerData) return;
    const playerInfoElement = document.querySelector(`.playersSecletion .player${secNDfighter ? "2" : "1"}Info`);

    const healthSpan = playerInfoElement.querySelector("div:nth-child(1) > span");
    const powerSpan = playerInfoElement.querySelector("div:nth-child(2) > span");
    const rangeSpan = playerInfoElement.querySelector("div:nth-child(3) > span");
    const speedSpan = playerInfoElement.querySelector("div:nth-child(4) > span");

    let gameMaxHealth = 0;
    let gameMaxPower = 0;
    let gameMaxRange = 0;
    let gameMaxSpeed = Infinity;

    for (const ftr in PLAYERS_DATA) {
        if (gameMaxHealth < PLAYERS_DATA[ftr].health) gameMaxHealth = PLAYERS_DATA[ftr].health;
        if (gameMaxPower < PLAYERS_DATA[ftr].damage) gameMaxPower = PLAYERS_DATA[ftr].damage;
        if (gameMaxRange < PLAYERS_DATA[ftr].attackBox.width) gameMaxRange = PLAYERS_DATA[ftr].attackBox.width;
        if (gameMaxSpeed > PLAYERS_DATA[ftr].giveHitAt) gameMaxSpeed = PLAYERS_DATA[ftr].giveHitAt;
    }

    healthSpan.style.setProperty('--percent', `${Math.round((100 * playerData.health) / gameMaxHealth)}%`);
    powerSpan.style.setProperty('--percent', `${Math.round((100 * playerData.damage) / gameMaxPower)}%`);
    rangeSpan.style.setProperty('--percent', `${Math.round((100 * playerData.attackBox.width) / gameMaxRange)}%`);
    speedSpan.style.setProperty('--percent', `${Math.round((100 * gameMaxSpeed) / playerData.giveHitAt)}%`);
}