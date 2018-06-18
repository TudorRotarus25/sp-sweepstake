import React, { Component } from 'react';
import './App.css';
import GroupsStatus from './components/GroupsStatus/GroupsStatus';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://images1.sportpursuit.info/media/site-elements/logos/logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Sweepstake status</h1>
        </header>
        <div>
          <GroupsStatus/>
        </div>
      </div>
    );
  }
}

export default App;
