export function showError(fieldID: string, errorMessage: string) {

    const field = document.querySelector(`label[for=${fieldID}] span`);
    field.innerHTML = `<br /> ${errorMessage}`;
}

export function clearError(fieldID: string) {
    const field = document.querySelector(`label[for=${fieldID}] span`);
    console.log(field)
    field.innerHTML = "";
}

export function clearAllErrors() {
    const fieldList = document.querySelectorAll(`label span`);

    fieldList.forEach(field => field.innerHTML = "");
}
