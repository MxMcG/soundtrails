import React, { Component, PropTypes } from 'react';

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getArtistId = this.getArtistId.bind(this);
		this.getArtistCalendar = this.getArtistCalendar.bind(this);
	}

	getArtistId(artist, callback) {
		Meteor.call('fetchArtistId', artist, function (err, res) {
				if (err) {
					return err;
				} else {
					return res;
				}
		});
	}

	getArtistCalendar(id, callback) {
		return Meteor.call('fetchArtistCalendar', id, function (err, res) {
			if (err) {
				return err;
			} else {
				console.log(res)
				return res;
			}
		});
	}

	handleSubmit(e) {
		var artist = this.state.artist;
		e.preventDefault();
		this.getArtistId(artist, function (id) {
			console.log(id)
			this.getArtistCalendar(id, function (array) {
				console.log(array);
			});	
		});
		
	}	

	handleChange(e) {
		this.setState({ artist: e.target.value })
		console.log('hi')
	}

  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
	        <input type='text' placeholder='enter artist' onChange={this.handleChange}/>
	        <input type='submit' defaultValue='enter' />
	      </form>  
      </div>
    );
  }
}

Search.propTypes = {

};