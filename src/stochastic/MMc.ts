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
import {factorial} from "../utils";

class MMc {

    constructor(private numberOfServers: number, private arrivalRate: number, private serviceRate: number) {}

    calcServiceRate(numberOfCustomer: number): number {
        if (numberOfCustomer < 0) {
            throw new Error("Number of Customers can't be a negative number");
        } else if (numberOfCustomer >= 0 && numberOfCustomer < this.numberOfServers) {
            return numberOfCustomer * this.serviceRate;
        } else {
            return this.serviceRate * this.numberOfServers;
        }
    }

    // ρ = λ/(cµ): utilization of the server; also the probability that the server is busy or
    // the proportion of time the server is busy.
    calcUtilizationOfTheServer(numberOfCustomers: number): number {
        return this.arrivalRate / (this.calcServiceRate(numberOfCustomers) * this.numberOfServers);
    }

    calcPropForCustomersInSystem(numberOfCustomers: number): number {
        if (numberOfCustomers < 0) {
            throw new Error("Number of Customers can't be a negative number");
        }
        // P0
        else if (numberOfCustomers == 0) {
            let part1: number = 0
            for (let n = 0; n < this.numberOfServers; n++) {
                const x: number = Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), n);
                const y: number = 1 / factorial(numberOfCustomers);
                part1 += x * y;
            }

            let part2: number = 0;

            if (this.calcUtilizationOfTheServer(numberOfCustomers) < 1) {
                part2 =
                    (this.numberOfServers * Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)),
                        this.numberOfServers))
                    /
                    (factorial(this.numberOfServers) * (this.numberOfServers - (this.arrivalRate / this.calcServiceRate(numberOfCustomers))))
            } else {
                part2 = (1 / factorial(this.numberOfServers)) *
                    (Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), this.numberOfServers)) *
                    ((this.numberOfServers * this.calcServiceRate(numberOfCustomers)) /
                        ((this.numberOfServers * this.calcServiceRate(numberOfCustomers)) - this.arrivalRate))
            }

            return Math.pow((part1 + part2), -1);
        } else {
            if (numberOfCustomers < this.numberOfServers) {
                return Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), numberOfCustomers) *
                    (1 / factorial(numberOfCustomers)) * this.calcPropForCustomersInSystem(0);
            } else {
                return Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), numberOfCustomers) *
                    (1 / factorial(numberOfCustomers)) *
                    (1 / Math.pow(this.numberOfServers, (numberOfCustomers - this.numberOfServers))) *
                    this.calcPropForCustomersInSystem(0);
            }
        }
    }

    // L
    calcNumberOfCustomerInTheSystem(numberOfCustomers: number) {
        return this.calcNumberOfCustomerInTheQueue(numberOfCustomers) + (this.arrivalRate / this.calcServiceRate(numberOfCustomers));
    }

    // Lq
    calcNumberOfCustomerInTheQueue(numberOfCustomers: number): number {
        return ((Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), this.numberOfServers) *
                    this.arrivalRate * this.calcServiceRate(numberOfCustomers))
                /
                (factorial(this.numberOfServers - 1) * Math.pow(((this.numberOfServers * this.calcServiceRate(numberOfCustomers)) - this.arrivalRate), 2)))
            *
            this.calcPropForCustomersInSystem(0);

    }

    // W
    calcWaitingTimeInTheSystem(numberOfCustomers: number): number {
        return this.calcWaitingTimeInTheQueue(numberOfCustomers) + (1 / this.calcServiceRate(numberOfCustomers));
    }

    // Wq
    calcWaitingTimeInTheQueue(numberOfCustomers: number): number {
        return this.calcNumberOfCustomerInTheQueue(numberOfCustomers) / this.numberOfServers;
    }

    // Ci`
    calcAverageNumberOfIdleServer(numberOfCustomers: number): number {
        return this.numberOfServers - (this.arrivalRate / this.calcServiceRate(numberOfCustomers))
    }

}
