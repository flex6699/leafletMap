import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing(props) {
  const map = useMap();

  const [distance, setDistance] = useState("");
  let [originLat, originLon] = props.originArr;
  let [destLat, destLon] = props.destinationArr;
  if (
    originLat.length === 0 ||
    originLon.length === 0 ||
    destLat.length === 0 ||
    destLon.length === 0
  ) {
    originLat = null;
    originLon = null;
    destLat = null;
    destLon = null;
  }
  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(originLat, originLon), L.latLng(destLat, destLon)],

      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);
    routingControl.on("routesfound", function (e) {
      setDistance(e.routes[0].summary.totalDistance);
    });
    return () => map.removeControl(routingControl);
  }, [map, originLat, originLon, destLat, destLon, distance]);
  props.func(distance);
  return null;
}
