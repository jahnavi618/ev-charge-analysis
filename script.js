fetch("EVIndia_chart_data.csv")
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split("\n").slice(1);
    const carNames = [], rangeList = [], priceList = [], typeCount = {}, bootList = [];

    rows.forEach(row => {
      const cols = row.split(",");
      const name = cols[0].trim();
      const type = cols[1].trim();
      const range = parseFloat(cols[2]);
      const price = parseFloat(cols[3]);
      const boot = parseInt(cols[4]);

      if (!isNaN(range) && !isNaN(price) && !isNaN(boot)) {
        carNames.push(name);
        rangeList.push(range);
        priceList.push(price);
        bootList.push(boot);

        typeCount[type] = (typeCount[type] || 0) + 1;
      }
    });

    // Chart 1: Range
    new Chart(document.getElementById("rangeChart"), {
      type: "bar",
      data: {
        labels: carNames,
        datasets: [{
          label: "Range (km)",
          data: rangeList,
          backgroundColor: "skyblue"
        }]
      }
    });

    // Chart 2: Price
    new Chart(document.getElementById("priceChart"), {
      type: "bar",
      data: {
        labels: carNames,
        datasets: [{
          label: "Price (Lakhs)",
          data: priceList,
          backgroundColor: "orange"
        }]
      }
    });

    // Chart 3: Car Type Pie
    new Chart(document.getElementById("carTypeChart"), {
      type: "pie",
      data: {
        labels: Object.keys(typeCount),
        datasets: [{
          label: "Car Type",
          data: Object.values(typeCount),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#9ccc65", "#ab47bc"]
        }]
      }
    });

    // Chart 4: Range vs Price Line
    new Chart(document.getElementById("rangeVsPriceChart"), {
      type: "line",
      data: {
        labels: carNames,
        datasets: [
          {
            label: "Range (km)",
            data: rangeList,
            borderColor: "blue",
            fill: false
          },
          {
            label: "Price (Lakhs)",
            data: priceList,
            borderColor: "red",
            fill: false
          }
        ]
      }
    });

    // Chart 5: Boot Space Doughnut
    let small = 0, medium = 0, large = 0;
    bootList.forEach(b => {
      if (b < 400) small++;
      else if (b <= 500) medium++;
      else large++;
    });

    new Chart(document.getElementById("bootChart"), {
      type: "doughnut",
      data: {
        labels: ["Small (<400L)", "Medium (400-500L)", "Large (>500L)"],
        datasets: [{
          data: [small, medium, large],
          backgroundColor: ["#FF9999", "#FFCC66", "#66CC99"]
        }]
      }
    });

  })
  .catch(error => {
    console.error("Error loading CSV:", error);
  });
