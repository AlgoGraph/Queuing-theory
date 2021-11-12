export default class DD1K {
    constructor(props) {
        this.lambda = Number(props.lambda);
        this.mu = Number(props.mu);
    }

    getNumberOfCustomersAtTime(time) {
        // n(t) = floor(lambda * time) - floor([mu * time] - [mu/lambda])
        return Math.floor(this.lambda * time) - Math.floor((this.mu * time) - (this.mu / this.lambda));
    }
}
