import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return(
    <div className="App">
     <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken= {process.env.REACT_APP_MAPAPI}
  />
  </div>
  );
}
export default App;