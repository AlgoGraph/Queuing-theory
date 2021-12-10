export abstract class DD1K {

    arrival_rate: number;
    service_rate: number;
    k: number;
    epsilon: number   = 0.00000000001;

    protected constructor(service_time: number, interarrival_time: number, k: number) {
        this.arrival_rate = 1 / interarrival_time;
        this.service_rate = 1 / service_time;
        this.k = k + 1;
    }

    abstract  calculate_Ti: () =>number ;
    abstract  number_of_customers: (t: number)  => number;
    abstract  waiting_time: (n: number)  => number ;
}
