export default function ModelField(fieldId: string, label: string, disabled: boolean = true,
                                   showVisualiseButton: boolean = false, variable: string = '', variableLabel: string = ''): string {
    let field: string = `
    
        <label for="${fieldId}">
                ${label}
            <span></span>
            </label>
            <input id="${fieldId}" name="${fieldId}" type="text" placeholder="" value="" ${disabled ? "disabled" : ""}>
    `

    if (showVisualiseButton) {
        field += `
            <button class="visualise" data-param="${fieldId}">Visualise</button>        
        `
    }

    if (variable.length != 0) {
        field += `
            <label for="${variable}" class="variable">
            ${variableLabel}
            <span></span>
            </label>
            <input id="${variable}" name="${variable}" type="text" placeholder="" value="">
        `
    }

    return field;
}

