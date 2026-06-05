let aNumber = 0;
let bNumber = 0;
let operator = '';


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function operate(aNumber, bNumber, operator) {
    // Determines what function to call for answer

    let result = 0;

    switch(operator) {
        case '+':
            result = add(aNumber, bNumber);
            break;
        case '-':
            result = subtract(aNumber, bNumber);
            break;
        case '*':
            result = multiply(aNumber, bNumber);
            break;
        case '/':
            result = divide(aNumber, bNumber);
            break;
        default:
            console.log("Unknown operator");
    }

    return result;
}