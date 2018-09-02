import React, { Component } from 'react';
import { GOOGLE_KEY } from '../consts';


import Geocode from "react-geocode";

import './css/form.css';

import { Icon } from 'react-icons-kit';
import {plusCircle} from 'react-icons-kit/fa/plusCircle';


const key = GOOGLE_KEY;
Geocode.setApiKey(key);




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
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);
  // console.log(this.state.search);
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
            <input type='text' placeholder="Search..." name="search" onChange={this.onChange}></input>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchingForm;

