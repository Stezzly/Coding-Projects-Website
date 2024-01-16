// timer.js
let timer;
let seconds = 0;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    updateTimer();
}

function updateTimer() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    document.getElementById('timer').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`;

    seconds++;
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}
