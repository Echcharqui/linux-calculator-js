// Connect every active button to the write function.
activeButtons.forEach(button => {
    button.addEventListener("click", write);
});

// Calculate the expression when "=" is clicked.
equalButton.addEventListener("click", makeTheOperations);

// Reset the calculator when "C" is clicked.
clearBtn.addEventListener("click", clearCurrentOpsField);

// clear history when clicking "clear history"
clearHitory.addEventListener("click", clearHistory);

// toggel menu
menuButton.addEventListener("click", toggleDropList);

document.addEventListener("click", (event) => {
    const clickedOutside =
        !dropList.contains(event.target) &&
        !menuButton.contains(event.target);

    if (clickedOutside) {
        dropList.classList.remove("active");
    }
});