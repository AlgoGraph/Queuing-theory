import {MMc} from "../src/logic/stochastic/MMc";



describe("MMC", () => {
    test("slide 6 page 7 ", () => {
        const mmc = new MMc(1 / 10, 1 / 20,  3);
        expect(0.889 - mmc.calcNumberOfCustomerInTheQueue() ).toBeLessThan(0.001);
        expect( mmc.calcWaitingTimeInTheSystem() - 28.88).toBeLessThan(0.01);
        expect( mmc.calcAverageNumberOfIdleServer() ).toBe(1);
    });
});

describe("MMC", () => {
    test("slide 6 page 12 B/", () => {
        const mmc = new MMc(11 / 20, 1 / 3, 2);
        expect( mmc.calcPropForCustomersInSystem(0) -0.95).toBeLessThan(0.01);
        expect( mmc.calcNumberOfCustomerInTheSystem() -5.16).toBeLessThan(0.01);
    });
});
