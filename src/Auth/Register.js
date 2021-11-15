import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // AWS Cognito integration here
    const { username, email, password } = this.state;

    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      console.log(signUpResponse);
      console.log(username)
      this.props.history.push('/verify', { username });
    } catch (error) {
      let err = null;
      !error.message ? err = { 'message': error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove('is-danger');
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2 align="center">Register</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text"
            id="username"
            aria-describedby="userNameHelp"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.onInputChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text"
            type="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onInputChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" value={this.state.password} onChange={this.onInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="confirmpassword" onChange={this.onInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}



export default withRouter(Register);