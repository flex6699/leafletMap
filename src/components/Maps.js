import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Routing from "./Routing";

export default function Map(props) {
  const position = [51.505, -0.09];
  const pull_distance = (data) => {
    props.func(data);
  };
  return (
    <MapContainer
      className="map-container"
      center={position}
      zoom={1}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Routing
        originArr={props.originArr}
        destinationArr={props.destinationArr}
        func={pull_distance}
      />
    </MapContainer>
  );
}
