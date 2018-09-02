import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchingForm from './SearchingForm';
import { GOOGLE_KEY } from '../consts';

const mapStyle  = {styles: require('../jsons/mapStyle.json')};
const key = GOOGLE_KEY;




class MainMap extends Component {

    static defaultProps = {
    center: {
      lat: 41.923782,
      lng: 25.919254
    },
    zoom: 5.03,
  };

      constructor(props){
    super(props);
    this.state = {
      style:{
        display: 'none',
        left:0,
        top:0
      },
      geo:{
        lat:0,
        lng:0
      }

    }
    // this.increment = this.increment.bind(this);
  }


  _onClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event)
    this.setState({
      style:{
        display:'block',
        left:x-15,
        top:y-15
      },
      geo:{
        lat:lat,
        lng:lng 
      }
    });
    // console.log(this.state.style);
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }} >
        <SearchingForm style={this.state.style} geo={this.state.geo}/>
        <GoogleMapReact
          onClick={this._onClick}
          options={mapStyle}
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
    );
  }
}

export default MainMap;



        // <div style={{width: '20%', height:'100px', position:'absolute','z-index':'100',background:'#000' ,display:this.state.display, top:this.state.y, left:this.state.x}}>
        //   <h1>Hello World</h1>
        // </div>

