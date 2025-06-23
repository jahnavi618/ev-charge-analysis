
// Sample data (to be replaced with actual data from CSV)
const dates = ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05'];
const batteryStart = [30, 40, 50, 60, 70];
const batteryEnd = [50, 60, 70, 80, 90];
const distance = [40, 50, 60, 70, 80];

// Battery Chart
const ctx1 = document.getElementById('batteryChart').getContext('2d');
const batteryChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Battery Start (%)',
            data: batteryStart,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
        }, {
            label: 'Battery End (%)',
            data: batteryEnd,
            borderColor: 'rgb(153, 102, 255)',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
});

// Efficiency Chart
const efficiency = distance.map((dist, index) => dist / (batteryEnd[index] - batteryStart[index]));
const ctx2 = document.getElementById('efficiencyChart').getContext('2d');
const efficiencyChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: dates,
        datasets: [{
            label: 'Efficiency (km per % Battery)',
            data: efficiency,
            backgroundColor: 'rgb(255, 159, 64)'
        }]
    },
    options: {
        responsive: true
    }
});
