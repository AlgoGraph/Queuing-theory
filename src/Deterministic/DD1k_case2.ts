import {DD1K} from "./DD1K";

export class DD1k_case2 extends DD1K{
    Ti : number ;
    intial_number_of_cusotomers: number;

    constructor(service_time: number, interarrival_time: number, k: number, intial_number_of_cusotomers: number) {
        super(service_time,interarrival_time,k);
        this.intial_number_of_cusotomers = intial_number_of_cusotomers;
        this.Ti = this.calculate_Ti();
    }

    calculate_Ti = (): number => {
        let answer: number = 0;
        for (let i = 0; i < 1000; i++) {
            if(Math.floor(this.service_rate * i + this.epsilon)  - Math.floor(this.arrival_rate * i + this.epsilon) == this.intial_number_of_cusotomers ){
                answer = i;
                break;
            }
        }
        return answer;
    };

    number_of_customers = (t: number): number => {
        let answer: number = 0;

        if(this.arrival_rate == this.service_rate)answer  =this.intial_number_of_cusotomers;
        if(t < this.Ti){
            answer = this.intial_number_of_cusotomers  + Math.floor(this.arrival_rate * t + this.epsilon)  - Math.floor(this.service_rate * t + this.epsilon);
        }else {
            // Todo
        }

        return answer;
    };

    waiting_time = (n: number): number =>  {
        let answer: number = 0;

        if(this.service_rate ==this.arrival_rate){
            answer = (this.intial_number_of_cusotomers - 1) / (1 / this.service_rate);
        }
        else if(n==0){
           answer = (this.intial_number_of_cusotomers - 1) / ( 2 * this.service_rate);
        }else if( n < Math.floor(this.arrival_rate * this.Ti)){
            answer = (this.intial_number_of_cusotomers - 1 + n) * ( 1 / this.service_rate) - n * (1 / this.service_rate);
        }else answer = 0;

        return answer;
    }

}