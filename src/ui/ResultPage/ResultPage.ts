import {Model, Models, UserInput} from "../../types";
import modal from "../components/Modal";
import ModelField from "../components/ModelField";
import {DD1k, createDD1K} from "../../logic/Deterministic/DD1K";
import {MM1, createMM1} from "../../logic/stochastic/MM1";
import {MM1K, createMM1K} from "../../logic/stochastic/MM1K";
import {MMc, createMMc} from "../../logic/stochastic/MMc";
import {MMcK, createMMcK} from "../../logic/stochastic/MMcK";
import {clearError, showError} from "../InputForm/errorHandler";
import {EvaluateExpression} from "../InputForm/ModelFormHandler";
import {visualise} from "../../Visualization";

export default function resultPage(model: Models, inputList: UserInput) {

    let card_content: string = `
        <h2>${Models[model]}</h2>
        <div>
    `

    if (model == Models.DD1K) {
        card_content += ModelField("Ti", "Time Of Occurrence Of The First Balk \"Ti\"");
        // need "t"
        card_content += ModelField("nt", "Number Of Customers In the System \"n(t)\"",
            true, true, "t", "Enter the time");
        // need "n"
        card_content += ModelField("Wqn", "Waiting Time for Customer Number (n) \"Wq(n)\"",
            true, true, "n", "Enter the number of the customer");
    } else if ([Models.MM1, Models.MM1K, Models.MMc, Models.MMcK].includes(model)) {
            card_content += ModelField("ρ", "Utilization Of The Server \"ρ\"");

            card_content += ModelField("L", "Number Of Customer In The System \"L\"");

            card_content += ModelField("Lq", "Number Of Customer In The Queue \"Lq\"");

            card_content += ModelField("W", "Waiting Time In The System \"W\"");

            card_content += ModelField("Wq", "Waiting Time In The Queue \"Wq\"");
            // need n
            card_content += ModelField("Pn", "Probability For Customers In System \"Pn\"", true,
                true, "Pn_n", "Enter number of customer");
    }

    card_content += `
        <button type="submit" id="go-to-model-form">Go Back to creation Form</button>
    `

    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = card_content;

    const modelInstance = createModel(model, inputList);
    fillIndependentResults(model, modelInstance);
    handleResultsWithVariables(model, modelInstance);

    // handle click on the visualise button
    handleVisualiseClick(modelInstance);
}


function handleVisualiseClick(model: Model) {
    const visualiseButtons = document.querySelectorAll(".visualise");
    visualiseButtons.forEach(button => button.addEventListener("click", (e) => visualise(model, (e.target as HTMLElement).dataset.param)))
}


function createModel(model: Models, inputList: UserInput): Model {
    switch (model){
        case Models.DD1K:
            console.log(inputList.K);
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
        (document.querySelector("input[id='Ti']") as HTMLInputElement).value = "" + dd1k.calcTi().toFixed(2)

    } else if ([Models.MM1, Models.MM1K, Models.MMc, Models.MMcK].includes(modelType)){
            const MM_: MM1 | MM1K | MMc | MMcK = model as MM1 | MM1K | MMc | MMcK;

            (document.querySelector("input[id='ρ']") as HTMLInputElement).value = "" + MM_.calcUtilizationOfTheServer().toFixed(2);
            (document.querySelector("input[id='L']") as HTMLInputElement).value = "" + MM_.calcNumberOfCustomerInTheSystem().toFixed(2);
            (document.querySelector("input[id='Lq']") as HTMLInputElement).value = "" + MM_.calcNumberOfCustomerInTheQueue().toFixed(2);
            (document.querySelector("input[id='W']") as HTMLInputElement).value = "" + MM_.calcWaitingTimeInTheSystem().toFixed(2);
            (document.querySelector("input[id='Wq']") as HTMLInputElement).value = "" + MM_.calcWaitingTimeInTheQueue().toFixed(2);

    }
}


function handleResultsWithVariables(modelType: Models, model: Model) {
    if (modelType == Models.DD1K) {
        handleChangeInvariable(model, "t", "nt");
        handleChangeInvariable(model, "n", "Wqn");
    } else if ([Models.MM1, Models.MM1K, Models.MMc, Models.MMcK].includes(modelType)){
        handleChangeInvariable(model, "Pn_n", "Pn");
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
    const result: number = resultFunctions[resultId](value);
    console.log(result);
    (document.querySelector(`#${resultId}`) as HTMLInputElement).value = "" + result.toFixed(2);
}
