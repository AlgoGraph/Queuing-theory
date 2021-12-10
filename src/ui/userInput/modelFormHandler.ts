import resultPage from "../resultPage/resultPage.js";
import {Models} from "../../types.js";

export default function handleModelFormSubmit() {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        e.preventDefault();

        let modelParams = getUserInput(form);


        resultPage(Models[form.classList[0]]);
    }
}

/*
    * Form functions
*/
function getUserInput(form: HTMLFormElement): { lambda: string, mu: string, K?: string, c?: string } {
    let input: {
        lambda: string,
        mu: string,
        K?: string,
        c?: string,
        M?: string
    } = {
        lambda: "",
        mu: ""
    };
    input.lambda = EvaluateExpression((<HTMLInputElement>document.querySelector("#lambda")).value);

    input.mu = EvaluateExpression((<HTMLInputElement>document.querySelector("#mu")).value);

    if (form.classList[0] == Models[Models.DD1K]) {
        input.M = EvaluateExpression((<HTMLInputElement>document.querySelector("#M")).value);

    }

    if (form.classList[0] == Models[Models.MM1K] ||form.classList[0] == Models[Models.MMcK] || form.classList[0] == Models[Models.DD1K]) {
        input.K = EvaluateExpression((<HTMLInputElement>document.querySelector("#K")).value);

    }
    if (form.classList[0] == Models[Models.MMc] ||form.classList[0] == Models[Models.MMcK]) {
        input.c = EvaluateExpression((<HTMLInputElement>document.querySelector("#c")).value);
    }

    return input;
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
