import React, { Component } from 'react';

import Search from './Search.jsx';


// App component - represents the whole app
export default class Globe extends Component {





  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="container" ref="video">
        <header>
          <h1 className="title">Tourlookup</h1>
          <div className="background">
            <div className="video displayNone" id="video">
            </div>
          </div>
        </header>
      </div>
    );
  }
}

