import {MMcK} from "../src/logic/stochastic/MMcK";


describe("MMC", () => {
    test("slide 6 page 11 ", () => {
        const mmck = new MMcK(1, 1 / 6, 3, 7);
        expect(mmck.calcNumberOfCustomerInTheSystem() - 6.06).toBeLessThan(0.01);
        expect(mmck.calcWaitingTimeInTheSystem() - 12.3).toBeLessThan(0.1);
        expect(60 * mmck.calcPropForCustomersInSystem(7) - 30.4).toBeLessThan(0.1); //30.3
    });
});


describe("MMC", () => {
    test("slide 6 page 12 ", () => {
        const mmck = new MMcK(3 / 10, 1 / 3, 3, 7);
        expect(mmck.calcNumberOfCustomerInTheSystem() - 6.06).toBeLessThan(0.01);
        expect(mmck.calcWaitingTimeInTheSystem() - 12.3).toBeLessThan(0.1);
        expect(60 * mmck.calcPropForCustomersInSystem(7) - 30.4).toBeLessThan(0.1); //30.3
    });
});

describe("MMC", () => {
    test("slide 6 page 15 A/", () => {
        const mmck = new MMcK(3, 1 / 2, 4, 4);
        expect(mmck.calcPropForCustomersInSystem(4) - 0.46).toBeLessThan(0.01);
    });
});

//has  a problem with mu
describe("MMC", () => {
    test("slide 6 page 15 B/", () => {
        const mmck = new MMcK(3, 1 / 2, 4, 12);
        expect(mmck.calcPropForCustomersInSystem(0) - 0.00024).toBeLessThan(0.0001);
        expect(mmck.calcPropForCustomersInSystem(12) - 0.332).toBeLessThan(0.01);//0.337
        expect(mmck.calcNumberOfCustomerInTheQueue()).toBe(0.001);
    });
});
