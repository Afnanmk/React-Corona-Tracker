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
import "leaflet/dist/leaflet.css";
import { FaRegDotCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { HiOutlineSearch } from "react-icons/hi";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({
    lat: 37.09024,
    lng: -95.712891
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [search, setSearch] = useState("");

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
          const countries = data
            .map(country => ({
              name: country.country,
              value: country.countryInfo.iso2,
              flag: country.countryInfo.flag
            }))
            .filter(country => country.value !== null);
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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
        countryCode === "global"
          ? setMapCenter([37.09024, -95.712891])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      });
  };
  // SEARCH COUNTRY NAMES FROM THE TABLE
  function filterTableSearch(tableData) {
    return tableData.filter(
      country =>
        country.country.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="app__title">
            COVID-19 <span>TRACKER</span>
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

        {/* LIVE ICON */}
        <IconContext.Provider
          value={{
            size: "0.78rem",
            className: "live-icon"
          }}
        >
          <h5 style={{ color: "red", marginLeft: "12px" }}>
            <FaRegDotCircle /> LIVE
          </h5>
        </IconContext.Provider>

        <div className="app__stats">
          <InfoBox
            // oncClick={e => setCasesType("cases")}

            title="Confirmed Cases"
            total={countryInfo.cases}
            daily={countryInfo.todayCases}
          />

          <InfoBox
            // onClick={e => setCasesType("recovered")}
            title="Recovered"
            total={countryInfo.recovered}
            daily={countryInfo.todayRecovered}
          />
          <InfoBox
            // onClick={e => setCasesType("deaths")}
            title="Deaths"
            total={countryInfo.deaths}
            daily={countryInfo.todayDeaths}
          />
        </div>

        <Map
          casesType={casesType}
          mapCountries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

        {/* News */}
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <div className="app__information">
              <h5>Countries Affected</h5>
              <p>Source: WorldOmeter</p>
              <IconContext.Provider value={{ className: "search-icon" }}>
                <HiOutlineSearch />
              </IconContext.Provider>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search Country..."
                className="searchInput"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Table tableCountries={filterTableSearch(tableData)} />
            </div>
            <div className="app__chart">
              <LineGraph />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
