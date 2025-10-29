
async function getData() {
    const response = await fetch('../../data/algorithm-performance.csv'); // path to your CSV file
    const data = await response.text(); // convert CSV to plain text
    console.log(data); // optional: see the raw data in console

    const labels = []; // x-axis: algorithm names
    const accuracy = [];
    const execTime = [];
    const memory = [];
    const falsePos = [];
    const falseNeg = [];

    const table = data.split('\n').slice(1); // split lines and skip header

    table.forEach(row => {
        const columns = row.split(',');
        const algo = columns[0];
        const acc = parseFloat(columns[1]);
        const time = parseFloat(columns[2]);
        const mem = parseFloat(columns[3]);
        const fp = parseFloat(columns[4]);
        const fn = parseFloat(columns[5]);

        labels.push(algo);
        accuracy.push(acc);
        execTime.push(time);
        memory.push(mem);
        falsePos.push(fp);
        falseNeg.push(fn);
    });

    // return all arrays in one object
    return { labels, accuracy, execTime, memory, falsePos, falseNeg };
}

async function createChart() {
    const data = await getData();
    const ctx = document.getElementById('barChart');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels, // x-axis
            datasets: [
                {
                    label: 'Accuracy (%)',
                    data: data.accuracy,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Execution Time (ms)',
                    data: data.execTime,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Memory Usage (MB)',
                    data: data.memory,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'False Positive Rate (%)',
                    data: data.falsePos,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'False Negative Rate (%)',
                    data: data.falseNeg,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Algorithm',
                        font: { size: 14 }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values',
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Algorithm Performance Comparison',
                    font: { size: 20 },
                    padding: { top: 10, bottom: 30 }
                },
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

createChart();
