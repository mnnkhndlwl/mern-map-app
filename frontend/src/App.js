import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from '@material-ui/icons';
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import "./app.css";
import React from "react";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [viewState, setViewState] = React.useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 1,
  });
  const [showPopup, setShowPopup] = React.useState(true);
  const [pins, setPins] = useState([]);
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState(0);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPins();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      long: newPlace.long,
      lat: newPlace.lat,

    };
    try {
      const response = await axios.post("pins/new", newPin);
      setPins([...pins, response.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long, zoom: 4 }); // on clicking centering the map and it will change 
    // latitute and longitude
  }

  const handleAddClick = (e) => {
    console.log(e.lngLat.lat);
    const longitude = e.lngLat.lng;
    const latitude = e.lngLat.lat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  return (
    <div className="App">
      <ReactMapGL
        style={{ width: '100vw', height: '100vh' }}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/grx406/cl0kzfg1t008014qbgzdhd5xj"
        mapboxAccessToken={process.env.REACT_APP_MAPAPI}
        onDblClick={handleAddClick}
      >
        {pins.map(p => (
          <>
            {/**Marker */}
            <Marker longitude={p.long} latitude={p.lat} offsetLeft={-20} offsetTop={-10}>
              <Room style={{ fontSize: viewState.zoom * 10, color: (p.username === currentUser) ? "blue" : "red", cursor: "pointer" }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {/**Location Card */}
            {p._id === currentPlaceId && (
              <Popup longitude={p.long} latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">Created By <b>{p.username}</b></span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder="Enter tittle" autoFocus
                  onChange={(e) => setTitle(e.target.value)} />
                <label>Review</label>
                <textarea placeholder="Kuch btaiye iss jagah ke bare me! kesi lagi" onChange={(e) => setDesc(e.target.value)}></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Add new Location</button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (<button className="button logout">Log Out</button>) : (
          <div className="buttons">
            <button className="button login">Login</button>
            <button className="button register">Register</button>
          </div>
        )}
        <Register />
      </ReactMapGL>
    </div>
  );
}
export default App;