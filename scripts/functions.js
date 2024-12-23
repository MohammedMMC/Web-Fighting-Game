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

function rectCollision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    );
}