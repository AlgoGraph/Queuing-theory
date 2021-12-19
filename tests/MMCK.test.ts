import {createMMcK, MMcK} from "../src/logic/stochastic/MMcK";


describe("MMCK", () => {
    test("slide 6 page 11 ", () => {
        const mmck = createMMcK(1, 1 / 6, 3, 7);
        expect(mmck.calcNumberOfCustomerInTheSystem() - 6.06).toBeLessThan(0.01);
        expect(mmck.calcWaitingTimeInTheSystem() - 12.3).toBeLessThan(0.1);
        expect(60 * mmck.calcPropForCustomersInSystem(7) - 30.4).toBeLessThan(0.1); //30.3
    });

    test("slide 6 page 12 ", () => {
        const mmck = createMMcK(3 / 10, 1 / 3, 3, 7);
        expect(mmck.calcNumberOfCustomerInTheSystem() - 6.06).toBeLessThan(0.01);
        expect(mmck.calcWaitingTimeInTheSystem() - 12.3).toBeLessThan(0.1);
        expect(60 * mmck.calcPropForCustomersInSystem(7) - 30.4).toBeLessThan(0.1); //30.3
    });


    test("slide 6 page 15 A/", () => {
        const mmck = createMMcK(3, 1 / 2, 4, 4);
        expect(mmck.calcPropForCustomersInSystem(4) - 0.46).toBeLessThan(0.01);
    });

    test("slide 6 page 15 B/", () => {
        const mmck = createMMcK(3, 1 / 2, 4, 12);
        expect(mmck.calcPropForCustomersInSystem(0) - 0.00024).toBeLessThan(0.0001);
        expect(mmck.calcPropForCustomersInSystem(12) - 0.332).toBeLessThan(0.01);//0.337
        expect(mmck.calcNumberOfCustomerInTheQueue() - 6.14).toBeLessThan(0.01);
    });
});

