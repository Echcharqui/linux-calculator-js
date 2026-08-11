// Stores the expression currently being written.
let currentOps = "";

// Will store completed calculations for the history feature.
let opsHistory = [];

// Stores an error and blocks input until the calculator is cleared.
let calculationError = "";

// Adds the clicked button value to the current expression.
function write(event) {
    // Prevent writing while the calculator is in an error state.
    if (calculationError === "") {
        // Retrieve the internal value from data-value.
        const buttonValue = event.currentTarget.dataset.value;

        // Add the value to the expression.
        currentOps += buttonValue;

        // Display the updated expression.
        currentOpsField.textContent = currentOps;
    }
}

// Calculates the current expression when "=" is clicked.
function makeTheOperations() {
    // Prevent another calculation while an error exists.
    if (calculationError === "") {
        try {
            const result = parseExpression(currentOps)
                .splitExpression()
                .convertTokens()
                .evaluateTokens();

            // Store and display the result.
            currentOps = result;
            currentOpsField.textContent = result;
        } catch (error) {
            // Apply error styling and store the error.
            opsContainer.classList.add("error");
            calculationError = error;

            console.log(calculationError);
        }
    }
}

// Clears the expression, error state and display.
function clearCurrentOpsField() {
    currentOps = "";
    calculationError = "";

    currentOpsField.textContent = "";
    opsContainer.classList.remove("error");
}