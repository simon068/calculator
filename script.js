// Get DOM elements
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

// Initialize variables
let firstValue = '';
let operator = '';
let secondValue = '';

// Add event listener
keys.addEventListener('click', handleButtonClick);

// Button click event handler
function handleButtonClick(event) {
    const target = event.target;
    if (!target.matches('button')) return;

    const action = target.dataset.action;
    const keyContent = target.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // Handle number buttons
    if (!action) {
        handleNumber(keyContent, displayedNum, previousKeyType);
    }

    // Handle decimal button
    if (action === 'decimal') {
        handleDecimal(displayedNum, previousKeyType);
    }

    // Handle clear button
    if (action === 'clear') {
        handleClear();
    }

    // Handle operator buttons
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        handleOperator(action, displayedNum, previousKeyType);
    }

    // Handle equals button
    if (action === 'calculate') {
        handleCalculate(displayedNum, previousKeyType);
    }

    // Limit the number of characters in the display
    if (display.textContent.length > 13) {
        display.textContent = display.textContent.slice(0, 13);
    }
}

// Handle number buttons
function handleNumber(keyContent, displayedNum, previousKeyType) {
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent;
    } else {
        display.textContent = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number';
}

// Handle decimal button
function handleDecimal(displayedNum, previousKeyType) {
    if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
    } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.';
    }
    calculator.dataset.previousKeyType = 'decimal';
}

// Handle clear button
function handleClear() {
    firstValue = '';
    operator = '';
    secondValue = '';
    display.textContent = '0';
    calculator.dataset.previousKeyType = 'clear';
}

// Handle operator buttons
function handleOperator(action, displayedNum, previousKeyType) {
    if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        secondValue = displayedNum;
        display.textContent = calculate(firstValue, operator, secondValue);
        firstValue = display.textContent;
    } else {
        firstValue = displayedNum;
    }
    operator = action;
    calculator.dataset.previousKeyType = 'operator';
}

// Handle equals button
function handleCalculate(displayedNum, previousKeyType) {
    if (firstValue) {
        if (previousKeyType === 'calculate') {
            firstValue = display.textContent;
        }
        secondValue = displayedNum;
        display.textContent = calculate(firstValue, operator, secondValue);
        firstValue = display.textContent;
    } else {
        display.textContent = '0';
    }
    calculator.dataset.previousKeyType = 'calculate';
}

// Calculation function
function calculate(n1, operator, n2) {
    let result = '';
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result.toString().length > 13 ? 'Infinity' : result;
}
