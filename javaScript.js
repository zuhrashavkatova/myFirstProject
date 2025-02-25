const display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    previousInput = null;
    operation = null;
    shouldResetDisplay = false; // Reset this flag
    updateDisplay();
}

function handleNumberClick(number) {
    if (shouldResetDisplay) {
        currentInput = number; // Start a new number
        shouldResetDisplay = false; // Reset the flag after using it
    } else {
        // Do not allow leading zeros except for "0"
        if (currentInput === '0' && number === '0') {
            return; // Prevent adding multiple leading zeros
        }
        currentInput = currentInput === '0' ? number : currentInput + number; // Concatenate number
    }
    updateDisplay();
}

function handleOperationClick(op) {
    if (previousInput === null) {
        previousInput = currentInput; // Store current input
    } else if (!shouldResetDisplay) {
        performCalculation(); // Calculate previous input with current input
    }
    operation = op;
    shouldResetDisplay = true; // Reset display for next input
}

function performCalculation() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result = 0;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '÷':
            result = prev / curr;
            break;
    }

    currentInput = result.toString();
    updateDisplay();
    operation = null;
    previousInput = null;
}

function handleEqualsClick() {
    if (operation !== null) {
        performCalculation();
        shouldResetDisplay = true; // Reset display for next input
    }
}

function handleBackspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
    }
    updateDisplay();
}

// Add event listeners for buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', (e) => {
        handleNumberClick(e.target.textContent);
    });
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.textContent === '=') {
            handleEqualsClick();
        } else {
            handleOperationClick(e.target.textContent);
        }
    });
});

document.getElementById('backspace').addEventListener('click', handleBackspace);

// Handle keyboard events
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key === 'Enter' || e.key === '=') {
        handleEqualsClick();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperationClick(e.key === '*' ? 'x' : e.key);
    }
});
