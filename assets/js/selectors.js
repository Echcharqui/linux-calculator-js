// Select all buttons allowed to write into the current expression.
const activeButtons = document.querySelectorAll(".btn.active");

// Select the span where the current expression and result are displayed.
const currentOpsField = document.querySelector("#current-ops span");

// Select the operation container used for error styling.
const opsContainer = document.getElementById("ops_container");

// Select the equals and clear buttons.
const equalButton = document.getElementById("equals");
const clearBtn = document.getElementById("clear");