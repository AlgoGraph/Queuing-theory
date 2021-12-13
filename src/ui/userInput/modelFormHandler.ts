import resultPage from "../ResultPage.js";
import {Models, UserInput} from "../../types.js";
import InputValidator from "./InputValidator.js";
import {displayModel} from "../ModePage.js";
import calcResult from "./ModelResult.js";

export default function handleModelFormSubmit(): void {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        e.preventDefault();

        let userInput = getUserInput(form);


        // TODO : validate the input

        // show the result page
        resultPage(Models[form.classList[0]]);

        // populate all possible fields (fields that doesn`t additional params.)
        calcResult(userInput, Models[form.classList[0]])

        const goBackButton = document.querySelector("#go-to-model-form");
        goBackButton.addEventListener("click", () => displayModel(form.classList[0]));
        console.log(goBackButton)
    }
}

/*
    * Form functions
*/
function getUserInput(form: HTMLFormElement): UserInput {
    let userInput: UserInput = {
        lambda: "",
        mu: ""
    };

    userInput.lambda = getInput("lambda");
    userInput.mu = getInput("mu");

    if (form.classList[0] == Models[Models.DD1K]) {
        userInput.M = getInput("M");
    }

    if (form.classList[0] == Models[Models.MM1K] ||form.classList[0] == Models[Models.MMcK] || form.classList[0] == Models[Models.DD1K]) {
        userInput.K = getInput("K");

    }
    if (form.classList[0] == Models[Models.MMc] ||form.classList[0] == Models[Models.MMcK]) {
        userInput.c = getInput("c");
    }
    return userInput;
}

function getInput(inputId: string) {
    let input: string;
    try {
        input = EvaluateExpression((<HTMLInputElement>document.querySelector(`#${inputId}`)).value);
        return input;
    } catch (e) {
        input = "";
        return input
    }
}


function EvaluateExpression(input) {
        try {
            input =  eval(input);
            return input;
        } catch (e) {
            console.error(e.message)
            console.log(input, e.message)
            return e.message
        }
}

