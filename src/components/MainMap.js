import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import SearchingForm from './SearchingForm';
import { GOOGLE_KEY } from '../consts';
import { GEO_KEY } from '../consts';
import './css/style.css';


const mapStyle  = {styles: require('../jsons/mapStyle.json'),scrollwheel: false, zoomControl:false,gestureHandling:'cooperative'};
const key = GOOGLE_KEY;


const geo_key = GEO_KEY;
Geocode.setApiKey(geo_key);
Geocode.enableDebug();


class MainMap extends Component {

    static defaultProps = {
    center: {
      lat: 46.2276,
      lng: 2.2137
    },
    zoom: 5.72,
  };

    constructor(props){
    super(props);
    this.state = {
      display:'block',
       style:{
        left:`${50}%`,
        top:`${50}%`
      },
      geo:{
        lat:0,
        lng:0,
        short_name:'fr',
        long_name:'France'
      }
    }
    // this.increment = this.increment.bind(this);
  }

    helpClick = ({event}) =>{
    this.setState({
      display:'block',
      style:{
        left:`${50}%`,
        top:`${50}%`
      },
      geo:{
        short_name:'fr',
        long_name:'France'
      }
    });
  }

  showHide = (value)=>{
    console.log(value);
    this.setState({
      display:value
    })
  }


  _onClick = ({x, y, lat, lng, event}) => {

  Geocode.fromLatLng(lat, lng).then(
  response => {
    console.log('okay !');
    const address = response.results[0].address_components.filter(obj => obj.types.find(elem=>{
      return elem === 'country';
    }))
    console.log(address);
    // console.log(`Adress: ${address.long_name}`);
    this.setState({
      style:{
        left:x,
        top:y+20
      },
      geo:{
        lat:lat,
        lng:lng,
        long_name : address[0].long_name,
        short_name: address[0].short_name 
      }
    });
    console.log(this.state.geo);
    console.log(`new address:${address[0].short_name}`)
  },err=>{
    console.log(err);
  }
  );
}

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }} >
        <button className='help' onClick={this.helpClick} style={{display:(this.state.display === 'none')? 'block' : 'none' }}>help</button>
        <h1 className='main-big-title mt-3' style={{display:(this.state.display === 'none')? 'block' : 'none' }}>LET'S TAKE<br/>A SEARCH<br/>FOR A RIDE</h1>

        <div className="container-fluid">
          <div className="row">
            <div className='col-12 help-box' style={{display:this.state.display}}>
              <div className=" col-12 text-center mt-5">
                <h6 className="small-title">Google presents different results for every country.</h6>
                <h1 className='main-title'>LET'S TAKE<br/>A SEARCH<br/>FOR A RIDE</h1>
              </div>
              <div className='instructions'>
                <h6 className="small-title">
                1. Tap your request in the search box<br/>
                2. pick up a location and see how the result will change
                </h6>
              </div>
            </div>
            <SearchingForm style={this.state.style} geo={this.state.geo} display={this.state.display} ishelp={this.showHide}/>
          </div>
        </div>
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




