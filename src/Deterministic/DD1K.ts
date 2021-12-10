export default class DD1k {
    Ti: number;

    // λ, µ, K
    constructor(private arrival_rate: number, private service_rate: number, private systemCapacity: number, private numberOfCustomerAtTheStart: number = 0) {
    }


    calcTi(): number {
        let Ti: number = 0;
        if (this.arrival_rate > this.service_rate) {
            while (true) {
                if (this.numberOfCustomerAtTheStart + Math.floor(this.arrival_rate * Ti) -
                    Math.floor(this.service_rate * Ti)
                    == 0) {
                    return Ti;
                }
            }
        } else {
            while (true) {
                if (Math.floor(this.arrival_rate * Ti) -
                    Math.floor(this.service_rate * Ti -
                        this.service_rate / this.arrival_rate) == this.systemCapacity) {
                    return Ti;
                }
            }
        }

    };

    calcNumberOfCustomers(time: number): number {
        let result: number = this.numberOfCustomerAtTheStart + Math.floor(this.arrival_rate * time)
        if (this.service_rate > this.arrival_rate) {
            result  -= Math.floor(this.service_rate * time - this.service_rate / this.arrival_rate);
        } else {
            result -= Math.floor(this.service_rate * time);
        }

        return result;
    };

    calcWaitingTime = (numberOfCustomer: number): number => {
        if (this.arrival_rate > this.service_rate) {
            if (numberOfCustomer < this.arrival_rate * this.calcTi()) {
                return ((1 / this.service_rate) - (1 / this.arrival_rate)) * (numberOfCustomer - 1);
            } else {
                return ((1 / this.service_rate) - (1 / this.arrival_rate)) * ((this.arrival_rate * this.calcTi()) - 2);
            }
        } else if (this.arrival_rate == this.service_rate) {
            return (this.numberOfCustomerAtTheStart - 1) * (1 / this.service_rate)
        }
        else {
            if (numberOfCustomer == 0) {
                return (this.numberOfCustomerAtTheStart - 1) / (2 * this.arrival_rate);
            } else if (numberOfCustomer < this.arrival_rate * this.calcTi()) {
                return (this.numberOfCustomerAtTheStart - 1 + numberOfCustomer) * (1 / this.service_rate) -
                    numberOfCustomer * (1 / this.arrival_rate)
            } else {
                return 0;
            }
        }

    }

}

