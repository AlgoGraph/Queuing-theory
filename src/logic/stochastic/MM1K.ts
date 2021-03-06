/*
* ruw = lambda / mu
* Pn = ruw^n * P0 => for n < K
* P0 = (1 - ruw) / (1 - ruw^(k+1)) => ruw != 1
* Pn :
*   - ruw^n * (1 - ruw) / (1 - ruw^(k+1)) => ruw != 1
*   - 1/K+1 => ruw = 1
* Lambda`:
*   - lambda * (1 -Pk)
* L:
*   - when ruw = 1:
*       - k/2
*   - else :
*       - ruw * ((1 - ((K + 1) * ruw^k) + (k * ruw^(K+1)) ) / ((1 - ruw) * (1 - ruw^(K+1))))
*       - lambda` * W
* Lq = lambda`  * Wq = Lambda * (1 - Pk) * Wq  = L - (lambda` / mu)
* W = L / lambda` = L / (lambda * (1 - Pk))
* Wq = W -Ws = W -  1/mu
*
*
* */
export  class MM1K {
    constructor(private arrivalRate: number, private serviceRate: number, private systemCapacity: number) {}

    getSystemCapacity = () => {
        return this.systemCapacity;
    }
    // reviewed
    calcUtilizationOfTheServer = (): number => {
        return this.arrivalRate / this.serviceRate;
    }

    // reviewed
    calcPropForCustomersInSystem = (numberOfCustomers: number): number => {
        if (numberOfCustomers < 0) {
            throw new Error("Number of Customers can't be a negative number")
        } else if (this.calcUtilizationOfTheServer() == 1) {
            return 1 / (this.systemCapacity + 1)
        } else {
            return Math.pow(this.calcUtilizationOfTheServer(), numberOfCustomers) *
                ((1 - this.calcUtilizationOfTheServer()) / (1 - Math.pow(this.calcUtilizationOfTheServer(), this.systemCapacity + 1)));
        }
    }

    // reviewed
    calcNumberOfCustomerInTheSystem = (): number => {
        if (this.calcUtilizationOfTheServer() == 1) {
            return this.systemCapacity / 2;
        } else {
            return  this.calcUtilizationOfTheServer() * (
                (1 - ((this.systemCapacity + 1) * Math.pow(this.calcUtilizationOfTheServer(), this.systemCapacity)) +
                    (this.systemCapacity * Math.pow(this.calcUtilizationOfTheServer(), this.systemCapacity + 1)))
                /
                ((1 -this.calcUtilizationOfTheServer()) * (1 - Math.pow(this.calcUtilizationOfTheServer(), this.systemCapacity + 1)))
            )
        }
    }

    // reviewed
    calcNumberOfCustomerInTheQueue = (): number => {
        return this.calcNumberOfCustomerInTheSystem() - (this.calcUtilizationOfTheServer() * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)))
    }

    // reviewed
    calcWaitingTimeInTheSystem = (): number => {
        return this.calcNumberOfCustomerInTheSystem() / (this.arrivalRate * (1 - this.calcPropForCustomersInSystem(this.systemCapacity)))
    }

    // reviewed
    calcWaitingTimeInTheQueue = (): number => {
        return this.calcWaitingTimeInTheSystem() - (1 / this.serviceRate)
    }

}

// note: here for the testing: jest fail to create using the constructor for some reason and i don't have time for it right now
// TODO: remove
export const createMM1K = (arrivalRate: number, serviceRate: number, systemCapacity: number) => {
    return new MM1K(arrivalRate, serviceRate, systemCapacity)
}
