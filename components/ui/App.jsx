import React, { Component } from 'react';

import Map from './Map.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    var videoStyle = {
    width: '100%',
    height: '99%',
  }

  

    return (
      <div className="container">
        <header>
          <h1 className="title">SoundTrails</h1>
          <div className="video">
            <video autoPlay="true" loop style ={videoStyle}>
              <source src="/img/better_earth.mp4" type="video/mp4"/>
            </video>
          </div>
        </header>

          <Map createMarkers={this.createMarkers} />

      </div>
    );
  }
}