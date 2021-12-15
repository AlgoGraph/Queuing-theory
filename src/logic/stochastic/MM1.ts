/*
* The formulas were developed under specific assumptions:
* Poisson arrivals, exponential service times, steady-state conditions, and queue stability.
*
* ruw => traffic intensity (check it is < 1)
* ruw = lambda / mu
* P0 = 1 - ruw
* Pn = (1 - ruw) ruw^n
* n => number of customers in the system
* L => expected number in the system in steady state
* L = lambda / (mu - lambda) [valid only when ruw < 1 ad when ruw > 1 it gve negative number + steady state]
* Lq => expected number in the queue in steady state
* Lq = lambda^2 / mu(mu - lambda)
* W => expected waiting time in the system
* W = 1 / (mu - lambda)
* Wq => expected waiting time in the queue
* Wq = ruw / (mu - lambda)
*
*
* constrains :
*   -  ruw <= 1
*   - lambda < mu
*   - no steady state solution exists if lambda >= mu
*   -
* */


export class MM1 {
    constructor(private arrivalRate: number, private serviceRate: number) {
    }

    // reviewed
    calcUtilizationOfTheServer(): number {
        return this.arrivalRate / this.serviceRate;
    }

    // reviewed
    calcPropForCustomersInSystem(numberOfCustomers: number): number {
        if (numberOfCustomers < 0) {
            throw new Error("Number of Customers can't be a negative number")
        } else if (numberOfCustomers == 0) {
            return 1 - this.calcUtilizationOfTheServer();
        } else {
            return Math.pow(this.calcUtilizationOfTheServer(), numberOfCustomers) * (1 - this.calcUtilizationOfTheServer());
        }
    }

    // reviewed
    calcNumberOfCustomerInTheSystem(): number {
        return this.arrivalRate / (this.serviceRate - this.arrivalRate)
    }

    // reviewed
    calcNumberOfCustomerInTheQueue(): number {
        return Math.pow(this.arrivalRate, 2) / (this.serviceRate * (this.serviceRate - this.arrivalRate));
    }

    // reviewed
    calcWaitingTimeInTheSystem(): number {
        return 1 / (this.serviceRate - this.arrivalRate);
    }

    // reviewed
    calcWaitingTimeInTheQueue(): number {
        return this.arrivalRate / (this.serviceRate * (this.serviceRate - this.arrivalRate));
    }
}

// note: here for the testing: jest fail to create using the constructor for some reason and i don't have time for it right now
// TODO: remove
export const createMM1 = (arrivalRate: number, serviceRate: number) => {
    return new MM1(arrivalRate, serviceRate)
}
