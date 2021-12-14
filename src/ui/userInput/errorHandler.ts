export function showError(fieldID: string, errorMessage: string) {
    const field = document.querySelector(`label[for=${fieldID}] span`);
    console.log(field)
    field.innerHTML = errorMessage;
}

export function clearError(fieldID: string) {
    const field = document.querySelector(`label[for=${fieldID}] span`);
    console.log(field)
    field.innerHTML = "";
}

export function clearAllErrors() {
    const field = document.querySelector(`label span`);
    console.log(field)
    field.innerHTML = "";
}
