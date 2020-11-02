import React from "react";
import "./Table.css";

function Table({ tableCountries, cases, recovered, deaths }) {
  return (
    <div className="table">
      <tr>
        <th>Country</th>
        <th>Confirmed</th>
        <th>Recovered</th>
        <th>Deaths</th>
      </tr>

      {tableCountries.map(country => (
        <tr>
          <td className="countryName">{country.country}</td>
          <td>{country.cases.toLocaleString()}</td>
          <td>{country.recovered.toLocaleString()}</td>
          <td>{country.deaths.toLocaleString()}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
