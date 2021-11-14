import React, { Component } from 'react';
import env from './aws-exports'
import { Auth, Storage } from 'aws-amplify';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';

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

        Storage.put(
            `photos/${this.state.image.name}`,
            this.state.image,
            { contentType: this.state.image.type, level: 'private' }
        ).then((res) => {
            this.upload = null;
            this.setState(() => ({
                response: 'Success uploading file!',
            }));
            console.log("res from storage", res)
            var result = {
                "to": this.state.to,
                "message": this.state.message,
                "from": this.state.from,
                "nickName": this.state.nickname,
                "senderName": this.state.senderName,
                "imageUrl": "https://" + env.s3.bucket + ".s3.ap-southeast-1.amazonaws.com/private/" + this.state.identity + "/" + res.key
            }
            console.log("req to lambda", result)
            fetch(env.write_lambda, {
                method: "POST",
                body: JSON.stringify(result)
            }).then(data => {
                // do what you need with the data from the post request
            });
        }).catch(err => {
            this.setState({ response: `Cannot uploading file: ${err}` });
        });



    })


    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove('is-danger');
    };

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files)
            let img = event.target.files[0];
            this.setState({
                image: img
            });
        }
    }

    componentDidMount = () => {
        Auth.currentUserInfo()
            .then(response => {
                console.log('test {}', JSON.stringify(response));
                if (response == null) {
                    this.props.history.push('/new');
                } else {
                    this.setState({
                        identity: response.id,
                        senderName: response.username,
                        from: response.attributes.email
                    });
                }
            }).catch((err) => {
                this.props.history.push('/login');
            });
    }

    render() {

        return (
            <div class="container">
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                                <Form.Label>Receiver</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="to"
                                    aria-describedby="usernameHelp"
                                    placeholder="Receiver Email"
                                    value={this.state.to}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="nickname"
                                    placeholder="Receiver Nick Name"
                                    value={this.state.nickname}
                                    onChange={this.onInputChange} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                onChange={this.onInputChange}
                                id="message" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                                <Form.Label>Sender Email</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="from"
                                    placeholder="Sender Email"
                                    value={this.state.from}
                                    disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                                <Form.Label>Sender Name</Form.Label>
                                <Form.Control className="input"
                                    type="text"
                                    id="senderName"
                                    placeholder=" Sender Name"
                                    value={this.state.senderName}
                                    disabled />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={this.onImageChange}
                            />
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

export default withRouter(AddMessage);
