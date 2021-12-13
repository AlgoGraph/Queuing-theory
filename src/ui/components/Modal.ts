class Modal {
    constructor(private content: string = "", private popUp: HTMLElement = document.getElementById("Modal"),
                private closeIcon: HTMLElement = document.querySelector(".hide-Modal")) {

        this.closeIcon.onclick = () => (this.popUp.style.display = "none");

        window.onclick = (event) => {
            if (event.target === this.popUp) this.popUp.style.display = "none";
        }
    }

    insert_content(content: string): void {
        document.querySelector("#inserted-content").innerHTML = content;
    }

    open(size = 80) {
        // reset the size of the pop-up to 80%
        this.changeSize(size);
        // show the pop-up
        this.popUp.style.display = "block";
    }

    close() {
        this.changeSize(80);
        this.closeIcon.click();
    }

    // default size is 80%, Min. = 30 and max. 100
    changeSize(width) {
        if (width >= 40 && width <= 100) {
            (document.querySelector(".Modal-content") as HTMLElement).style.width = width + "%";
            return true;
        }

        return false;
    }
}

// make it a singleton
const modal = new Modal();

Object.freeze(modal);

export default modal;
