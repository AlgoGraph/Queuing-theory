import resultPage from "./ResultPage";
import {Models, UserInput} from "../types";
import {displayModel} from "./ModePage";
import calcResult from "./userInput/ModelResult";
import {clearAllErrors, showError} from "./userInput/errorHandler";

export default function handleModelFormSubmit(): void {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        // prevent the page reload
        e.preventDefault();

        // clear all errors
        clearAllErrors();

        // get the input form the field + try to evaluate it
        let userInput = getUserInput(form);

        if (userInput.validInput) {
            // show the result page
            resultPage(Models[form.classList[0]], userInput);

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

    userInput.validInput = checkIfError(userInput.lambda);

    userInput.mu = getInput("mu");
    userInput.validInput = checkIfError(userInput.mu);

    if ([Models[Models.DD1K]].includes(form.classList[0])) {
        userInput.M = getInput("M", false);
        userInput.validInput = checkIfError(userInput.M);
    }

    if (form.classList[0] == Models[Models.MMc] || form.classList[0] == Models[Models.MMcK]) {
        userInput.c = getInput("c");
        userInput.validInput = checkIfError(userInput.c);
    }

    if ([Models[Models.MM1K], Models[Models.MMcK], Models[Models.DD1K]].includes(form.classList[0])) {
        userInput.K = getInput("K");
        userInput.validInput = checkIfError(userInput.K);
    }

    return userInput;
}


export function getInput(inputId: string, required: boolean = true) {
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

    input = validateInput(inputId, input);

    return input;

}


export function EvaluateExpression(input: string) {
    // // the // bug
    let regex: RegExp = new RegExp('//(/)*');
    if (regex.test(input)) {
        input = "please enter a valid mathematical expression";
        return input;
    }

    // the 0 on the left > remove the zeros + leading w
    // note: the g flag make it work on all occurrence
    input = input.replace(/^0+|\s+0+/g,'');

    try {
        input = eval(input);
        return input;
    } catch (e) {
        input = "please enter a valid mathematical expression";
        return input;
    }
}


function validateInput(inputId: string, input: string): string {
    switch (inputId) {
        case "lambda":
        case "mu":
        case "c":
        case "K":
            if (Number(input) <= 0){
                showError(inputId, "Field must have a value greater than 0");
                return "error";
            }
            return input;
        case "M":
            if (input && Number(input) < 0){
                showError(inputId, "Field must have a value greater than or equal to 0");
                return "error";
            }
            return input;
        default:
            return input;
    }
}


function checkIfError(value: string): boolean {
    return value != "error";

}
