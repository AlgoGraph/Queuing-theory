import {createMM1K, MM1K} from "../src/logic/stochastic/MM1K";
import {MM1} from "../src/logic/stochastic/MM1";



describe("MM1K", () => {
    test("slide 5 page 8 B/", () => {
        const mm1k = createMM1K(2, 2.4,  5);
        expect(mm1k.calcNumberOfCustomerInTheQueue() - 1.22).toBeLessThan(0.01);
        expect(mm1k.calcNumberOfCustomerInTheSystem() - 1.97).toBeLessThan(0.01);
        expect(mm1k.calcWaitingTimeInTheSystem() - 1.1).toBeLessThan(0.01);
        expect(mm1k.calcWaitingTimeInTheQueue() - 0.685).toBeLessThan(0.01);
        expect(mm1k.calcPropForCustomersInSystem(5) - 0.1).toBeLessThan(0.01);
    });
});
