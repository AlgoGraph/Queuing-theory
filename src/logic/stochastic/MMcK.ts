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

import {factorial} from "../../utils";

export class MMcK {
    constructor(private arrivalRate: number, private serviceRate: number, private numberOfServers: number, private systemCapacity: number) {}




    // ρ = λ/(cµ): utilization of the server; also the probability that the server is busy or
    // the proportion of time the server is busy.
    // reviewed
    calcUtilizationOfTheServer = (): number => {
        return this.arrivalRate / (this.serviceRate * this.numberOfServers);
    }


    calcPropForCustomersInSystem = (numberOfCustomers: number): number => {

        if (numberOfCustomers < 0 || numberOfCustomers > this.systemCapacity) {
            throw new Error(`Number of Customers can't be a negative number or bigger than ${this.systemCapacity}`);
        }
        // P0
        else if (numberOfCustomers == 0) {
            let part1: number = 0
            for (let n = 0; n < this.numberOfServers; n++) {
                const x: number = Math.pow((this.arrivalRate / this.serviceRate), n);
                const y: number = 1 / factorial(n);
                part1 += x * y;
            }

            let part2: number = (1 / factorial(this.numberOfServers)) *
                (Math.pow((this.arrivalRate / this.serviceRate), this.numberOfServers));

            if (this.calcUtilizationOfTheServer() == 1){
                part2 *= this.systemCapacity - this.numberOfServers + 1;
            } else {
                part2 *= ((1 - Math.pow(this.calcUtilizationOfTheServer(),
                    this.systemCapacity - this.numberOfServers + 1)) / (1 - this.calcUtilizationOfTheServer()))
            }

            return  Math.pow((part1 + part2), -1);

        } else {
            if (numberOfCustomers < this.numberOfServers) {
                return Math.pow((this.arrivalRate / this.serviceRate), numberOfCustomers) *
                    (1 / factorial(numberOfCustomers)) * this.calcPropForCustomersInSystem(0);
            } else {
                return Math.pow((this.arrivalRate / this.serviceRate), numberOfCustomers) *
                    (1 / factorial(this.numberOfServers)) *
                    (1 / Math.pow(this.numberOfServers, (numberOfCustomers - this.numberOfServers))) *
                    this.calcPropForCustomersInSystem(0);
            }
        }
    }

    // L
    calcNumberOfCustomerInTheSystem = () => {
        let L: number = this.calcNumberOfCustomerInTheQueue() + this.numberOfServers;

        let x: number = 0;
        for (let n: number = 0; n < this.numberOfServers; n++) {
            x += (this.numberOfServers - n)  * ((1 / factorial(n)) *
                (Math.pow((this.arrivalRate / this.serviceRate), n)));
        }

        L -= x * this.calcPropForCustomersInSystem(0)

        return L

    }

    // Lq
    // reviewed
    calcNumberOfCustomerInTheQueue = (): number => {
        let Lq: number = 0;

        for (let n: number = this.numberOfServers + 1; n <= this.systemCapacity; n++) {
            Lq += (n - this.numberOfServers) * this.calcPropForCustomersInSystem(n);
        }

        return Lq;

    }

    // W
    // reviewed
    calcWaitingTimeInTheSystem = (): number => {
        return this.calcNumberOfCustomerInTheSystem() / (this.arrivalRate * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)));
    }

    // Wq
    // reviewed
    calcWaitingTimeInTheQueue = (): number => {
        return this.calcNumberOfCustomerInTheQueue() / (this.arrivalRate * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)));
    }

    // Ci`
    // TODO: make sure this is valid for this model
    // reviewed
    calcAverageNumberOfIdleServer = (): number => {
        return this.numberOfServers - (this.arrivalRate / this.serviceRate)
    }
}

// note: here for the testing: jest fail to create using the constructor for some reason and i don't have time for it right now
// TODO: remove
export const createMMcK = (arrivalRate: number, serviceRate: number, numberOfServers: number, systemCapacity: number) => {
    return new MMcK(arrivalRate, serviceRate, numberOfServers, systemCapacity)
}
