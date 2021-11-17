/*
        TESTING
 */
import {DD1k_case1} from "./Deterministic/DD1k_case1";
import {DD1k_case2} from "./Deterministic/DD1k_case2";

let problem = new DD1k_case2(1,3,4, 7);
console.log(problem.waiting_time(0));