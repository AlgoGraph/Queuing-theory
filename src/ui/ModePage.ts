import {Models} from "../types";
import createModelForm from "./userInput/CreateModelForm";
import handleModelFormSubmit from "./ModelFormHandler";

export default function showModel(evt: Event): void {
    // getting the model name
    const modelType: string = (evt.target as HTMLSelectElement).value;

    if (isValidModel(modelType)) {
        displayModel(modelType);
    }
}

function isValidModel(modelType: string): boolean {
    return modelType in Models;
}


export function displayModel(modelType: string): void {
    // display the model form
    createModelForm(Models[modelType]);

    // add the onSubmit function
    handleModelFormSubmit();
}
