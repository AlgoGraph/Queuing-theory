import {Models} from "../../types";
import ModelField from "../components/ModelField";

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
    form += '</form>';

    // add the form to the page
    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = form;
}



