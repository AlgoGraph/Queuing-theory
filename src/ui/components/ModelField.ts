export default function ModelField(fieldId: string, label: string, disabled: boolean = true,
                                   showVisualiseButton: boolean = false, variable: string = '', variableLabel: string = ''): string {
    let field: string = '';

    if (showVisualiseButton) {
        field += `
            <div class="dependantInput">
        `
    }

    field +=    `
        <div class="inputContainer">
        <label for="${fieldId}">
                ${label}
            <span></span>
            </label>
            <input id="${fieldId}" name="${fieldId}" type="text" placeholder="" value="" ${disabled ? "disabled" : ""}>
       </div>

    `

    if (showVisualiseButton) {
        field += `
            <button class="visualise" data-param="${fieldId}">Visualise</button>        
        `
    }

    if (variable.length != 0) {
        field += `
            <div class="variable inputContainer">

            <label for="${variable}" class="variable">
            ${variableLabel}
            <span></span>
            </label>
            <input id="${variable}" name="${variable}" type="text" placeholder="" value="">
            </div>
        `
    }


    if (showVisualiseButton) {
        field += `
            </div>
        `
    }
    return field;
}

