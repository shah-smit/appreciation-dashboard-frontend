import React, { Component, Fragment } from 'react';
import env from './aws-exports'
import { Form, Button } from 'react-bootstrap';

class AddMessage extends Component {

    state = {
        to: "",
        message: '',
        from: '',
        nickname: '',
        senderName: '',
        errors: {
            cognito: null,
            blankfield: false
        },
        messages: []
    };

    setMessages = (m) => {
        this.setState(() => ({
            messages: m,
        }));
    }

    handleSubmit = ((e) => {
        e.preventDefault();
        console.log(e)
        console.log(this.state)
        var result = {
            "to": this.state.to,
            "message": this.state.message,
            "from": this.state.from,
            "nickName": this.state.nickname,
            "senderName": this.state.senderName
        }
        fetch(env.write_lambda, {
            method: "POST",
            body: JSON.stringify(result)
        })
            .then(data => {
                // do what you need with the data from the post request
            });
    })


    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove('is-danger');
    };



    render() {

        return (
                <div class="container">
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Receiver</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="to"
                                    aria-describedby="usernameHelp"
                                    placeholder="Receiver Email"
                                    value={this.state.to}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    onChange={this.onInputChange}
                                    id="message" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sender Email</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="from"
                                    placeholder="Sender Email"
                                    value={this.state.from}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="nickname"
                                    placeholder="Receiver Nick Name"
                                    value={this.state.nickname}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Sender Name</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="senderName"
                                    placeholder=" Sender Name"
                                    value={this.state.senderName}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Message
                            </Button>
                        </Form>
                    </div>
                </div>
        );
    }
}

export default AddMessage;
