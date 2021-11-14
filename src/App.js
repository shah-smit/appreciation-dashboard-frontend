import env from './aws-exports'
import React, { useState, useEffect, Component } from 'react';
import ListMessage from './ListMessage';
import AddMessage from './AddMessage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LogIn from './Auth/LogIn';
import Register from './Auth/Register';
import VerifyAccount from './Auth/VerifyAccount';
import Navbar from './CustomNavbar';
import { Auth } from 'aws-amplify';
import './App.css'

export default class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    isVerified: false,
    user: null
  }

  handleLogOut = async () => {
    try {
      await Auth.signOut();
      this.setState({
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        isVerified: false
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  handleLogIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      this.setState({
        user: user,
        isAuthenticated: true,
      });
    } catch (error) {
      if (error.code && error.code === 'UserNotConfirmedException') {
        window.location.href = '/verify';
      }
      console.log(error.message);
    }
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setState({
        isAuthenticated: true
      });
      console.log(session);

      const user = await Auth.currentAuthenticatedUser();
      this.setState({
        user
      });

      if (user.attributes.email_verified) {
        this.setState({
          isVerified: true
        });
      }
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
    };
    return (
      <Router>
        <div className="App">
          <Navbar auth={authProps} handleLogOut={this.handleLogOut} />
          <Switch>
            <Route path="/" exact="true">
              <ListMessage />
            </Route>
            <Route path="/new">
              <AddMessage />
            </Route>
            <Route path="/login">
              <LogIn></LogIn>
            </Route>
            <Route path="/signup">
              <Register></Register>
            </Route>
            <Route path="/verify">
              <VerifyAccount></VerifyAccount>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
