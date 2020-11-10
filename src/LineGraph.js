import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";

const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  // responsive: false,
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, chartData) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          }
        }
      }
    ]
  }
};

function LineGraph({ casesType = "cases" }) {
  const [chartData, setChartData] = useState();

  const buildChartData = (data, casesType = "cases") => {
    const chartsData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        };
        chartsData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartsData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
          let chartsData = buildChartData(data, "cases");
          setChartData(chartsData);
          console.log(chartsData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div className="lineGraph">
      <h5>Worldwide live cases over time</h5>
      {chartData?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
                data: chartData
              }
            ]
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
