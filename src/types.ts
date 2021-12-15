import {DD1k} from "./logic/Deterministic/DD1K";
import {MM1} from "./logic/stochastic/MM1";
import {MM1K} from "./logic/stochastic/MM1K";
import {MMc} from "./logic/stochastic/MMc";
import {MMcK} from "./logic/stochastic/MMcK";

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

export type Model = DD1k | MM1 | MM1K | MMc | MMcK;
