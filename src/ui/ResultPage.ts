import {Model, Models, UserInput} from "../types.js";
import modal from "./components/Modal.js";
import ModelField from "./components/ModelField.js";
import DD1k, {createDD1K} from "../logic/Deterministic/DD1K.js";
import MM1, {createMM1} from "../logic/stochastic/MM1.js";
import MM1K, {createMM1K} from "../logic/stochastic/MM1K.js";
import MMc, {createMMc} from "../logic/stochastic/MMc.js";
import MMcK, {createMMcK} from "../logic/stochastic/MMcK.js";
import {clearError, showError} from "./userInput/errorHandler.js";
import {EvaluateExpression} from "./ModelFormHandler.js";

export default function resultPage(model: Models, inputList: UserInput) {

    let card_content: string = `
        <h2>${Models[model]}</h2>
        <div>
    `

    if (model == Models.DD1K) {
        card_content += ModelField("Ti", "Time Of Occurrence Of The First Balk \"Ti\"");
        // need "t"
        card_content += ModelField("nt", "Number Of Customers In the System \"n(t)\"",
            false, true,
            "t", "Enter the time");
        // need "n"
        card_content += ModelField("Wqn", "Waiting Time for Customer Number (n) \"Wq(n)\"",
            false, true,
            "n", "Enter the number of the customer");
    } else {
        if ([Models.MM1, Models.MM1K].includes(model)) {
            card_content += ModelField("ρ", "Utilization Of The Server \"ρ\"");
            // need n
            card_content += ModelField("Pn", "Probability For Customers In System \"Pn\"", false, true,
                "Pn_n", "Enter number of customer");
            card_content += ModelField("L", "Number Of Customer In The System \"L\"");
            card_content += ModelField("Lq", "Number Of Customer In The Queue \"Lq\"");
            card_content += ModelField("W", "Waiting Time In The System \"W\"");
            card_content += ModelField("Wq", "Waiting Time In The Queue \"Wq\"");

        } else if ([Models.MMc, Models.MMcK].includes(model)) {
            // all need n
            card_content += ModelField("ρ", "Utilization Of The Server \"ρ\"", false, true,
            "ρ_n", "Enter number of customer");
            card_content += ModelField("Pn", "Probability For Customers In System \"Pn\"", false, true,
                "Pn_n", "Enter number of customer");
            card_content += ModelField("L", "Number Of Customer In The System \"L\"", false, true,
                "L_n", "Enter number of customer");
            card_content += ModelField("Lq", "Number Of Customer In The Queue \"Lq\"", false, true,
                "Lq_n", "Enter number of customer");
            card_content += ModelField("W", "Waiting Time In The System \"W\"", false, true,
                "W_n", "Enter number of customer");
            card_content += ModelField("Wq", "Waiting Time In The Queue \"Wq\"", false, true,
                "Wq_n", "Enter number of customer");
            card_content += ModelField("Ci", "Average Number Of Idle Server \"Ci'\"", false, true,
                "Ci_n", "Enter number of customer");
        }
    }

    card_content += `
        <button type="submit" id="go-to-model-form">Go Back to creation Form</button>
    `

    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = card_content;

    const modelInstance = createModel(model, inputList);
    fillIndependentResults(model, modelInstance);
    handleResultsWithVariables(model, modelInstance);

}

// TODO: move to another file
function visualise(param: string) {
    console.log(param)
    modal.insert_content(param);
    modal.open();

}

function handleVisualiseClick() {
    const visualiseButtons = document.querySelectorAll(".visualise");
    visualiseButtons.forEach(button => button.addEventListener("click", (e) => visualise((e.target as HTMLElement).dataset.param)))
}

function createModel(model: Models, inputList: UserInput): Model {
    switch (model){
        case Models.DD1K:
            return createDD1K(Number(inputList.lambda), Number(inputList.mu), Number(inputList.K));
        case Models.MM1:
            return createMM1(Number(inputList.lambda), Number(inputList.mu));
        case Models.MM1K:
            return createMM1K(Number(inputList.lambda), Number(inputList.mu), Number(inputList.K))
        case Models.MMc:
            return createMMc(Number(inputList.lambda), Number(inputList.mu), Number(inputList.c))
        case Models.MMcK:
            return createMMcK(Number(inputList.lambda), Number(inputList.mu), Number(inputList.c), Number(inputList.K));
    }
}

function fillIndependentResults(modelType: Models, model: Model) {
    if (modelType == Models.DD1K) {
        const dd1k: DD1k = model as DD1k
        (document.querySelector("input[id='Ti']") as HTMLInputElement).value = "" + dd1k.calcTi()

    } else if ([Models.MM1, Models.MM1K].includes(modelType)){
            const MM1_: MM1 | MM1K = model as MM1 | MM1K
            (document.querySelector("input[id='ρ']") as HTMLInputElement).value = "" + MM1_.calcUtilizationOfTheServer();
            (document.querySelector("input[id='L']") as HTMLInputElement).value = "" + MM1_.calcNumberOfCustomerInTheSystem();
            (document.querySelector("input[id='Lq']") as HTMLInputElement).value = "" + MM1_.calcNumberOfCustomerInTheQueue();
            (document.querySelector("input[id='W']") as HTMLInputElement).value = "" + MM1_.calcWaitingTimeInTheSystem();
            (document.querySelector("input[id='Wq']") as HTMLInputElement).value = "" + MM1_.calcWaitingTimeInTheQueue();
    }
}


function handleResultsWithVariables(modelType: Models, model: Model) {
    if (modelType == Models.DD1K) {
        handleChangeInvariable(model, "t", "nt");
        handleChangeInvariable(model, "n", "Wqn");
    } else if ([Models.MM1, Models.MM1K].includes(modelType)){
        handleChangeInvariable(model, "Pn_n", "Pn");
    } else if ([Models.MMc, Models.MMcK].includes(modelType)){
        handleChangeInvariable(model, "ρ_n", "ρ");
        handleChangeInvariable(model, "Pn_n", "Pn");
        handleChangeInvariable(model, "L_n", "L");
        handleChangeInvariable(model, "Lq_n", "Lq");
        handleChangeInvariable(model, "W_n", "W");
        handleChangeInvariable(model, "Wq_n", "Wq");
        handleChangeInvariable(model, "Ci_n", "Ci");
    }
}

function handleChangeInvariable(model: Model, variableId: string, resultId: string) {
    const variable: HTMLElement = document.querySelector(`#${variableId}`);
    console.log(variable)

    variable.addEventListener("input", (e) => updateResult(model, variableId, resultId, (e.target as HTMLInputElement).value))
}


function updateResult(model: Model, variableId: string, resultId: string, value) {
    clearError(variableId);

    value = EvaluateExpression(value);
    // if the input can't be evaluated into a number
    if (isNaN(Number(value))) {
        if (value) {
            showError(variableId, "please enter a valid mathematical expression");
        }
        return;
    }

    if (Number(value) < 0){
        showError(variableId, "Field must have a value greater than 0");
        return;
    }

    const resultFunctions = {
        // DD1K
        nt: (model as DD1k).calcNumberOfCustomers,
        Wqn: (model as DD1k).calcWaitingTime,
        // all MM**
        Pn: (model as MM1 | MM1K | MMc | MMcK).calcPropForCustomersInSystem,
        // MMc*
        ρ: (model as MMc | MMcK).calcUtilizationOfTheServer,
        L: (model as MMc | MMcK).calcNumberOfCustomerInTheSystem,
        Lq: (model as MMc | MMcK).calcNumberOfCustomerInTheQueue,
        W: (model as MMc | MMcK).calcWaitingTimeInTheSystem,
        Wq: (model as MMc | MMcK).calcWaitingTimeInTheQueue,
        Ci: (model as MMc | MMcK).calcAverageNumberOfIdleServer
    }
    console.log(resultId)
    const result: number = resultFunctions[resultId](value);
    console.log(result);
    (document.querySelector(`#${resultId}`) as HTMLInputElement).value = "" + result;
}
