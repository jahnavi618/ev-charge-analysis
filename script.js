fetch("station_data_dataverse.csv")
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n").slice(1); // Skip header row
    const sessionIds = [];
    const kwhList = [];
    const costList = [];

    rows.forEach(row => {
      const cols = row.split(","); // CSV is comma-separated
      const sessionId = cols[0];
      const kwh = parseFloat(cols[1]);
      const dollars = parseFloat(cols[2]);

      if (!isNaN(kwh) && !isNaN(dollars)) {
        sessionIds.push(sessionId);
        kwhList.push(kwh);
        costList.push(dollars);
      }
    });

    // Line chart for kWh per session
    new Chart(document.getElementById('kwhChart'), {
      type: 'line',
      data: {
        labels: sessionIds.slice(0, 20),
        datasets: [{
          label: 'kWh Total',
          data: kwhList.slice(0, 20),
          borderColor: 'blue',
          fill: false
        }]
      }
    });

    // Line chart for Cost per session
    new Chart(document.getElementById('costChart'), {
      type: 'line',
      data: {
        labels: sessionIds.slice(0, 20),
        datasets: [{
          label: 'Cost ($)',
          data: costList.slice(0, 20),
          borderColor: 'green',
          fill: false
        }]
      }
    });

    // Pie chart for Top 5 Costly Sessions
    const top5 = costList
      .map((cost, idx) => ({ cost, sessionId: sessionIds[idx] }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5);

    new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels: top5.map(item => item.sessionId),
        datasets: [{
          label: 'Top 5 Costly Sessions',
          data: top5.map(item => item.cost),
          backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue']
        }]
      }
    });
  });
