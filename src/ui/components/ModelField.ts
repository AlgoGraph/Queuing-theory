export default function ModelField(fieldId: string, label: string, disabled: boolean = true,
                                   showVisualiseButton: boolean = true, value: string = ""): string {
    let field: string = `
    
        <label for="${fieldId}">
                ${label}
            <span></span>
            </label>
            <input id="${fieldId}" name="${fieldId}" type="text" placeholder="" value="${value}" ${disabled ? "disabled" : ""}>
    `

    if (showVisualiseButton) {
        field += `
            <button class="visualise" data-param="${fieldId}">Visualise</button>        
        `
    }

    return field
}

