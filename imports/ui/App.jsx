import React, { Component } from 'react';

import Search from './Search.jsx';
import Map from './Map.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>SoundTrails</h1>
        </header>

          <Search  />

          <Map />

      </div>
    );
  }
}