import React, { Component } from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: -6.200000, lng: 106.816666 }}
  >
    {
      props.region.map((data,index)=>{
        const helo = 'helo';
        return(
          <Marker
            position={{ lat: data.x, lng: data.y }}
          />
        )
      })
    }
    
  </GoogleMap>
));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      region:[
        {
          lokasiid:64100,
          x: -6.1161274, 
          y: 106.7631043
        },
        {
          lokasiid:64101,
          x: -6.2128734, 
          y: 106.7837462
        },
      ]
    };
  }
  render() {
    return (
      <div style={{width:"100vw", height:"100vh"}}>
        <MapWithAMarker
          region={this.state.region}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD4DtpjgzXjI5q-ZjmDObB7r3Tw3Q7xl58&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height:"100%"}}/>}
          containerElement={<div style={{height:"100%"}}/>}
          mapElement={<div style={{height:"100%"}}/>}
        />
      </div>
    );
  }
}

export default App;
