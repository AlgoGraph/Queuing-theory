import resultPage from "../ResultPage/ResultPage";
import {Models, UserInput} from "../../types";
import {displayModel} from "../ModeMenu/ModelMenuHandler";
import {clearAllErrors, showError} from "./errorHandler";

export default function handleModelFormSubmit(): void {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        // prevent the page reload
        e.preventDefault();

        // clear all errors
        clearAllErrors();

        // get the input form the field + try to evaluate it
        let userInput = getUserInput(form);

        console.log(userInput.validInput);
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
    userInput.validInput = checkIfError(userInput.lambda, userInput.validInput);

    userInput.mu = getInput("mu");

    userInput.validInput = checkIfError(userInput.mu, userInput.validInput);

    if ([Models[Models.DD1K]].includes(form.classList[0])) {
        userInput.M = getInput("M", false);
        userInput.validInput = checkIfError(userInput.M, userInput.validInput);
    }

    if (form.classList[0] == Models[Models.MMc] || form.classList[0] == Models[Models.MMcK]) {
        userInput.c = getInput("c");
        userInput.validInput = checkIfError(userInput.c, userInput.validInput);
    }

    if (form.classList[0] == Models[Models.MM1K] || form.classList[0] == Models[Models.MMcK] || form.classList[0] == Models[Models.DD1K]) {
        userInput.K = getInput("K");
        userInput.validInput = checkIfError(userInput.K, userInput.validInput);
    }

    return userInput;
}


export function getInput(inputId: string, required: boolean = true, handleError: boolean = true) {
    let input: string = (<HTMLInputElement>document.querySelector(`#${inputId}`)).value;

    // if empty > check if the field is required, else evaluate it
    if (input) {
        console.log(input)
        input = EvaluateExpression(input);
        console.log(input)
    } else {
        if (required) {
            handleError ? showError(inputId, "Field is required: please enter a valid value.") : null;
            // TODO: think of better way to tell the calling function that there was an error
            return "error";
        }
    }
    // if the input can't be evaluated into a number
    if (isNaN(Number(input))) {
        handleError ? showError(inputId, input) : null;
        // TODO: think of better way to tell the calling function that there was an error
        return "error";
    }

    input = validateInput(inputId, input, handleError);

    console.log(inputId, input)
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
    input = input.replace(/^0+(\d+)|((\s+|\+|-|\/|\*)0+\d+)/g,(match) => {
        console.log("match", match)
        return match.replace(/^0+|(\s*0+)/g, '');
    });

    console.log(input)
    try {
        input = eval(input);
        return input;
    } catch (e) {
        input = "please enter a valid mathematical expression";
        return input;
    }
}


function validateInput(inputId: string, input: string, handleError: boolean = true): string {
    switch (inputId) {
        case "lambda":
        case "mu":
        case "c":
        case "K":
            if (Number(input) <= 0){
                console.log("here")
                handleError ? showError(inputId, "Field must have a value greater than 0") : null;
                return "error";
            }
            return input;
        case "M":
            if (input && Number(input) < 0){
                handleError ? showError(inputId, "Field must have a value greater than or equal to 0") : null;
                return "error";
            }
            return input;
        default:
            return input;
    }
}


function checkIfError(value: string, validInput: boolean): boolean {
    return !validInput ? false : value != "error";
}
