import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const [pins, setPins] = useState([]);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [viewState, setViewState] = useState({
    latitude: 48.844852,
    longitude: 2.2788143,
    zoom: 8,
  });

  const currentUser = "jane";

  //new title, new desc, and new rating
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:8800/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState((prevViewport) => ({
      ...prevViewport,
      latitude: lat,
      longitude: long,
    }));
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      long: lng,
      lat: lat,
    });
  };
  const [settings, setsettings] = useState({
    doubleClickZoom: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Map
        {...settings}
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}

        // initialViewState={viewport}
      >
        {pins.map((p) => (
          <>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetRight={-10}
            >
              <LocationOnIcon
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                style={{
                  fontSize: viewState.zoom * 7,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
              />
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="decs">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="stars" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            onClose={() => setNewPlace(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us someting about this destination"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
