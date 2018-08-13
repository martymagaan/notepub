import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import './index.css';

const server = 'http://projects.martymagaan.com:3002';
const socket = socketIOClient(server);

class Notepad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {content: ''};

    this.handleChange = this.handleChange.bind(this);

    socket.on('load-content', (content) => {
      this.setState({content: content});
    });
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
      />
    );
  }
}

ReactDOM.render(
  <Notepad />,
  document.getElementById('root')
);
