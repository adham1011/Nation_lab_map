import React, { Component } from 'react';
import { GEO_KEY } from '../consts';
import axios from 'axios';

import './css/form.css';

import { Icon } from 'react-icons-kit';
import {plusCircle} from 'react-icons-kit/fa/plusCircle';
import pin from '../icons/pin.svg';



import Geocode from "react-geocode";
const geo_key = GEO_KEY;
Geocode.setApiKey(geo_key);
Geocode.enableDebug();



var listitem=[];

class SearchingForm extends Component {
  constructor(props) {
  super(props);
  this.state = { 
    search: '',
    C_long_name:'France',
    location:'fr',
    results:[],
    isresult:'none'
  };
  this.submit = this.submit.bind(this);
  this.onChange = this.onChange.bind(this);
  this.handleResponse= this.handleResponse.bind(this);
  this.request= this.request.bind(this);

}


handleResponse(item,i){
  return(
    <div key={i} className='result-info'>
      <a href={item.childNodes[1].childNodes[0].rawText} target="_blank">{item.childNodes[0].childNodes[0].rawText}</a>
      <p>{item.childNodes[2].childNodes[0].rawText}</p>
    </div>
    );
}
request(location){
  //   this.setState({
  //     location:this.props.geo.short_name.toLowerCase(),
  //     C_long_name:this.props.geo.long_name,
  //     results: []
  // });
    axios.post('https://bubble-map.herokuapp.com/search',{
      location:location,
      search:this.state.search
    })
    .then(res=>{
      // this.handleResponse(res.data.result)
      this.setState({
        results:res.data.result,
        isresult:'block'
      });
      // console.log(listitem);
    })
    .catch(err=>{
      console.log(err);
    })
}
submit(e){
  e.preventDefault();
  this.setState({
      location:this.props.geo.short_name.toLowerCase(),
      C_long_name:this.props.geo.long_name,
      results: []
  });
  {this.request(this.props.geo.short_name.toLowerCase())}
    // this.setState({
    //   location:this.props.geo.short_name.toLowerCase(),
    //   C_long_name:this.props.geo.long_name,
    //   results: []
    // });
    // console.log(this.props.geo);
    // axios.post('https://bubble-map.herokuapp.com/search',{
    //   location:this.state.location,
    //   search:this.state.search
    // })
    // .then(res=>{
    //   // this.handleResponse(res.data.result)
    //   this.setState({
    //     results:res.data.result,
    //     isresult:'block'
    //   });
    //   // console.log(listitem);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
}

onChange(e){
  this.setState({[e.target.name]: e.target.value,isresult:'none'});
  if(this.props.display == 'block'){
    var value = 'none';
    this.props.ishelp(value);
  }
}

componentDidUpdate(prevProps){
  if(prevProps.geo.short_name !== this.props.geo.short_name && this.state.search.length>0 && this.props.display === 'none'){
      this.setState({
      location:this.props.geo.short_name.toLowerCase(),
      C_long_name:this.props.geo.long_name,
      results: []
    });
    {this.request(this.props.geo.short_name.toLowerCase())}
  }

}

  render() {
    return (
      <div className="search-result" style={this.props.style}>
        <img src={pin} className="pin" />
        <form onSubmit={this.submit}>
            <input type='text' placeholder="Search..." name="search" autoComplete="off" onChange={this.onChange}></input>
        </form>
        <div className="results" style={{display:(this.props.display)==='none' ? this.state.isresult : 'none'}}>
          <h5>{this.state.C_long_name}</h5>
          {this.state.results.map(this.handleResponse)}
        </div>
      </div>
    );
  }
}

export default SearchingForm;





        // <div style={{color:'#FE523B',position:'relative',display:'inline-block'}}><Icon size={32} icon={plusCircle} />
        // </div>




