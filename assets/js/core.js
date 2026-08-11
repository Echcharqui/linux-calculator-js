// Performs one calculation using two numbers and one operator.
function calculate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return firstNumber + secondNumber;

        case "-":
            return firstNumber - secondNumber;

        case "x":
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
// Example: "12+5x3" → ["12", "+", "5", "x", "3"]
function splitExpression(expression) {
    // Remove spaces from the expression.
    const refinedExpression = expression.replaceAll(" ", "");

    const tokens = [];

    // Temporarily stores the digits of the current number.
    let currentNumber = "";

    for (const character of refinedExpression) {
        // Numbers and decimal points belong to the current number.
        const isNumberCharacter =
            !isNaN(Number(character)) || character === ".";

        if (isNumberCharacter) {
            currentNumber += character;
        } else {
            // Store the completed number before the operator.
            if (currentNumber !== "") {
                tokens.push(currentNumber);
                currentNumber = "";
            }

            // Store the operator.
            tokens.push(character);
        }
    }

    // Store the final number because no operator follows it.
    if (currentNumber !== "") {
        tokens.push(currentNumber);
    }

    return tokens;
}

// Converts numeric strings into numbers and keeps operators as strings.
// Example: ["12", "+", "5"] → [12, "+", 5].
function convertTokens(tokens) {
    return tokens.map(token => {
        const isNumber =
            token.trim() !== "" && !isNaN(Number(token));

        return isNumber ? Number(token) : token;
    });
}

// Evaluates converted tokens while respecting operator precedence.
// Example: [2, "+", 5, "x", 3] → 17
function evaluateTokens(convertedTokens) {
    // Copy the tokens so the original array is not modified.
    const operation = [...convertedTokens];

    // Combine a leading + or - with the first number.
    // Example: ["-", 5, "+", 2] → [-5, "+", 2]
    if (operation[0] === "-" || operation[0] === "+") {
        const sign = operation[0] === "-" ? -1 : 1;

        operation.splice(0, 2, sign * operation[1]);
    } else if (
        operation[0] === "x" ||
        operation[0] === "/" ||
        isNaN(Number(operation[operation.length - 1]))
    ) {
        // Reject an invalid first operator or missing final number.
        throw new Error("Malformed expression!");
    }

    // Calculate x, / and % first.
    while (
        operation.includes("x") ||
        operation.includes("/") ||
        operation.includes("%")
    ) {
        // Find the position of the first primary operator.
        const operatorIndex = operation.findIndex(token =>
            ["x", "/", "%"].includes(token)
        );

        // Retrieve the operator and the two surrounding numbers.
        const firstNumber = operation[operatorIndex - 1];
        const operator = operation[operatorIndex];
        const secondNumber = operation[operatorIndex + 1];

        const result = calculate(
            operator,
            firstNumber,
            secondNumber
        );

        // Replace number, operator and number with their result.
        // Example: [2, "+", 5, "x", 3] → [2, "+", 15]
        operation.splice(operatorIndex - 1, 3, result);
    }

    // Calculate the remaining + and - from left to right.
    while (operation.length > 1) {
        const firstNumber = operation[0];
        const operator = operation[1];
        const secondNumber = operation[2];

        const result = calculate(
            operator,
            firstNumber,
            secondNumber
        );

        // Replace the first operation with its result.
        operation.splice(0, 3, result);
    }

    // The only remaining value is the final result.
    return operation[0];
}

// Creates a chainable object for processing an expression.
function parseExpression(expression) {
    return {
        // Stores the result of the current processing step.
        value: expression,

        // Splits the expression and keeps the result in value.
        splitExpression() {
            this.value = splitExpression(this.value);

            // Return this object to continue the chain.
            return this;
        },

        // Converts numeric strings into actual numbers.
        convertTokens() {
            this.value = convertTokens(this.value);

            // Return this object to continue the chain.
            return this;
        },

        // Calculates and returns the final result.
        evaluateTokens() {
            return evaluateTokens(this.value);
        }
    };
}