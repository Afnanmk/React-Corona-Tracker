import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [chartData, setChartData] = useState();

  return (
    <div>
      <h5>Worldwide Live Cases</h5>
      <Line />
    </div>
  );
}

export default LineGraph;
