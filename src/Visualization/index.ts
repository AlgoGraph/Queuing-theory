import modal from "../ui/components/Modal";
import {Model} from "../types";
import Chart from "chart.js/auto";
import {DD1k} from "../logic/Deterministic/DD1K";
import {MM1} from "../logic/stochastic/MM1";
import {MM1K} from "../logic/stochastic/MM1K";
import {MMcK} from "../logic/stochastic/MMcK";


// TODO: move to another file
export function visualise(model: Model, param: string) {
    // add the canvas to the modalContent and open it
    modal.insert_content(`
    <h2>${param}</h2>
    <canvas id="myChart"></canvas>
    `);
    modal.open();

    // calc the data
    const {data, label, count} = calcData(model, param);

    // create the chart
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: (("" + Array(count)).split(',').map(function () {
                return this[0]++
            }, [1])),
            datasets: [{
                label: `${label}`,
                data: data,
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


function calcData(model: Model, param: string): { data: number[], label: string, count: number} {
    const resultList = {
        nt: {
            data: [],
            label: "Number of customer in the system",
            count: () => (model instanceof DD1k) ? (model as DD1k).calcTi() + 10 : 20,
            calcFunction: (model as DD1k).calcNumberOfCustomers
        },
        Wqn: {
            data: [],
            label: "the time this customer will wait is",
            count: 20 ,
            calcFunction: (model as DD1k).calcWaitingTime
        },
        Pn: {
            data: [],
            label: "the Probability is",
            count: (model instanceof MM1K || model instanceof MMcK) ? (model as MM1K | MMcK).getSystemCapacity() : 20,
            calcFunction: (model as MM1).calcPropForCustomersInSystem
        }
    }

    for (let i = 0; i < resultList[param].count; i++) {
        resultList[param].data.push(resultList[param].calcFunction(i))
    }

    return resultList[param];
}
