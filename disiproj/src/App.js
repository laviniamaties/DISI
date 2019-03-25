import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import MyMenu from './MyMenu'


class App extends Component {
  render() {
    return (
      <div className="App">
          
        {/* <Button variant="contained" color="primary">
          HELLO DISI!
        </Button> */}

        <MyMenu />

      </div>
    );
  }
}

export default App;
