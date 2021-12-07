import {Models} from "../app.js";

export default function handleModelFormSubmit() {
    const form: HTMLFormElement = document.querySelector("#model-form");

    form.onsubmit = (e) => {
        e.preventDefault();

        let modelParams = getUserInput(form);

        //     // evaluate any expression in the text
        //
        //     console.log([lambda, mu, time]);
        //
        //     if (isValidUserInput(lambda, mu, time)) {
        //         const result = solveDD1K(lambda, mu, time);
        //         showResult(result)
        //     }
        //
        // }

        // handle the user input, and show any error messages needed

        //  if  all is good >> call the right function with the user input to :
        // create the model and show its page
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
        c?: string
    } = {
        lambda: "",
        mu: ""
    };
    input.lambda = EvaluateExpression((<HTMLInputElement>document.querySelector("#lambda")).value);

    input.mu = EvaluateExpression((<HTMLInputElement>document.querySelector("#mu")).value);

    if (form.classList[0] == Models.MM1K.toString() ||form.classList[0] == Models.MMcK.toString()) {
        input.K = EvaluateExpression((<HTMLInputElement>document.querySelector("#K")).value);

    }
    if (form.classList[0] == Models.MMc.toString() ||form.classList[0] == Models.MMcK.toString()) {
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
            console.log(input)
            return input
        }
}
