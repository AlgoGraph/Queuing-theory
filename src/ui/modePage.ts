import MM1Page from "./modelPages/MM1.js";
import MM1KPage from "./modelPages/MM1K.js";
import MMcPage from "./modelPages/MMc.js";
import MMcKPage from "./modelPages/MMcK.js";

export default function showModel(app: Element, evt: Event): void {
    const modelType: string = (evt.target as HTMLSelectElement).value;

    if (isValidModel(modelType)) {
        // show the page for this model
        displayModel(app, modelType);
    }
}


function isValidModel(modelType: string): boolean {
    return ["MM1", "MM1K", "MMc", "MMcK"].includes(modelType);
}


function displayModel(app: Element, modelType: string): void {
    const models = {
        "MM1": MM1Page,
        "MM1K": MM1KPage,
        "MMc": MMcPage,
        "MMcK": MMcKPage
    }

    models[modelType](app);
}
