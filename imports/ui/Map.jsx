/*External Dependencies*/
import React, { Component, PropTypes } from 'react';

/*Subcomponents*/
import Search from './Search.jsx';

/*React Component*/
export default class Map extends Component {

	constructor(props) {
		super(props);
		this.createMarkers = this.createMarkers.bind(this);
		this.initMap = this.initMap.bind(this);
	}

	componentDidMount() {
	  this.initMap();  
	}

	createMarkers(array) {
		for (var i = 0; i < array.length; i++) {
			new google.maps.Marker({
		    position: array[i],
		    map: this.map,
		    title: 'Hello World!'
		  });
		}
	}

	initMap() {
		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 37.7749, lng: -122.4194},
		  zoom: 3
		});
	}

  render() {
    return (
    	<div className='mapWrap'>
	    	<Search createMarkers={this.createMarkers} />
				<div id='map' style={{width: '400px', height: '300px'}}></div>
			</div>	
    );
  }
}

Map.propTypes = {

};