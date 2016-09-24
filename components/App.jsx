import React, { Component } from 'react';

import Map from './Map.jsx';
import Globe from './Globe.jsx';

'use strict';

// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    setTimeout(function() {
      document.getElementsByClassName('former')[0].classList.remove('opener');
      setTimeout(function() {document.getElementsByClassName('former')[0].classList.add('animation');},600);
    }, 3000);

  }



  render() {

    return (
      <div className="app-container">
        <Globe />
        <Map createMarkers={this.createMarkers} />
      </div>
    );
  }
}
