import showModel from "./modePage.js";

export default function modelMenu(app: Element): void {
    app.innerHTML = `
    <form id="ModelMenu">
        <label for="models-names">
            Choose the model you are going to be working with:
        </label>
        <select name="models-names" id="models-names">
            <option disabled>Stochastic Models</option>
            <option value="MM1">MM1</option>
            <option value="MM1K">MM1K</option>
            <option value="MMc">MMc</option>
            <option value="MMcK">MMcK</option>
        </select>
    </form>
    `

    const modelMenu = document.querySelector("#models-names")
    modelMenu.addEventListener("change", evt => showModel(app, evt))
}


