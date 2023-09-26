const confetti = new JSConfetti();

const emojis = ["🦄", "🌈", "✨", "💫", "🌸", "🥽", "💚", "🍉", "🍌", "🧁", "🚀", "💝", "😎"];

var intervall;

function play(min, max) {
    StartConfetti();
    intervall = setTimeout(play, Math.floor(Math.random() * (max - min) + min), min, max);
}

function pause() {
    clearTimeout(intervall);
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function StartConfetti() {
    var random = Math.random();
    confetti.addConfetti({
        emojis: getMultipleRandom(emojis, Math.round(Math.pow(Math.random(), 1.5) * 10)),
        emojiSize: random * 50 + 30,
        confettiRadius: random * 20 + 7,
        confettiNumber: (Math.random() + 0.5 - random) * 50 + 20,
    });
}

const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout;

    const runInterval = () => {
        const timeoutFunction = () => {
            intervalFunction();
            runInterval();
        };

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();

    return {
        clear() {
            clearTimeout(timeout);
        },
    };
};

document.getElementById("button").onclick = function () {
    document.getElementById("button").blur();

    var confettiEffect = localStorage.getItem("confetti-effect");

    if (confettiEffect == "false") {
        pause();
        play(1000, 2000);
        localStorage.setItem("confetti-effect", "true");
        document.getElementById("button").innerHTML = "Stop Confetti";
    } else {
        pause();
        localStorage.setItem("confetti-effect", "false");
        document.getElementById("button").innerHTML = "Start Confetti";
    }
};

function InitialConfetti() {
    var confettiEffect = localStorage.getItem("confetti-effect");

    if (confettiEffect == "true" || confettiEffect == null) {
        pause();
        play(1000, 2000);
        document.getElementById("button").innerHTML = "Stop Confetti";
    } else {
        document.getElementById("button").innerHTML = "Start Confetti";
    }
}

InitialConfetti();
