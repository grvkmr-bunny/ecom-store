import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import authenticator from '../../services/authenticator.service';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectToReferrer: false,
            message: "",
            loggedInUser: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({ [id]: value });
    }

    login(e) {
        e.preventDefault();

        authenticator.login(this.state.username, this.state.password).then((data) => {
            this.setState({ redirectToReferrer: authenticator.isAuthenticated, loggedInUser: data });
        }).catch(eMsg => {
            this.setState({ message: eMsg });
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            this.props.history.push(from);
            this.props.isLogedIn(this.state.loggedInUser);
        }

        return (
            <div style={{marginTop: '100px'}}>
                <h1 className="text-info">Login</h1>
                {this.state.message ? <h6 className="alert alert-danger">{this.state.message}</h6> : null}

                <Form onSubmit={this.login}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Button block type="submit">
                        Login
                    </Button>
                </Form>
                <br/>
                <div  className="text-center">Not a member? <Link to="/signup">Register</Link></div>
            </div>
        );
    }
}

export default LoginComponent;