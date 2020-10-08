
import React, { Component } from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker, InfoWindow
} from "react-google-maps";
import { Card } from 'react-bootstrap';
import CustomMarker from './CustomMarker';

const MapWithAMarker = withScriptjs(withGoogleMap(props =>

  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: -6.200000, lng: 106.816666 }}
  >
    {
      props.region.map((data,index)=>{
        if(data.jenis === 'Motor'){
          data.jenis = '/motormoojol2.png'
        } else {
          data.jenis = '/car.png'
        }
        return(
          <CustomMarker
            data={data.namadriver}
            key={data.driverid}
            position={{ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }}
            icon={{
              url: `${data.jenis}`,
              scaledSize: new window.google.maps.Size(20,35)
            }}
            // onClick={onMarkerClick()}
            // onClick={props.onMarkerClick.bind(this,marker)}
            // onClick={props.functions}
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
      region:[],
      kendaraan:'Motor',
      status:'On',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData, 3000); 
  }

  getData = () => {
    this.getDriverLocation()
  }

  getDataDriver = () => {
    console.log('hello');
  }
  
  getDriverLocation(){
    const { kendaraan, status } = this.state
    fetch(`http://103.253.115.73/db/moojolcustomer/getDriverLocation.php?kendaraan=&status=${status}`)
      .then(response => response.json())
      .then(region => this.setState({ 
        region: region.data,
        cekdata:region
       }));
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.kendaraan !== this.state.kendaraan){
      this.getData()
    }
  }

  handleChange = async (event) =>  {
    await this.setState({kendaraan: event.target.value});
  }

  render() {
    return (
      <div style={{width:"100vw", height:"100vh"}}>
        <MapWithAMarker
          region={this.state.region}
          functions={() => this.getDataDriver()}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD4DtpjgzXjI5q-ZjmDObB7r3Tw3Q7xl58&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{height:"100%"}}/>}
          containerElement={<div style={{height:"100%"}}/>}
          mapElement={<div style={{height:"100%"}}/>}
        />
        <div style={{
          position:'absolute',
          top:10,
          left:200,
          backgroundColor:'white',
          padding:20
        }}>
          <Card body style={{marginBottom:10}}>PT MOOJOL PATRIOT INDONESIA</Card>
          <Card body>Terdapat {this.state.region.length} driver moojol</Card>
        </div>
      </div>
    );
  }
}

export default App;