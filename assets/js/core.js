// Performs one calculation using two numbers and one operator.
export function calculate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return firstNumber + secondNumber;

        case "-":
            return firstNumber - secondNumber;

        case "*":
            return firstNumber * secondNumber;

        case "/":
            return firstNumber / secondNumber;

        case "%":
            return firstNumber % secondNumber;

        default:
            throw new Error(`Invalid operator: ${operator}`);
    }
}

// Splits an expression into complete numbers and operators.
// Example: "12+5*3" → ["12", "+", "5", "*", "3"]
export function splitExpression(expression) {
    const refinedExpression = expression.replaceAll(" ", "");
    const tokens = [];
    let currentNumber = "";

    for (const character of refinedExpression) {
        // A decimal point is considered part of the current number.
        const isNumberCharacter =
            !isNaN(Number(character)) || character === ".";

        if (isNumberCharacter) {
            currentNumber += character;
        } else {
            // Store the completed number before storing the operator.
            if (currentNumber !== "") {
                tokens.push(currentNumber);
                currentNumber = "";
            }

            tokens.push(character);
        }
    }

    // Store the last number because no operator comes after it.
    if (currentNumber !== "") {
        tokens.push(currentNumber);
    }

    return tokens;
}

// Converts numeric strings into numbers and leaves operators unchanged.
// Example: ["12", "+", "5"] → [12, "+", 5]
export function convertTokens(tokens) {
    return tokens.map(token => {
        const isNumber = token.trim() !== "" && !isNaN(Number(token));

        return isNumber ? Number(token) : token;
    });
}

// Evaluates converted tokens while respecting operator precedence.
// Example: [2, "+", 5, "*", 3] → 17
export function evaluateTokens(convertedTokens) {
    // Copy the array so the original array is not modified.
    const operation = [...convertedTokens];

    // Combine a leading sign with the first number.
    // Example: ["-", 5, "+", 2] → [-5, "+", 2]
    if (operation[0] === "-" || operation[0] === "+") {
        const sign = operation[0] === "-" ? -1 : 1;

        operation.splice(0, 2, sign * operation[1]);
    }

    // Calculate *, / and % first.
    while (
        operation.includes("*") ||
        operation.includes("/") ||
        operation.includes("%")
    ) {
        // Find the index of the first primary operator.
        // Example: [2, "+", 5, "*", 3] → index 3
        const operatorIndex = operation.findIndex(token =>
            ["*", "/", "%"].includes(token)
        );

        const firstNumber = operation[operatorIndex - 1];
        const operator = operation[operatorIndex];
        const secondNumber = operation[operatorIndex + 1];

        const result = calculate(operator, firstNumber, secondNumber);

        // Replace the two numbers and operator with their result.
        // Example: [2, "+", 5, "*", 3] → [2, "+", 15]
        operation.splice(operatorIndex - 1, 3, result);
    }

    // Calculate the remaining + and - from left to right.
    while (operation.length > 1) {
        const firstNumber = operation[0];
        const operator = operation[1];
        const secondNumber = operation[2];

        const result = calculate(operator, firstNumber, secondNumber);

        operation.splice(0, 3, result);
    }

    // The last remaining value is the final result.
    return operation[0];
}