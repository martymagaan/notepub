import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import './index.css';

const server = 'http://projects.martymagaan.com:3002';
const socket = socketIOClient(server);
let initContent;

socket.on('load-content', (content) => {
  initContent = content;
});

function Splash() {
  return (
    <div id="splash-screen">
      <img
        id="logo"
        src="img/notepub.svg"
        alt="Notepub Logo"
      />
    </div>
  );
}

class Notepad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {content: initContent};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.element = document.getElementById('notepad-textarea');
    this.element.focus();
  }

  handleChange(event) {
    this.setState({content: event.target.value});
    socket.emit('change-content', event.target.value);
  }

  render() {
    return (
      <textarea
        id="notepad-textarea"
        value={this.state.content}
        onChange={this.handleChange}
        spellCheck="false"
        placeholder="Type something."
      />
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showingSplash: true};
    setTimeout(() => {
      this.setState({showingSplash: false});
    }, 1200);
  }

  render() {
    if (this.state.showingSplash)
      return <Splash />
    else
      return <Notepad />
  }  
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
