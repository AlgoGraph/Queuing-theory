import {Models} from "../../types.js";

export default function createModelForm(model: Models): string {
    let form = `
                    <h2>${Models[model]}</h2>
                    <form id="model-form" class="${Models[model]}">
                `

    // all need lambda and Mu
    form += `
        <label for="lambda">
            Arrival Rate "λ"
        </label>
            <input id="lambda" type="text" name="lambda">

        <label for="mu">
            Service Rate "μ"
        </label>
            <input id="mu" type="text" name="mu">
`
    if (model == Models.DD1K) {
        form += `
                  <label for="K">
                    System Capacity "K"
                  </label>  
                    <input id="K" type="text" name="K">
                    
                  <label for="M">
                    Number Of Customers At The Start "M" *(optional)
                  </label>  
                    <input id="M" type="text" name="M">
                `
    } else if (model == Models.MM1K) {
        form += `
                  <label for="K">
                    System Capacity "K"
                  </label>  
                    <input id="K" type="text" name="K">
                `
    } else if (model == Models.MMc) {
        form += `
                  <label for="c">
                    Number Of Servers "c"
                  </label>  
                    <input id="c" type="text" name="c">
                `

    } else if (model == Models.MMcK) {
        form += `
                  <label for="K">
                    System Capacity "K"
                  </label> 
                    <input id="K" type="text" name="K">
                  
                  <label for="c">
                    Number Of Servers "c"
                  </label>  
                    <input id="c" type="text" name="c">
                `
    }


    form += `        
            <button type="submit">Create Model</button>
            `
    form += '</form>';


    return form;
}



