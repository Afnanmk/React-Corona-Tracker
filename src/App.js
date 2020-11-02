import React, { useState, useEffect } from "react";
import "./App.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./Util";
import { CardContent, Card } from "@material-ui/core";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      const url = "https://disease.sh/v3/covid-19/countries";
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);
  // console.log(countries);

  const onCountryChange = async e => {
    const countryCode = e.target.value;

    const url =
      countryCode === "global"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="app__title">
            COVID19 <span>TRACKER</span>
          </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
              className="app__select"
            >
              <MenuItem value="global">Global</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value} className="app__menuItem">
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Confirmed Cases"
            total={countryInfo.cases}
            daily={countryInfo.todayCases}
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            daily={countryInfo.todayRecovered}
          />
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            daily={countryInfo.todayDeaths}
          />
        </div>

        <Map />
        {/* News */}
      </div>

      <div className="app__right">
        {/* <Card>
          <CardContent>
            <div className="app__information">
              <h5>Table of Countries Affected</h5>
              <Table tableCountries={tableData} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h5>Chart of Worldwide cases </h5>
          </CardContent>
        </Card> */}
        <div className="app__information">
          <h5>Countries Affected</h5>
          <p>Source: WorldOmeter</p>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search Country"
            className="searchInput"
          />
          <Table tableCountries={tableData} />
        </div>
        <div className="app__chart">
          <Card>
            <CardContent>
              <LineGraph />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
