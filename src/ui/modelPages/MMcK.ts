import createModelForm from "../userInput/CreateModelForm.js";
import {Models} from "../app.js";
import handleModelFormSubmit from "../userInput/modelFormHandler.js";

export default function MMcKPage(app: Element) {
    app.innerHTML = createModelForm(Models.MMcK);
    console.log("sss")
    // handle the form
    handleModelFormSubmit();
}
