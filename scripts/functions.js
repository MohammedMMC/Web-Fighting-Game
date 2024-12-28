function decreaseTimer() {
    if (!startTheGame) return;
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        gameTimer.textContent = timer;
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId });
    }
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    gameStatus.style.display = "flex";
    if (player.health === enemy.health) {
        gameStatus.textContent = "Tie!";
    } else if (player.health > enemy.health) {
        gameStatus.textContent = "Player 1 Won!";
    } else if (enemy.health > player.health) {
        gameStatus.textContent = "Player 2 Won!";
    }
}


/**
 * @param {{ rect1: Fighter, rect2: Fighter }} param0 
 */
function rectCollision({ rect1, rect2 }) {
    const rect1X = rect1.faceDir < 0
        ? rect1.attackBox.position.x - rect1.attackBox.width / 2
        : rect1.attackBox.position.x;

    return (
        rect1X + rect1.attackBox.width >= rect2.position.x &&
        rect1X <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    );
}

// Select Fighter (Main Menu) Functions

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

    const selected1FighterName = all1Players.filter(el => el.classList.contains("selected"))[0]?.getAttribute("--data-fighterName");
    const selected2FighterName = all2Players.filter(el => el.classList.contains("selected"))[0]?.getAttribute("--data-fighterName");

    if (!isSelect1 && !isSelect2) {
        startingSec = 3;
        statingGameTimeoutInterval = setInterval(() => {
            playersSecletionTitle.textContent = `Starting In ${startingSec}..`;
            if (startingSec <= 0) {
                player = new Fighter({
                    ...PLAYERS_DATA[selected1FighterName],
                    faceDir: 1,
                    position: { x: 80, y: PLAYERS_DATA[selected1FighterName].position.y }
                });
                enemy = new Fighter({
                    ...PLAYERS_DATA[selected2FighterName],
                    faceDir: -1,
                    position: { x: 850, y: PLAYERS_DATA[selected2FighterName].position.y }
                });
                startGame();
                clearInterval(statingGameTimeoutInterval);
                playersSecletionTitle.textContent = "Started!";
            }
            startingSec--;
        }, 1000);
    } else {
        clearInterval(statingGameTimeoutInterval);
        playersSecletionTitle.textContent = "Select Your Player!";
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
        const selected1FighterName = all1Players.filter(el => el.classList.contains("active"))[0]?.getAttribute("--data-fighterName");
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