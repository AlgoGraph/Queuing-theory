import {createMM1} from "../src/logic/stochastic/MM1";

describe("MM1", () => {
    test("slide 4 page 10", () => {
        const mm1 = createMM1(50, 60 );
        expect(mm1.calcNumberOfCustomerInTheQueue()).toBe(4.0 + 1 / 6);
        expect(mm1.calcNumberOfCustomerInTheSystem()).toBe(5);
        expect(mm1.calcWaitingTimeInTheSystem()).toBe(1 / 10);
        expect(mm1.calcWaitingTimeInTheQueue()).toBe(1 / 12);
        //need to be explained
        expect(mm1.calcPropForCustomersInSystem(0)- 1 / 6).toBeLessThan(0.00001);
    });

    test("slide 4 page 13 A /", () => {
        const mm1 = createMM1(1 / 10, 1 /8 );
        expect(mm1.calcNumberOfCustomerInTheSystem() - 4 ).toBeLessThan(0.00001);
        expect(mm1.calcWaitingTimeInTheSystem() - 40 ).toBeLessThan(0.00001);
        expect(mm1.calcWaitingTimeInTheQueue() - 32 ).toBeLessThan(0.00001);

    });

    test("slide 4 page 13 B /", () => {
        const mm1 = createMM1(1 / 9, 1 /8 );
        expect(mm1.calcNumberOfCustomerInTheSystem() - 8 ).toBeLessThan(0.00001);
        expect(mm1.calcWaitingTimeInTheSystem() - 72 ).toBeLessThan(0.00001);
        expect(mm1.calcWaitingTimeInTheQueue() - 64 ).toBeLessThan(0.00001);

    });

    test("slide 4 page 18  ", () => {
        const mm1 = createMM1(1 / 5, 1 / 2 );
        expect(mm1.calcUtilizationOfTheServer()).toBe(2 / 5);
    });

    test("slide 4 page 18  ", () => {
        const mm1 = createMM1(18 / 60 , 1 / 2 );
        expect( Math.abs(mm1.calcWaitingTimeInTheQueue()) - 3).toBeLessThan(0.0001);
    });


    test("slide 6 page 12 A/", () => {
        const mm1 = createMM1(3 / 10, 1 / 3);
        expect(mm1.calcWaitingTimeInTheQueue()- 27  ).toBeLessThan(0.0001);
    });

    test("slide 6 page 12 A/", () => {
        const mm1 = createMM1(3 / 4, 1 / 3);
        expect(mm1.calcWaitingTimeInTheQueue()- 9  ).toBeLessThan(0.0001);
    });

});

