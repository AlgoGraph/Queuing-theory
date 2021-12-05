/*
* different from M/M/c is that the arrival rate λ n must now be 0 whenever n > Κ.
*
* Pn:
*      - 0 <= n <= c,
*           - (lambda^n / (n! * mu^n)) * P0
*      - c < n < k
*           - (Lambda^n / (c^(n - c) * c! * mu^n)) * P0
* P0 :
*   -> ruw != 1
*       ((r^c / c!) ((1 - ruw^(K - c + 1)) / (1  - ruw)) + Sum form n = 0 to c -1 (r^n / n1) )^-1
*   -> rwu = 1
*       ((r^c / c!) (K - c + 1) + Sum form n = 0 to c -1 (r^n / n1) )^-1
* Lambda`
*   - lambda * (1 - Pk)
*
* Lq
*   ((ruw * r^c * P0) / (c! * (1 - ruw)^2) * (1 - ruw^(k - c + 1) - ((1 - ruw)(k - c + 1) * ruw^(k - c))))^-1
*
* L
*   Lq + c - P0 * Sum from  n = 0 to c -1 ((c - n)(r^n / n!))
* Wq
*   Lq / Lambda`
* W
*   L / lambda
*
*
*
*   r = lambda / mu
*   (ruw) p = r / c
*
*
*  */

import {factorial} from "../utils";

class MMcK {
    constructor(private numberOfServers: number, private arrivalRate: number, private serviceRate: number, private systemCapacity: number) {}

    calcServiceRate(numberOfCustomer: number): number {
        if (numberOfCustomer < 0 || numberOfCustomer > this.systemCapacity) {
            throw new Error(`Number of Customers can't be a negative number or bigger than ${this.systemCapacity}`);
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
        if (numberOfCustomers < 0 || numberOfCustomers > this.systemCapacity) {
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

            let part2: number = (1 / factorial(this.numberOfServers)) *
                (Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), this.numberOfServers));

            if (this.calcUtilizationOfTheServer(numberOfCustomers) == 1){
                part2 *= this.systemCapacity - this.numberOfServers + 1;
            } else {
                part2 *= ((1 - Math.pow(this.calcUtilizationOfTheServer(numberOfCustomers),
                    this.systemCapacity - this.numberOfServers + 1)) / (1 - this.calcUtilizationOfTheServer(numberOfCustomers)))
            }

            return  Math.pow((part1 + part2), -1);

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
        let L: number = this.calcNumberOfCustomerInTheQueue(numberOfCustomers) + this.numberOfServers;

        let x: number = 0;
        for (let n: number = 0; n < this.numberOfServers; n++) {
            x += (this.numberOfServers - n);
        }

        L -= x * this.calcPropForCustomersInSystem(0) * ((1 / factorial(this.numberOfServers)) *
            (Math.pow((this.arrivalRate / this.calcServiceRate(numberOfCustomers)), this.numberOfServers)))

        return L
    }

    // Lq
    calcNumberOfCustomerInTheQueue(numberOfCustomers: number): number {
        let Lq: number = 0;

        for (let n: number = this.numberOfServers + 1; n <= this.systemCapacity; n++) {
            Lq += (n - this.numberOfServers) * this.calcPropForCustomersInSystem(n);
        }

        return Lq;

    }

    // W
    calcWaitingTimeInTheSystem(numberOfCustomers: number): number {
        return this.calcNumberOfCustomerInTheSystem(numberOfCustomers) / (this.arrivalRate * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)));
    }

    // Wq
    calcWaitingTimeInTheQueue(numberOfCustomers: number): number {
        return this.calcNumberOfCustomerInTheQueue(numberOfCustomers) / (this.arrivalRate * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)));
    }

    // Ci`
    // TODO: make sure this is valid for this model
    calcAverageNumberOfIdleServer(numberOfCustomers: number): number {
        return this.numberOfServers - (this.arrivalRate / this.calcServiceRate(numberOfCustomers))
    }



}
