import React, { useState } from "react";
import logo from "../assets/logo.svg";
import Map from "./Maps";

export default function NavBar() {
  const [distance, setDistance] = useState("");
  const [origin, setOrigin] = useState("");
  const [destinations, setDestinations] = useState("");
  const [originLat, setOriginLat] = useState("");
  const [originLon, setOriginLon] = useState("");
  const [destLat, setDestLat] = useState("");
  const [destLon, setDestLon] = useState("");
  const addOrigin = (e) => {
    setOrigin(e.target.value);
  };
  const addDestinations = (e) => {
    setDestinations(e.target.value);
  };
  const Submit = (e) => {
    e.preventDefault();
    if (destinations.length === 0 || origin.length === 0) {
      return alert("please enter full detail");
    }

    fetch(
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${origin}&key=${process.env.REACT_APP_DISTANCE_TOKEN}`
      )
        .then((response) => response.json())
        .then((response) => {
          setOriginLat(response.results[0].geometry.lat);
          setOriginLon(response.results[0].geometry.lng);
        })
        .catch((err) => console.error(err))
    );
    fetch(
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${destinations}&key=${process.env.REACT_APP_DISTANCE_TOKEN}`
      )
        .then((response) => response.json())
        .then((response) => {
          setDestLat(response.results[0].geometry.lat);
          setDestLon(response.results[0].geometry.lng);
        })
        .catch((err) => console.error(err))
    );
  };
  const pull_Tdistance = (data) => {
    setDistance(data);
  };
  return (
    <div>
      <nav>
        <img src={logo} alt="logo" className="logo" />
      </nav>
      <p>
        Let's calculate <strong>distance</strong> from Leaflet maps
      </p>
      <div className="container">
        <div className="details">
          <div className="form">
            <form onSubmit={Submit}>
              <label>
                Origin <input type="text" onChange={addOrigin} />
              </label>
              <button>Calculate</button>
              <label>
                Destination <input type="text" onChange={addDestinations} />
              </label>
            </form>
          </div>
          <div className="distance">
            <div className="calcArea">
              <span>Distance</span>
              {originLat.length === 0 ||
              originLon.length === 0 ||
              destLat.length === 0 ||
              destLon.length === 0 ? (
                ""
              ) : (
                <strong>{parseInt(distance / 1000)} KMS</strong>
              )}
            </div>
            <p className="total-distance">
              The distance between <strong>{origin}</strong> and{" "}
              <strong>{destinations}</strong> is {distance / 1000} kms.
            </p>
          </div>
        </div>

        <Map
          className="map-container"
          originArr={[originLat, originLon]}
          destinationArr={[destLat, destLon]}
          func={pull_Tdistance}
        />
      </div>
    </div>
  );
}
