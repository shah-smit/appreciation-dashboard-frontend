import logo from './logo.svg';
import './ListMessage.css';
import env from './aws-exports'
import React, { useState, useEffect } from 'react';

function ListMessage() {
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
    <div class="container">
        {
          messages.map(msg => (
            <div class="card">
                <h1>{msg.nickname}</h1>
                <p>{msg.message}</p>
                <p>Thank you,</p>
                <p>{msg.senderName}</p>
                <p><img src="" alt="alternative" /></p>
              </div>
          ))
        }
    </div>
  );
}

export default ListMessage;
