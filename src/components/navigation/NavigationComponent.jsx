import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SwitchComponent from '../../routes';
import authenticator from "../../services/authenticator.service";

// const jwt = require('jsonwebtoken');
const titleLogo = require('../../assets/pageTitleLogo.png').default;

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}))(Badge);


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: authenticator.getToken(),
            userData: {},
            anchorEl: null,
            isOpen: false,
            cartValue: 0
        }
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getCartValue = this.getCartValue.bind(this);
    }

    handleClose(){ 
        this.setState({isOpen: false});
    }

    getCartValue(){ 
        this.setState({cartValue: window.sessionStorage.getItem('cart_count')});
    }

    logout(e) {
        e.preventDefault();
        authenticator.logout();
        this.setState({token: authenticator.getToken(), isOpen: true, cartValue: window.sessionStorage.getItem('cart_count')});
    }

    login(userData){
        this.setState({token: authenticator.getToken(), userData: userData[0], cartValue: window.sessionStorage.getItem('cart_count')})
    }

    componentDidMount(){
        this.setState({userData: JSON.parse(window.sessionStorage.getItem('user_data')), cartValue: window.sessionStorage.getItem('cart_count')});
    }

    render(){

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top" style={{ backgroundColor: "#fff2ff" }}>
                    <NavLink className="navbar-brand" to="/">
                        <img alt="title logo" src={titleLogo} width="100px" height="50px"/>
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item px-3">
                                <NavLink exact className="nav-link" to="/">Online Games</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink className="nav-link" to="/fangears">Fan Gear</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item px-3">
                                <NavLink className="nav-link" to="/cart">
                                    {/* <i className="pi pi-shopping-cart layout-menuitem-icon" style={{ fontSize: '1.5rem' }}></i> */}
                                    <IconButton aria-label="cart" style={{padding: "0px"}}>
                                        <StyledBadge badgeContent={this.state.cartValue} color="secondary">
                                            <ShoppingCartIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </NavLink>
                            </li>
                            {
                                this.state.token ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/profile">{this.state.userData.username}</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/logout" onClick={this.logout}>Logout</NavLink>
                                        </li>
                                    </>
                                    : 
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li> 
                            }
                        </ul>
                    </div>
                </nav>
                <>
                    {<SwitchComponent isLoggedIn={this.login} userData={this.state.userData} getCartVal={this.getCartValue} />}
                </>
                <Snackbar open={this.state.isOpen} autoHideDuration={3000} onClose={this.handleClose}>
                    {
                        (!this.state.token) ? <Alert severity="success">{authenticator.msg}</Alert> : ''
                    }
                </Snackbar>
            </React.Fragment>
        );
    }
};

export default NavigationComponent;