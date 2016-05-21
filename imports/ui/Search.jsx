import React, { Component, PropTypes } from 'react';

export default class Search extends Component {

  render() {
    return (
      <div>
        <input type='text' placeholder='enter artist'/>
        <button>Enter</button>
      </div>
    );
  }
}

Search.propTypes = {

};