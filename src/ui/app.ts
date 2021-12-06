import modelMenu from "./ModelMenu.js";

function init(): void {
    let app: Element | null = document.querySelector("#app");

    if (app) {
        modelMenu(app);
    }
}

init();

