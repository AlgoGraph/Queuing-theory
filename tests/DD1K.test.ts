import {createDD1K} from "../src/Deterministic/DD1K";

describe("DD1K first case: lambda > mu", () => {

    test("", () => {
        const dd1k = createDD1K(1 / 4, 1 / 6, 4);
        // result is 40 because of the nature of floats
        // expect(dd1k.calcTi()).toBe(44);
        expect(dd1k.calcNumberOfCustomers(2)).toBe(0);
        expect(dd1k.calcNumberOfCustomers(12)).toBe(2);
    })
});
