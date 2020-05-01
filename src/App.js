import React, { Component } from 'react';
import Menu from './components/MenuComponent';
import Main from './components/MainComponent';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;