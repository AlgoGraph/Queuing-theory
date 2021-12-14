// create the form for all the types
// a pop-up for the visualizer
import {Models} from "../types.js";
import modal from "./components/Modal.js";
import ModelField from "./components/ModelField.js";


export default function resultPage(model: Models) {
    const modelCard: HTMLElement = document.querySelector("#model-card");

    let card_content: string = `
        
        <h2>${Models[model]}</h2>
        <div>
    `

    // in the MM** models n is needed to calc. some results
    if (model != Models.DD1K) {
        card_content += ModelField("n", "Enter the number of customers in the system \"n\":", false, false);
    }

    if (model == Models.DD1K) {
        card_content += ModelField("Ti", "Time Of Occurrence Of The First Balk \"Ti\"", false, false);
        card_content += ModelField("nt", "Number Of Customers In the System \"n(t)\"");
        card_content += ModelField("Wqn", "Waiting Time for Customer Number (n) \"Wq(n)\"");
    } else {
        if (model == Models.MM1 || model == Models.MM1K) {
            card_content += ModelField("ρ", "Utilization Of The Server \"ρ\"", false, false);
            card_content += ModelField("Pn", "Probability For Customers In System \"Pn\"", false);
            card_content += ModelField("L", "Number Of Customer In The System \"L\"", false, false);
            card_content += ModelField("Lq", "Number Of Customer In The Queue \"Lq\"", false, false);
            card_content += ModelField("W", "Waiting Time In The System \"W\"", false, false);
            card_content += ModelField("Wq", "Waiting Time In The Queue \"Wq\"", false, false);

        } else if (model == Models.MMc || model == Models.MMcK) {
            card_content += ModelField("ρ", "Utilization Of The Server \"ρ\"");
            card_content += ModelField("Pn", "Probability For Customers In System \"Pn\"");
            card_content += ModelField("L", "Number Of Customer In The System \"L\"");
            card_content += ModelField("Lq", "Number Of Customer In The Queue \"Lq\"");
            card_content += ModelField("W", "Waiting Time In The System \"W\"");
            card_content += ModelField("Wq", "Waiting Time In The Queue \"Wq\"");
        }



        if (model == Models.MMc || model == Models.MMcK) {
            card_content += ModelField("Ci", "Average Number Of Idle Server \"Ci'\"");
        }
    }

    card_content += `
        <button type="submit" id="go-to-model-form">Go Back to creation Form</button>
    `

    modelCard.innerHTML = card_content;


    // update result on change of "n"
    if (model != Models.DD1K) {
        handleChangeInN()
    }

    handleVisualiseClick();

}

function handleVisualiseClick() {
    const visualiseButtons = document.querySelectorAll(".visualise");
    visualiseButtons.forEach(button => button.addEventListener("click", (e) => visualise((e.target as HTMLElement).dataset.param)))
}

function visualise(param: string) {
    console.log(param)
    modal.insert_content(param);
    modal.open();
}

function handleChangeInN() {
    const input: HTMLElement = document.querySelector("#n");

    input.addEventListener("input", (e) => updateResult((e.target as HTMLInputElement).value))
}

function updateResult(n: string) {
    console.log(n)
}
