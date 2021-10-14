import logo from './logo.svg';
import './App.css';
import env from './aws-exports'
import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  async function readMessages() {
    var requestOptions = {
      method: 'GET'
    };

    fetch(env.read_lambda, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result[0])
        console.log(JSON.stringify(result))
        result.map(msg => console.log(Object.hasOwn(msg, 'messsage')))
        setMessages(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    readMessages();
  }, []);

  return (
    <div className="App">
      <div class="container">
        {
          messages.map(msg => (
            <div class="card">
              <h1>{msg.messsage}</h1>
              <p ></p>
              <p><img src="" alt="alternative" /></p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
