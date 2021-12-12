import {Models} from "../../types.js";
import ModelField from "../components/ModelField.js";

export default function createModelForm(model: Models): void {
    let form = `
                    <h2>${Models[model]}</h2>
                    <form id="model-form" class="${Models[model]}">
                `

    // all need lambda and Mu
    form += ModelField("lambda", "Arrival Rate \"λ\"", false, false);
    form += ModelField("mu", "Service Rate \"μ\"", false, false);

    if (model == Models.DD1K) {
        form += ModelField("K", "System Capacity \"K\"", false, false);
        form += ModelField("M", "Number Of Customers At The Start \"M\" *(optional)", false, false);


    } else if (model == Models.MM1K) {
        form += ModelField("K", "System Capacity \"K\"", false, false);

    } else if (model == Models.MMc) {
        form += ModelField("c", "Number Of Servers \"c\"", false, false);


    } else if (model == Models.MMcK) {
        form += ModelField("K", "System Capacity \"K\"", false, false);
        form += ModelField("c", "Number Of Servers \"c\"", false, false);
    }


    form += `        
            <button type="submit">Create Model</button>
            `
    form += '</form>';


    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = form;

}



