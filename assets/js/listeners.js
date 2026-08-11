// Connect every active button to the write function.
activeButtons.forEach(button => {
    button.addEventListener("click", write);
});

// Calculate the expression when "=" is clicked.
equalButton.addEventListener("click", makeTheOperations);

// Reset the calculator when "C" is clicked.
clearBtn.addEventListener("click", clearCurrentOpsField);