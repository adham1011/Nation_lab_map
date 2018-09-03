import React, { Component } from 'react';
import { GEO_KEY } from '../consts';


import Geocode from "react-geocode";

import './css/form.css';

import { Icon } from 'react-icons-kit';
import {plusCircle} from 'react-icons-kit/fa/plusCircle';


const geo_key = GEO_KEY;
Geocode.setApiKey(geo_key);
Geocode.enableDebug();





class SearchingForm extends Component {
  constructor(props) {
  super(props);
  this.state = { 
    search: '' 
  };
  this.submit = this.submit.bind(this);
  this.onChange = this.onChange.bind(this);

}
submit(e){
  e.preventDefault();

  Geocode.fromLatLng(this.props.geo.lat, this.props.geo.lng).then(
  response => {
    console.log('okay !');
    const address = response.results[0].address_components.filter(obj => obj.types.find(elem=>{
      return elem === 'country';
    }));
    console.log(address);
  },
  error => {
    console.error(error);
  }
);
}

onChange(e){
  this.setState({[e.target.name]: e.target.value});
}

  render() {
    return (
      <div className="main-sector" style={this.props.style}>
        <div style={{color:'#FE523B',position:'relative',display:'inline-block'}}><Icon size={32} icon={plusCircle} /></div>
        <div className='result'>
          <form onSubmit={this.submit}>
            <input type='text' placeholder="Search..." name="search" autoComplete="off" onChange={this.onChange}></input>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchingForm;

