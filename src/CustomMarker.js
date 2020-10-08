import React, {Component} from 'react';
import {InfoWindow, Marker} from 'react-google-maps';

export default class CustomMarker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       muncul: false
    }
  }
  
  onMarkerClick(){
    this.setState({
      muncul:true
    })
  }

  render() {
    const { data } = this.props
    return (
      <Marker
            // onClick={() => onMarkerClick(data)}
            onClick={() => this.onMarkerClick()}
            {...this.props}
        >
          {this.state.muncul && (
            <InfoWindow>
              <div>{data}</div>
            </InfoWindow>
          )}
        </Marker>
    )
  }
}
