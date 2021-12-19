import {createDD1K} from "../src/logic/Deterministic/DD1K";
import {createMM1} from "../src/logic/stochastic/MM1";


describe("DD1K first case: lambda > mu", () => {
    test("slide 1 page 22", () => {

        const dd1k = createDD1K(1 / 3, 1 / 5, 4);
        expect(dd1k.calcNumberOfCustomers(11)).toBe(2);
        expect(dd1k.calcNumberOfCustomers(20)).toBe(3);
    });

    test("slide 2 page 7", () => {
        const dd1k = createDD1K(1 / 4, 1 / 6, 4);
        expect(dd1k.calcTi()).toBe(44);

        expect(dd1k.calcNumberOfCustomers(3)).toBe(0);
        expect(dd1k.calcNumberOfCustomers(4)).toBe(1);

        expect(dd1k.calcWaitingTime(10)).toBe(18);
        expect(dd1k.calcWaitingTime(9)).toBe(16);
        expect(dd1k.calcWaitingTime(1)).toBe(0);
    });

    test("slide 2 page 15", () => {
        const dd1k = createDD1K(1 / 4, 1 / 8, 4);
        expect(dd1k.calcTi()).toBe(32);

        expect(dd1k.calcNumberOfCustomers(3)).toBe(0);
        expect(dd1k.calcNumberOfCustomers(8)).toBe(2);

        expect(dd1k.calcWaitingTime(1)).toBe(0);
        expect(dd1k.calcWaitingTime(2)).toBe(4);
        expect(dd1k.calcWaitingTime(3)).toBe(8);
        expect(dd1k.calcWaitingTime(4)).toBe(12);
        expect(dd1k.calcWaitingTime(7)).toBe(24);
        expect(dd1k.calcWaitingTime(8)).toBe(24);

    });

    test("slide 2 page 25", () => {
        const dd1k = createDD1K(1 / 3, 1 , 4, 7);
        expect(dd1k.calcTi()).toBe(10);

        expect(dd1k.calcNumberOfCustomers(6)).toBe(3);
        expect(dd1k.calcNumberOfCustomers(11)).toBe(1);
        expect(dd1k.calcWaitingTime(1)).toBe(4);
        expect(dd1k.calcWaitingTime(2)).toBe(2);
        expect(dd1k.calcWaitingTime(3)).toBe(0);
        expect(dd1k.calcWaitingTime(4)).toBe(0);

    });
});
