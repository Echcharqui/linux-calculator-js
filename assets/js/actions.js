// Stores the expression currently being written.
let currentOps = "";

// Will store completed calculations for the history feature.
let opsHistory = [];

// Stores an error and blocks input until the calculator is cleared.
let calculationError = "";

// Rebuilds the history HTML using the opsHistory array.
function updateHistory() {
    // Remove the currently displayed history.
    historyContainer.innerHTML = "";

    // Create one story element for every saved calculation.
    opsHistory.forEach(historyItem => {
        // Main row.
        const story = document.createElement("div");
        story.classList.add("story");

        // Full operation.
        const fullOperation = document.createElement("div");
        fullOperation.classList.add("full_operation");
        fullOperation.textContent = historyItem.fullOperation;

        // Equal sign.
        const equalSign = document.createElement("div");
        equalSign.classList.add("equal_sign");
        equalSign.textContent = "=";

        // Calculation result.
        const result = document.createElement("div");
        result.classList.add("result");
        result.textContent = historyItem.result;

        // Insert the three fields inside the story row.
        story.append(fullOperation, equalSign, result);

        // Insert the completed story inside the history container.
        historyContainer.appendChild(story);
    });

    historyContainer.scrollTop = historyContainer.scrollHeight;
}

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

            // Save the operation before replacing currentOps with its result.
            opsHistory.push({
                fullOperation: currentOps,
                result: result
            })

            // Store and display the result and update history container.
            currentOps = result;
            currentOpsField.textContent = result;
            updateHistory()
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