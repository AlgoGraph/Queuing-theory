import {DD1K} from "./DD1K";

export class DD1k_case1 extends DD1K{
    Ti : number ;

    constructor(service_time: number, interarrival_time: number, k: number) {
        super(service_time,interarrival_time,k);
        this.Ti = this.calculate_Ti();
    }

    calculate_Ti = (): number => {
        let answer: number = 0;
        for (let i = 1; i < 1000; i++) {
            if ( Math.floor(this.arrival_rate * i + this.epsilon ) - Math.floor(this.service_rate * i - this.service_rate / this.arrival_rate + this.epsilon) == this.k) {
                answer = i;
                break;
            }
        }
        return answer;
    };

    number_of_customers = (t: number): number => {
        let answer: number = 0;
        if (t < 1 / this.arrival_rate) answer = 0;
        else if (t >= 1 / this.arrival_rate && t < this.Ti)
            answer = Math.floor(this.arrival_rate * t + this.epsilon) - Math.floor(this.service_rate * t - this.service_rate / this.arrival_rate+ this.epsilon);
        else if (t >= this.Ti) {
            if((1 / this.service_rate) % (1 /this.arrival_rate) == 0)
                answer =this.k - 1;
        }else {
            //Todo
        }
        return answer;
    };

    waiting_time = (n: number): number =>  {
        let answer: number = 0;
        if(n==0)
            answer = 0;
        else if(n < this.arrival_rate * this.Ti)
            answer = ( (1 / this.service_rate)- (1 / this.arrival_rate)) * (n-1);
        else {
            //Todo
        }
        return answer;
    }

}