import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { Marker } from "react-map-gl";

function App() {
  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 2.3522,
          latitude: 48.8566,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={2.3522}
          latitude={48.8566}
          offsetLeft={-20}
          offsetTop={-10}
          anchor="bottom"
        ></Marker>
      </Map>
      ;
    </div>
  );
}

export default App;
