export  class DD1k {
    Ti: number;

    // λ, µ, K
    constructor(private arrival_rate: number, private service_rate: number, private systemCapacity: number, private numberOfCustomerAtTheStart: number = 0) {}

    calcTi = (): number =>{
        let Ti: number = Math.floor(1 / this.arrival_rate);
        // reviewed
        if (this.arrival_rate > this.service_rate) {
            while (true) {

                if (Math.floor(this.arrival_rate * Ti) -
                    Math.floor((this.service_rate * Ti -
                        (this.service_rate / this.arrival_rate)) + 0.0001)
                    == (this.systemCapacity + 1)) {
                    return Ti;
                }
                Ti++;
            }
        } else {
            while (true) {
                if (this.numberOfCustomerAtTheStart + Math.floor(this.arrival_rate * Ti) -
                    Math.floor(this.service_rate * Ti)
                    == 0) {
                    return Ti;
                }
                Ti++;
            }
        }

    };

    calcNumberOfCustomers = (time: number): number => {
        console.log("sss", time)
        // TODO: for case 1 check if t < 1/lambda gives 0
        console.log(this.arrival_rate)
        console.log(this.service_rate)
        if (this.arrival_rate > this.service_rate) {
            if (time < 1 / this.arrival_rate) {
                return 0
            } else if (time < this.calcTi()){
                return Math.floor(this.arrival_rate * time) - Math.floor((this.service_rate * time - (this.service_rate / this.arrival_rate)) + 0.0001);
            } else {
                // TODO: it should alternate ? how and what is the way ?
                return this.systemCapacity;
            }
        }
        // TODO: what about when both are equal ?
        else {
            return this.numberOfCustomerAtTheStart + Math.floor(this.arrival_rate * time + 0.0001) - Math.floor(this.service_rate * time + 0.0001);
        }

    };

    calcWaitingTime = (numberOfCustomer: number): number => {
        if (this.arrival_rate > this.service_rate) {
            if (numberOfCustomer == 0) {
                console.log("ssssff", 0)
                return 0;
            } else if (numberOfCustomer < this.arrival_rate * this.calcTi()) {
                return ((1 / this.service_rate) - (1 / this.arrival_rate)) * (numberOfCustomer - 1);
            } else {
                return ((1 / this.service_rate) - (1 / this.arrival_rate)) * ((this.arrival_rate * this.calcTi()) - 2);
            }
        }
        // reviewed
        else if (this.arrival_rate == this.service_rate) {
            return (this.numberOfCustomerAtTheStart - 1) * (1 / this.service_rate)
        }
        // reviewed
        else {
            if (numberOfCustomer == 0) {
                console.log("ssssff", 0)

                return (this.numberOfCustomerAtTheStart - 1) / (2 * this.service_rate);
            } else if (numberOfCustomer < Math.floor(this.arrival_rate * this.calcTi())) {
                return (this.numberOfCustomerAtTheStart - 1 + numberOfCustomer) * (1 / this.service_rate) -
                    numberOfCustomer * (1 / this.arrival_rate)
            } else {
                return 0;
            }
        }

    }
}

// note: here for the testing: jest fail to create using the constructor for some reason and i don't have time for it right now
// TODO: remove
export const createDD1K = (arrival_rate: number, service_rate: number, systemCapacity: number, numberOfCustomerAtTheStart: number = 0) => {
    return new DD1k(arrival_rate, service_rate, systemCapacity, numberOfCustomerAtTheStart)
}

