import modelMenu from "./ModelMenu.js";

export enum Models {
    MM1,
    MM1K,
    MMc,
    MMcK
}


function init(): void {
    let app: Element | null = document.querySelector("#app");

    if (app) {
        modelMenu(app);
    }
}

init();

