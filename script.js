// Generate random 4-digit number as the secret code
let secretCode = generateSecretCode();
let attempts = 0;

function generateSecretCode() {
    let code = "";
    while (code.length < 4) {
        let digit = Math.floor(Math.random() * 10).toString();
        if (!code.includes(digit)) {
            code += digit;
        }
    }
    return code;
}

function submitGuess() {
    let guess = document.getElementById("guessInput").value;
    if (validateGuess(guess)) {
        attempts++;
        let result = checkGuess(guess);
        displayResult(result);
        displayAttempts();
    } else {
        alert("Please enter a 4-digit number with unique digits.");
    }
}

function validateGuess(guess) {
    return /^\d{4}$/.test(guess) && new Set(guess).size === 4;
}

function checkGuess(guess) {
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretCode[i]) {
            bulls++;
        } else if (secretCode.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
}

function displayResult(result) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `Bulls: ${result.bulls}, Cows: ${result.cows}`;
    if (result.bulls === 4) {
        resultsDiv.innerHTML += `<br>Congratulations! You guessed the code in ${attempts} attempts!`;
        // Reset the game
        secretCode = generateSecretCode();
        attempts = 0;
    }
}

function displayAttempts() {
    let attemptsDiv = document.getElementById("attempts");
    attemptsDiv.innerHTML = `Total Attempts: ${attempts}`;
}
function giveUp() {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `You gave up! The secret code was ${secretCode}.`;
    // Reset the game
    secretCode = generateSecretCode();
    attempts = 0;
    displayAttempts();
}