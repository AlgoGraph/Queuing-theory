import createModelForm from "../userInput/CreateModelForm.js";
import {Models} from "../app.js";
import handleModelFormSubmit from "../userInput/modelFormHandler.js";

export default function MMcPage(app: Element) {
    app.innerHTML = createModelForm(Models.MMc)
    handleModelFormSubmit();

}
