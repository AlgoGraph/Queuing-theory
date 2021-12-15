import modal from "../ui/components/Modal";
import {Model, Models} from "../types";
import Chart from "chart.js/auto";
import {DD1k} from "../logic/Deterministic/DD1K";
import {MM1} from "../logic/stochastic/MM1";
import {MM1K} from "../logic/stochastic/MM1K";
import {MMcK} from "../logic/stochastic/MMcK";


// TODO: move to another file
export function visualise(model: Model, param: string) {
    console.log(param)
    modal.insert_content(`
    <h2>${param}</h2>
    <canvas id="myChart"></canvas>
    `);
    modal.open();

    // calc the data

    const [generatedData, label, count] = calcData(model, param);


    // create the chart
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ((""+Array(count)).split(',').map(function () {return this[0]++}, [1])),
            datasets: [{
                label: `${label}`,
                data: generatedData,
                // TODO<refactor>: any is not the best solution > check the correct type
                backgroundColor: ([
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ] as any),
                borderColor: ([
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ] as any),
                borderWidth: 1,
                stepped: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


function calcData(model: Model, param: string): [number[], string, number] {
    const data: number[] = [];
    let label: string = "";
    let count = 20;

    if (param === "nt") {
        label = "Number of customer in the system";

        for(let time = 1; time < 20; time++) {
            data.push((model as DD1k).calcNumberOfCustomers(time));
        }
    } else if (param === "Wqn") {
        label = "the time this customer will wait is";


        for(let numberOfCustomers = 1; numberOfCustomers < 20; numberOfCustomers++) {
            data.push((model as DD1k).calcWaitingTime(numberOfCustomers));
        }
    } else if (param === "Pn") {
        label = "the Probability is";

        if (model instanceof MM1K || model instanceof MMcK) {
            count = (model as MM1K | MMcK).getSystemCapacity();
        }
        for(let numberOfCustomers = 1; numberOfCustomers < count; numberOfCustomers++) {
            data.push((model as MM1).calcPropForCustomersInSystem(numberOfCustomers));
        }
    }

    return [data, label, count];
}
