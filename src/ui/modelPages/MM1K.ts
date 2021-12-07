import createModelForm from "../userInput/CreateModelForm.js";
import {Models} from "../app.js";
import handleModelFormSubmit from "../userInput/modelFormHandler.js";

export default function MM1KPage(app: Element) {
    app.innerHTML = createModelForm(Models.MM1K)

    handleModelFormSubmit();

}
