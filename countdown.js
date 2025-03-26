/**
 * Simplified Countdown Timer
 */

// Configuration
const MINT_DATE = new Date("April 9, 2025 12:00:00 UTC").getTime();

function initCountdown() {
    // Get the main countdown elements
    countdownDays = document.getElementById("countdown-days");
    countdownHours = document.getElementById("countdown-hours");
    countdownMinutes = document.getElementById("countdown-minutes");
    countdownSeconds = document.getElementById("countdown-seconds");

    // Start the countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = MINT_DATE - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownDays.textContent = String(days).padStart(2, '0');
        countdownHours.textContent = String(hours).padStart(2, '0');
        countdownMinutes.textContent = String(minutes).padStart(2, '0');
        countdownSeconds.textContent = String(seconds).padStart(2, '0');


    } else {
        // Countdown has finished
        countdownDays.textContent = '00';
        countdownHours.textContent = '00';
        countdownMinutes.textContent = '00';
        countdownSeconds.textContent = '00';
    }
}

// Initialize the countdown when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});