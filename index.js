import DD1K from "./DD1K.js";


const userInput = document.querySelector("#user_input");


userInput.onsubmit = (e) => {
    e.preventDefault();

    clearResult();

    const {lambda, mu, time} = getUserInput();

    if (isValidUserInput(lambda, mu, time)) {
        const result = solveDD1K(lambda, mu, time);
        showResult(result)
    }

}

/*
    * Form functions
*/
function getUserInput() {
    const lambda = document.querySelector("#lambda").value;
    const mu = document.querySelector("#mu").value;
    const time = document.querySelector("#time").value;
    return {lambda, mu, time};
}

function isValidUserInput() {
    const userInput = Array.from(arguments);


    if (userInput.some(input => input === "")) {
        showError("All fields are required. Please fill all of them");
        return false;

    } else if (userInput.some(input => isNaN(input))) {
        showError("Make sure all your inputs are numeric values");
        return false;
    }

    return true;
}


/*
    * Result div functions
*/
function showResult(result) {
    document.querySelector("#result").innerText =
        `Number of Customers ${result}`;
}


function clearResult() {
    document.querySelector("#result").innerText = "";
}


function showError(errorMessage) {
    document.querySelector("#result").innerText = errorMessage;
}

/*
*   a wrapper around the DD1K's logic ?
*/
function solveDD1K(lambda, mu, time) {
    const dd1k = new DD1K({
        lambda,
        mu
    })

    return dd1k.getNumberOfCustomersAtTime(time);
}
