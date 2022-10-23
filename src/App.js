import './App.css';
import Login from './Components/Login';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'

export class App extends Component {

  state = {
    name: '',
    showChat: false
  }

  handleAddUsername = (username) => {
    this.setState({
      showChat: true,
      name: username,
    })
  }

  render() {
    const { showChat, name } = this.state
    return (
      <div className='App'>
        {!showChat
          ?
          <Login handleAddUsername={this.handleAddUsername} name={name} />
          :
          <Chat name={name} />
        }
      </div>
    )
  }
}

export default App
