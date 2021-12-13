import {Models} from "../../types.js";
import DD1k, {createDD1K} from "../../Deterministic/DD1K.js";


export default function calcResult(userInput, model: Models) {
    if (model == Models.DD1K) {
       console.log(userInput)

        // TODO: remove after adding the validation
        if (typeof userInput.lambda === 'undefined' ||typeof userInput.mu === 'undefined' || typeof userInput.K === 'undefined') {
            console.log("sss")
            return;
        }

        const dd1K: DD1k = createDD1K(Number(userInput.lambda), Number(userInput.mu), Number(userInput.K));
        addInputValue("Ti", dd1K.calcTi())
        addInputValue("nt", dd1K.calcNumberOfCustomers(40))
        addInputValue("Wqn", dd1K.calcWaitingTime(4))

        // addInputValue("Ti", dd1K.calcNumberOfCustomers(4));
    }
}


function addInputValue(fieldId: string, value: number) {
    (document.querySelector(`#${fieldId}`) as HTMLInputElement).value = value + "";
}
