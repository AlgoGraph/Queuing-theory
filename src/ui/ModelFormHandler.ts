import resultPage from "./ResultPage.js";
import {Models, UserInput} from "../types.js";
import {displayModel} from "./ModePage.js";
import calcResult from "./userInput/ModelResult.js";
import {clearAllErrors, showError} from "./userInput/errorHandler.js";

export default function handleModelFormSubmit(): void {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        // prevent the page reload
        e.preventDefault();

        // clear all errors
        clearAllErrors();

        // get the input form the field + try to evaluate it
        let userInput = getUserInput(form);


        // at here I know I have all the required fields as a valid number

        // TODO > validation for the business logic

        if (userInput.validInput) {
            // show the result page
            resultPage(Models[form.classList[0]]);

            // populate all possible fields (fields that doesn`t additional params.)
            calcResult(userInput, Models[form.classList[0]])

            // create a go-back button
            const goBackButton = document.querySelector("#go-to-model-form");
            goBackButton.addEventListener("click", () => displayModel(form.classList[0]));
        }

    }
}


/*
    * Form functions
*/
function getUserInput(form: HTMLFormElement): UserInput {
    let userInput: UserInput = {
        validInput: true,
        lambda: "",
        mu: ""
    };

    userInput.lambda = getInput("lambda");

    if (userInput.lambda == "error") {
        userInput.validInput = false;
    }

    userInput.mu = getInput("mu");
    if (userInput.mu == "error") {
        userInput.validInput = false;
    }


    if ([Models[Models.DD1K]].includes(form.classList[0])) {
        userInput.M = getInput("M", false);
        if (userInput.M == "error") {
            userInput.validInput = false;
        }
    }

    if (form.classList[0] == Models[Models.MMc] || form.classList[0] == Models[Models.MMcK]) {
        userInput.c = getInput("c");
        if (userInput.c == "error") {
            userInput.validInput = false;
        }
    }

    if ([Models[Models.MM1K], Models[Models.MMcK], Models[Models.DD1K]].includes(form.classList[0])) {
        userInput.K = getInput("K");
        if (userInput.K == "error") {
            userInput.validInput = false;
        }
    }

    return userInput;
}


function getInput(inputId: string, required: boolean = true) {
    let input: string = (<HTMLInputElement>document.querySelector(`#${inputId}`)).value;

    // if empty > check if the field is required, else evaluate it
    if (input) {
        input = EvaluateExpression(input);
    } else {
        if (required) {
            showError(inputId, "Field is required: please enter a value.");
            // TODO: think of better way to tell the calling function that there was an error
            return "error";
        }
    }

    // if the input can't be evaluated into a number
    if (isNaN(Number(input))) {
        showError(inputId, input);
        // TODO: think of better way to tell the calling function that there was an error
        return "error";
    }

    return input;

}

function EvaluateExpression(input) {
    try {
        input = eval(input);
        return input;
    } catch (e) {
        input = "please enter a valid mathematical expression";
        return input;
    }
}

