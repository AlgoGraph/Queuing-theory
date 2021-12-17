import {Models} from "../../types";
import ModelField from "../components/ModelField";
import {getInput} from "../ModelFormHandler";
import {isNumber} from "chart.js/helpers";

export default function createModelForm(model: Models): void {
    // 1. start with the model name
    let form = `
                    <h2>${Models[model]}</h2>
                    <form id="model-form" class="${Models[model]}">
                `
    // all need lambda and Mu
    form += ModelField("lambda", "Arrival Rate \"λ\"", false, false);
    form += ModelField("mu", "Service Rate \"μ\"", false, false);

    // c for the ones with c
    if ([Models.MMc, Models.MMcK].includes(model)) {
        form += ModelField("c", "Number Of Servers \"c\"", false, false);
    }
    // K for the ones with K
    if ([Models.DD1K, Models.MM1K, Models.MMcK].includes(model)) {
        form += ModelField("K", "System Capacity \"K\"", false, false);
    }
    // M for case 2 of the DD1K
    if (model == Models.DD1K) {
        form += ModelField("M", "Number Of Customers At The Start \"M\" *(optional)", false, false);
    }

    form += `        
            <button type="submit">Create Model</button>
            `

    // close the form
    form += '</form>';

    // add the form to the page
    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = form;

    // challenge for myself
    /*
    * for DD1K listen to change in lambda and mu
    *   if both are valid values
    *       check if lambda > mu
    *           clear M and disable it
    *               ...good luck ^v^
    *
    */
    if (model == Models.DD1K) {
        handleMForDD1K()
    }
}

function handleMForDD1K() {
    (document.querySelector("input[id='lambda']") as HTMLInputElement).addEventListener('input', disableM);
    (document.querySelector("input[id='mu']") as HTMLInputElement).addEventListener('input', disableM);

}

function disableM() {
    let lambda: number = Number(getInput("lambda", true, false));
    let mu: number = Number(getInput("mu", true, false));

    if (isNumber(lambda) && isNumber(mu)) {
        const M: HTMLInputElement = (document.querySelector("input[id='M']") as HTMLInputElement);
        M.value = "";
        M.disabled = lambda > mu;
    }
}



