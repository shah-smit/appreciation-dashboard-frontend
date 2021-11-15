import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class CustomNavbar extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth;

        return (
            <>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="">
                            Appreciation Dashboard
                        </Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/new">Add Message</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">
                                    {isAuthenticated && user && (
                                            <strong>Cognito ID: {user.username}</strong>
                                    )}
                                </Nav.Link>
                                {!isAuthenticated && (
                                    <Nav.Link eventKey={2} href="/signup">
                                        <strong>Register</strong>
                                    </Nav.Link>
                                )}
                                {!isAuthenticated && (
                                    <Nav.Link eventKey={2} href="/login">
                                        Log in
                                    </Nav.Link>
                                )}
                                {isAuthenticated && (
                                    <Nav.Link eventKey={2} href="/" onClick={(e) => { e.preventDefault(); this.props.handleLogOut(); }} if={isAuthenticated}>
                                        Log out
                                    </Nav.Link>
                                )}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
            </>
        );
    }
}
