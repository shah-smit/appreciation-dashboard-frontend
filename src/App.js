import logo from './logo.svg';
import env from './aws-exports'
import React, { useState, useEffect } from 'react';
import ListMessage from './ListMessage';
import AddMessage from './AddMessage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact="true">
            <ListMessage />
          </Route>
          <Route path="/new">
            <AddMessage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
