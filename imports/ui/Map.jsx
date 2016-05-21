import React, { Component, PropTypes } from 'react';

export default class Map extends Component {

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1IjoibXhtY2ciLCJhIjoiY2lvaGg5d2VqMDFxdHVkbTM4c3Qyc20wbCJ9.dS8RvWeJd_0zTCfX4A5kaA';
			var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v8'
		});
		Meteor.call('fetchArtistId', function(err, res) {
			console.log("callback")
			if (err) {
				return err;
			} else {
				return res;
			}
		});
	}

  render() {
    return (
			<div id='map' style={{width: '400px', height: '300px'}}></div>
    );
  }
}

Map.propTypes = {

};