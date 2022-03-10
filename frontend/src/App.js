import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from '@material-ui/icons';
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import "./app.css";

function App() {
  const [viewState, setViewState] = React.useState({

    zoom: 3.5
  });
  const [showPopup, setShowPopup] = React.useState(true);
  return (

    <ReactMapGL
      style={{ width: '100vw', height: '100vh' }}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/grx406/cl0kzfg1t008014qbgzdhd5xj"
      mapboxAccessToken={process.env.REACT_APP_MAPAPI}
    >
      {/**Marker */}
      <Marker longitude={2.29449905431968} latitude={48.8582602} offsetLeft={-20} offsetTop={-10}>
        <Room style={{ fontSize: viewState.zoom * 10 }} />
      </Marker>

      {/**Location Card */}
      <Popup longitude={2.29449905431968} latitude={48.8582602}
        anchor="left"
        onClose={() => setShowPopup(false)}>
        <div className="card">
          <label>Place</label>
          <h4 className="place">Eiffel Tower</h4>
          <label>Review</label>
          <p className="desc">Beautiful place</p>
          <label>Rating</label>
          <div className="stars">
            <Star className="star"/>
          </div>
          <label>Information</label>
          <span className="username">Created By <b>Manan</b></span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup>
    </ReactMapGL>

  );
}
export default App;