import  ReactMapGL , { Marker, Popup } from "react-map-gl";
import {Room} from '@material-ui/icons';
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";

function App() {
  const [viewState, setViewState] = React.useState({
    
    zoom: 3.5
  });
  return (

    <ReactMapGL
    style={{width: '100vw', height: '100vh'}}
        {...viewState}
    onMove={evt => setViewState(evt.viewState)}
       mapStyle= "mapbox://styles/grx406/cl0kzfg1t008014qbgzdhd5xj"
    mapboxAccessToken= {process.env.REACT_APP_MAPAPI}
      >
        <Marker longitude={2.29449905431968} latitude={48.8582602} offsetLeft={-20} offsetTop={-10}>
      <Room style={{fontSize:viewState.zoom*10}}/>
    </Marker>
      </ReactMapGL>
    
  );
}
export default App;