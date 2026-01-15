const chartData = {
    data: {
      labels: [
        "CP250A",
        "CP250B",
        "CP250C",
        "CP250D",
        "CP251A",
        "CP251B",
        "CP251C",
        "RR241A",
        "RR241B",
        "RR241C",
        "RR241D"
      ],
      datasets: [
        {
          data: [59.55, 50, 60, 50, 80, 100, 54.54, 91.18, 100, 100, 96],
          backgroundColor: [
            "#3794ff",
            "#3794ff",
            "#3794ff",
            "#3794ff",
            "#3794ff",
            "#3794ff",
            "#3794ff",
            "#ffff00",
            "#ffff00",
            "#ffff00",
            "#ffff00"
          ]
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      title: {
        display: true,
        text: "Zone-ABCD Utilization",
        fontSize: 25
      },
      legend: {
        display: false
      }
    }
  };
  
  export default chartData;
  