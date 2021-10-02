import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import authenticator from '../../services/authenticator.service';

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            mobile: "",
            username: "",
            password: "",
            locality: "",
            city: "",
            pin: "",
            state: "",
            redirectToReferrer: false,
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({ [id]: value });
    }

    register(e) {
        e.preventDefault();
        const usrData = {
            id: '',
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            username: this.state.username,
            password: this.state.password,
            locality: this.state.locality,
            city: this.state.city,
            pin: this.state.pin,
            state: this.state.state,
            cartItem: {games: [], fangear: []}
        }
        authenticator.register(usrData).then((mmmmsssgggg) => {
            this.setState({ message:  authenticator.msg});
        }).catch(eMsg => {
            this.setState({ message: eMsg });
        });
    }

    greeting(props) {
        const isRegister = props.registered;
        if (isRegister) {
            setTimeout(()=>{
                this.setState({ 
                    name: "",
                    email: "",
                    mobile: "",
                    username: "",
                    password: "",
                    locality: "",
                    city: "",
                    pin: "",
                    state: "",
                    redirectToReferrer: false,
                    message: ""
                });
            }, 2000)
            return <h6 className="alert alert-success">{this.state.message}</h6>
        }
        return null;
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from.pathname} />
        }

        return (
            <div style={{marginTop: '100px'}}>
                <h1 className="text-info">New User Form</h1>
                {
                    (this.state.message) ?
                        this.greeting({registered: true, msg: this.state.message})
                    : null
                }

                <Form onSubmit={this.register}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.mobile} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="locality">
                        <Form.Label>Locality</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.locality} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.city} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="pin">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.pin} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control autoFocus type="text" value={this.state.state} onChange={this.handleChange} />
                    </Form.Group>
                    <Button block type="submit">
                        Register
                    </Button>
                </Form>
                <br/>
                <div  className="text-center">Already registered? <Link to="/login">Login</Link></div>
            </div>
        );
    }
}

export default SignUpComponent;