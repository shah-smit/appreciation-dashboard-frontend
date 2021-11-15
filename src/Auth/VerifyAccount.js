import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';

class VerifyAccount extends Component {
    state = {
        username: '',
        verificationcode: '',
        errors: {
            cognito: null,
            blankfield: false
        }
    };

    componentDidMount() {
        const locationState = this.props.location.state;

        if (locationState && locationState.username) {
            this.setState({ username: locationState.username });
        }
    }

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

        // AWS Cognito integration here
        try {
            await Auth.confirmSignUp(this.state.username, this.state.verificationcode);
            this.props.history.push('/login');
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        id="username"
                        aria-describedby="usernameHelp"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        type="text"
                        id="verificationcode"
                        aria-describedby="verificationcodeHelp"
                        placeholder="Enter Verification Code"
                        value={this.state.verificationcode}
                        onChange={this.onInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Verify account
                </Button>
            </Form>
        );
    }
}

export default withRouter(VerifyAccount);