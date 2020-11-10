import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./Util";

function Map({ mapCountries, casesType, center, zoom }) {
  return (
    <>
      <h5 className="hint">Hint: Click on red circles to see more info</h5>
      <div className="map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(mapCountries, casesType)}
        </LeafletMap>
      </div>
    </>
  );
}

export default Map;
