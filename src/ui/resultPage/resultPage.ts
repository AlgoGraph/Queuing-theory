// create the form for all the types
// a pop-up for the visualizer
import {Models} from "../app.js";

export default function resultPage (model: Models) {
    const card:HTMLElement =  document.querySelector("#card");

    let card_content: string = `
        
        <h2>${Models[model]}</h2>
        <div>
    `
    // MM1, MM1k (it is different in that MM1K sometime need n)
    // calcUtilizationOfTheServer
    // calcPropForCustomersInSystem
    // NumberOfCustomerInTheSystem
    // calcNumberOfCustomerInTheQueue
    // calcWaitingTimeInTheSystem
    // calcWaitingTimeInTheQueue
    if (model == Models.MM1 || model == Models.MM1K) {
        // ρ doesn't need to n but Pn need
        card_content += `
            <label for="ρ">
                Utilization Of The Server "ρ"
            </label>
            <input id="ρ" name="ρ" type="text" placeholder="" value="">
            
            <label for="Pn">
                Probability For Customers In System "Pn"
            </label>    
            <input id="Pn" name="Pn" type="text" placeholder="" value="">
        `
    } else if (model == Models.MMc || model == Models.MMcK) {
        // both need n
        card_content += `
            <label for="ρ">
                Utilization Of The Server "ρ"
            </label>
            <input id="ρ" name="ρ" type="text" placeholder="" value="">
            
            <label for="Pn">
                Probability For Customers In System "Pn"
            </label>    
            <input id="Pn" name="Pn" type="text" placeholder="" value="">
        `
    }

    if (model == Models.MM1 || model == Models.MM1K) {
        // you don't need to pass anything to it
        card_content += `
            <label for="L">
                Number Of Customer In The System "L"
            </label>
            <input id="L" name="L" type="text" placeholder="" value="">
            
            <label for="Lq">
                Number Of Customer In The Queue "Lq"
            </label>
            <input id="Lq" name="Lq" type="text" placeholder="" value="">
            
            <!--W-->
            <label for="W">
                Waiting Time In The System "W"
            </label>
            <input id="W" name="W" type="text" placeholder="" value="">
            
            <!--Wq-->
            <label for="Wq">
                Waiting Time In The Queue "Wq"
            </label>
            <input id="Wq" name="Wq" type="text" placeholder="" value="">

        `
    } else if (model == Models.MMc || model == Models.MMcK) {
        // should take the
        card_content += `
            <label for="L">
                Number Of Customer In The System "L"
            </label>
            <input id="L" name="L" type="text" placeholder="" value="">
            
            <label for="Lq">
                Number Of Customer In The Queue "Lq"
            </label>
            <input id="Lq" name="Lq" type="text" placeholder="" value="">
            
            <!--W-->
            <label for="W">
                Waiting Time In The System "W"
            </label>
            <input id="W" name="W" type="text" placeholder="" value="">
            
            <!--Wq-->
            <label for="Wq">
                Waiting Time In The Queue "Wq"
            </label>
            <input id="Wq" name="Wq" type="text" placeholder="" value="">
            
            <!--Ci'-->
            <label for="Ci">
                Average Number Of Idle Server "Ci'"
            </label>
            <input id="Ci" name="Ci" type="text" placeholder="" value="">
            
        `
    }


    card.innerHTML = card_content
}
