// create the form for all the types
// a pop-up for the visualizer
import {Models} from "../types.js";
import modal from "./components/Modal.js";


export default function resultPage(model: Models) {
    const modelCard: HTMLElement = document.querySelector("#model-card");

    let card_content: string = `
        
        <h2>${Models[model]}</h2>
        <div>
    `

    // in the MM** models n is needed to calc. some results
    if (model != Models.DD1K) {
        card_content += `
            <label for="n">
                Enter the number of customers in the system "n":
            </label>
            <input id="n" name="n" type="text" placeholder="" value="">
        `
    }

    if (model == Models.DD1K) {
        card_content += `
            <label for="Ti">
                Time Of Occurrence Of The First Balk "Ti"
            </label>
            <input id="Ti" name="Ti" type="text" placeholder="" value="" disabled>
            
            <label for="n(t)">
                Number Of Customers In the System "n(t)"
            </label>    
            <input id="n(t)" name="n(t)" type="text" placeholder="" value=""  disabled>
            
             <label for="Wq(n)">
                <!-- TODO: number $the value the user inputted ?-->
                Waiting Time for Customer Number (n) "Wq(n)"
            </label>    
            <input id="Wq(n)" name="Wq(n)" type="text" placeholder="" value=""  disabled>
        `;
    } else {
        card_content += `
            <label for="ρ">
                Utilization Of The Server "ρ"
            </label>
            <input id="ρ" name="ρ" type="text" placeholder="" value="" disabled>
            
            <label for="Pn">
                Probability For Customers In System "Pn"
            </label>    
            <input id="Pn" name="Pn" type="text" placeholder="" value="" disabled>
            
            <label for="L">
                Number Of Customer In The System "L"
            </label>
            <input id="L" name="L" type="text" placeholder="" value="" disabled>
            
            <label for="Lq">
                Number Of Customer In The Queue "Lq"
            </label>
            <input id="Lq" name="Lq" type="text" placeholder="" value="" disabled>
            
            <!--W-->
            <label for="W">
                Waiting Time In The System "W"
            </label>
            <input id="W" name="W" type="text" placeholder="" value="" disabled>
            
            <!--Wq-->
            <label for="Wq">
                Waiting Time In The Queue "Wq"
            </label>
            <input id="Wq" name="Wq" type="text" placeholder="" value="" disabled>   
            <button class="visualise" data-param="Wq">Visualise</button>
        `

        if (model == Models.MMc || model == Models.MMcK) {
            // should take the
            card_content += `
                <!--Ci'-->
                <label for="Ci">
                    Average Number Of Idle Server "Ci'"
                </label>
                <input id="Ci" name="Ci" type="text" placeholder="" value="" disabled>
                
            `
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
