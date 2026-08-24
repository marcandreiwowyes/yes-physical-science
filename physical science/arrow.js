let bowScore = 0;
let bowArrows = 10;
let bowPlaying = false;
let bowPaused = false;

let highScore =
    localStorage.getItem("newtonBowHighScore") || 0;

const bowGameArea =
    document.getElementById("bowGameArea");

const bowTarget =
    document.getElementById("bowTarget");

const shootingArrow =
    document.getElementById("shootingArrow");

function closeLesson() {
    document.getElementById("lessonPopup").style.display = "none";
    startBowGame();
}

function startBowGame() {
    bowScore = 0;
    bowArrows = 10;
    bowPlaying = true;
    bowPaused = false;

    updateBowInfo();

    document.getElementById("bowGameOver").classList.add("hidden");
    document.getElementById("bowPause").classList.add("hidden");

    shootingArrow.style.display = "block";
}

bowGameArea.addEventListener("mousemove", function(event) {
    if (!bowPlaying || bowPaused) return;

    const rect = bowGameArea.getBoundingClientRect();
    const bowX = rect.width * .08 + 70;
    const bowY = rect.height / 2;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const angle =
        Math.atan2(mouseY - bowY, mouseX - bowX) * 180 / Math.PI;

    shootingArrow.style.transform =
        `translateY(-50%) rotate(${angle}deg)`;
});

bowGameArea.addEventListener("click", function(event) {
    if (!bowPlaying || bowPaused) return;

    if (event.target.closest(".bow-overlay")) return;

    shootArrow();
});

function shootArrow() {
    if (bowArrows <= 0) return;

    bowArrows--;
    updateBowInfo();

    const gameRect =
        bowGameArea.getBoundingClientRect();

    const targetRect =
        bowTarget.getBoundingClientRect();

    const startX =
        gameRect.width * .08 + 70;

    const startY =
        gameRect.height / 2;

    const targetX =
        targetRect.left -
        gameRect.left +
        targetRect.width / 2;

    const targetY =
        targetRect.top -
        gameRect.top +
        targetRect.height / 2;

    const angle =
        Math.atan2(
            targetY - startY,
            targetX - startX
        ) * 180 / Math.PI;

    shootingArrow.style.transform =
        'translateY(-50%) rotate(${angle}deg)';

    shootingArrow.style.transition =
        "left .45s linear";

    shootingArrow.style.left =
        targetX + "px";

    setTimeout(function() {
        checkShot(
            targetX,
            targetY,
            targetRect,
            gameRect
        );

        resetArrow();
    }, 450);
}

function checkShot(
    arrowX,
    arrowY,
    targetRect,
    gameRect
) {
    const centerX =
        targetRect.left -
        gameRect.left +
        targetRect.width / 2;

    const centerY =
        targetRect.top -
        gameRect.top +
        targetRect.height / 2;

    const distance =
        Math.sqrt(
            Math.pow(arrowX - centerX, 2) +
            Math.pow(arrowY - centerY, 2)
        );

    if (distance < 20) {
        bowScore += 30;
        showHit(" BULLSEYE! +30");
    } else if (distance < 40) {
        bowScore += 20;
        showHit("GREAT HIT! +20");
    } else if (distance < 65) {
        bowScore += 10;
        showHit("HIT! +10");
    } else {
        showHit("MISS!");
    }

    updateBowInfo();

    if (bowArrows <= 0) {
        setTimeout(endBowGame, 600);
    }
}

function resetArrow() {
    shootingArrow.style.transition = "none";
    shootingArrow.style.left = "calc(8% + 70px)";
}

function showHit(text) {
    const message = document.createElement("div");

    message.textContent = text;
    message.style.position = "absolute";
    message.style.left = "50%";
    message.style.top = "15%";
    message.style.transform = "translateX(-50%)";
    message.style.zIndex = "200";
    message.style.color = "white";
    message.style.fontFamily = "Orbitron, sans-serif";
    message.style.fontWeight = "bold";
    message.style.textShadow = "0 0 15px #9b8fff";

    bowGameArea.appendChild(message);

    setTimeout(() => message.remove(), 700);
}

function updateBowInfo() {
    document.getElementById("bowScore").textContent = bowScore;
    document.getElementById("bowArrows").textContent = bowArrows;
    document.getElementById("bowHighScore").textContent = highScore;
}

function toggleBowPause() {
    if (!bowPlaying) return;

    if (bowPaused) {
        resumeBowGame();
    } else {
        bowPaused = true;

        document.getElementById("bowPause").classList.remove("hidden");
        document.getElementById("bowPauseButton").textContent = "▶ Resume";
    }
}

function resumeBowGame() {
    bowPaused = false;

    document.getElementById("bowPause").classList.add("hidden");
    document.getElementById("bowPauseButton").textContent = "⏸ Pause";
}

function endBowGame() {
    bowPlaying = false;

    if (bowScore > highScore) {
        highScore = bowScore;

        localStorage.setItem(
            "newtonBowHighScore",
            highScore
        );
    }

    document.getElementById("bowFinalScore").textContent = bowScore;
    document.getElementById("bowGameOver").classList.remove("hidden");

    updateBowInfo();
}

function restartBowGame() {
    document.getElementById("bowGameOver").classList.add("hidden");
    startBowGame();
}

function exitBowGame() {
    bowPlaying = false;
    bowPaused = false;
    bowScore = 0;
    bowArrows = 10;

    resetArrow();

    document.getElementById("bowPause").classList.add("hidden");
    document.getElementById("bowGameOver").classList.add("hidden");
    document.getElementById("lessonPopup").style.display = "flex";

    updateBowInfo();
}