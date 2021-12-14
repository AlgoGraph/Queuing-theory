export enum  Models {
    DD1K,
    MM1,
    MM1K,
    MMc,
    MMcK
}

export type UserInput = {
    validInput: boolean,
    lambda: string,
    mu: string,
    K?: string,
    c?: string,
    M?: string
}
