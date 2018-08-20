import React, { Component } from 'react';
import DropdownContainer from 'containers/DropdownContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          {
            <DropdownContainer/>
          }
        </div>
      </div>
    );
  }
}

export default App;
