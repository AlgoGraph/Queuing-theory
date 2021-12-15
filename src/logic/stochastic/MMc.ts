/*
* lambdaN = Lambda
* MuN =
*   if 1 <= n <= c -> n * mu
*   if n >= c -> c * mu
* Note we use LambdaN and MuN in the laws ********
* Pn =
*   ((lambda^n) / (n! * mu^n)) * P0 -> 0 <= n <= c
*   ((lambda^n) / (c^(n - c) * c! * mu^n)) * P0 -> n >= c
*
* r = lambda / mu
* ruw = r / c = lambda / (c * mu)
* P0 = ((r^c / (c! * (1 - ruw))) + (Sum from n =0 to c - 1 : (r^n / n!)))^-1
*       -> r/c < 1
*
* Lq = ((r^c *  ruw) / (c! 8 (1 - ruw)^2)) / P0
* L = Lq + (lambda / mu)
* Wq = Lq / lambda
* W = Lq / lambda + 1 / mu
*
* */
import {factorial} from "../../utils";

export class MMc {

    constructor(private arrivalRate: number, private serviceRate: number, private numberOfServers: number) {}



    // ρ = λ/(cµ): utilization of the server; also the probability that the server is busy or
    // the proportion of time the server is busy.
    // reviewed
    calcUtilizationOfTheServer = (numberOfCustomers: number): number => {
        return this.arrivalRate / (this.serviceRate * this.numberOfServers);
    }

    // reviewed
    calcPropForCustomersInSystem = (numberOfCustomers: number): number => {
        if (numberOfCustomers < 0) {
            throw new Error("Number of Customers can't be a negative number");
        }
        // P0
        else if (numberOfCustomers == 0) {

            let part1: number = 0
            for (let n = 0; n < this.numberOfServers; n++) {
                const x: number = Math.pow((this.arrivalRate / this.serviceRate), n);
                const y: number = 1 / factorial(n);
                part1 += x * y;
            }

            let part2: number = 0;

            if (this.calcUtilizationOfTheServer(numberOfCustomers) < 1) {
                part2 =
                    (this.numberOfServers * Math.pow((this.arrivalRate / this.serviceRate),
                        this.numberOfServers))
                    /
                    (factorial(this.numberOfServers) * (this.numberOfServers - (this.arrivalRate / this.serviceRate)))
            } else {
                part2 = (1 / factorial(this.numberOfServers)) *
                    (Math.pow((this.arrivalRate / this.serviceRate), this.numberOfServers)) *
                    ((this.numberOfServers * this.serviceRate) /
                        ((this.numberOfServers * this.serviceRate) - this.arrivalRate))
            }

            return Math.pow((part1 + part2), -1);
        } else {
            if (numberOfCustomers < this.numberOfServers) {
                return Math.pow((this.arrivalRate / this.serviceRate), numberOfCustomers) *
                    (1 / factorial(numberOfCustomers)) * this.calcPropForCustomersInSystem(0);
            } else {
                return Math.pow((this.arrivalRate / this.serviceRate), numberOfCustomers) *
                    (1 / factorial(numberOfCustomers)) *
                    (1 / Math.pow(this.numberOfServers, (numberOfCustomers - this.numberOfServers))) *
                    this.calcPropForCustomersInSystem(0);
            }
        }
    }

    // L
    // reviewed
    calcNumberOfCustomerInTheSystem = () => {
        return this.calcNumberOfCustomerInTheQueue() + (this.arrivalRate / this.serviceRate);
    }

    // Lq
    // reviewed
    calcNumberOfCustomerInTheQueue = (): number => {
        return ((Math.pow((this.arrivalRate / this.serviceRate), this.numberOfServers) *
                    this.arrivalRate * this.serviceRate)
                /
                (factorial(this.numberOfServers - 1) *
                    Math.pow(((this.numberOfServers * this.serviceRate) - this.arrivalRate), 2)))
                *
                this.calcPropForCustomersInSystem(0);
    }

    // W
    // reviewed
    calcWaitingTimeInTheSystem = (): number => {
        return (this.calcNumberOfCustomerInTheQueue() / this.arrivalRate) + (1 / this.serviceRate);
    }

    // Wq
    // reviewed
    calcWaitingTimeInTheQueue = (): number => {
        console.log("ff", this.arrivalRate)
        return this.calcNumberOfCustomerInTheQueue() / this.arrivalRate;
    }

    // Ci`
    // reviewed
    calcAverageNumberOfIdleServer = (): number => {
        return this.numberOfServers - (this.arrivalRate / this.serviceRate)
    }

}

// note: here for the testing: jest fail to create using the constructor for some reason and i don't have time for it right now
// TODO: remove
export const createMMc = (arrivalRate: number, serviceRate: number, numberOfServers: number) => {
    return new MMc(arrivalRate, serviceRate, numberOfServers)
}
