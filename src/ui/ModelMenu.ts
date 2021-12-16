import showModel from "./ModePage";

export default function modelMenu(): void {
    const menu = document.querySelector("#model-menu");

    menu.innerHTML = `
        <h2>Choose Your Model: </h2>
        <ul id="Menu">
            <li class="modelType">Deterministic</li>
            <li id="DD1K">DD1K</li>
            <li class="modelType">Stochastic</li>
            <li id="MM1">MM1</li>
            <li id="MM1K">MM1K</li>
            <li id="MMc">MMc</li>
            <li id="MMcK">MMcK</li>
        </ul>
        
    `

    document.querySelectorAll('li[id]').forEach(li => li.addEventListener("click", showModel));
}


