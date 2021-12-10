import {Models} from "../types.js";
import createModelForm from "./userInput/CreateModelForm.js";
import handleModelFormSubmit from "./userInput/modelFormHandler.js";

export default function showModel(evt: Event): void {
    const modelType: string = (evt.target as HTMLSelectElement).value;

    if (isValidModel(modelType)) {
        displayModel(modelType);
    }
}


function isValidModel(modelType: string): boolean {
    return modelType in Models;
}


function displayModel(modelType: string): void {
    // add the form
    const modelCard: HTMLElement = document.querySelector("#model-card");
    modelCard.innerHTML = createModelForm(Models[modelType]);

    // add the onSubmit function
    handleModelFormSubmit();

}
