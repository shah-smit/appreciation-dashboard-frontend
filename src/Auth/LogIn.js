import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';

class LogIn extends Component {
    state = {
        username: '',
        password: '',
        errors: {
            cognito: null,
            blankfield: false
        }
    };

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password } = this.state;

        // AWS Cognito integration here
        try {
            await Auth.signIn(username, password);
            this.props.history.push('/new');
        } catch (error) {
            console.log("errr {}", error)
        }
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove('is-danger');
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h2 align="center">Log In</h2>
                <Form.Group className="mb-3" controlId="inlineFormInputGroup">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" id="username" value={this.state.username} onChange={this.onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" value={this.state.password} onChange={this.onInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default withRouter(LogIn);