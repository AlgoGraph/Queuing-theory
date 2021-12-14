import showModel from "./ModePage.js";

export default function modelMenu(): void {
    const menu = document.querySelector("#model-menu");

    menu.innerHTML = `
        <form id="ModelMenu">
            <label for="models-names">
                Choose the model you are going to be working with:
            </label>
            <select name="models-names" id="models-names">
                <option>---</option>
                <option disabled>Deterministic Models</option>
                <option value="DD1K">DD1K</option>
                <option disabled>Stochastic Models</option>
                <option value="MM1">MM1</option>
                <option value="MM1K">MM1K</option>
                <option value="MMc">MMc</option>
                <option value="MMcK">MMcK</option>
            </select>
        </form>
    `

    // onChange => show the right model
    const modelMenu = document.querySelector("#models-names")
    modelMenu.addEventListener("change", showModel)
}


