import React, { Component } from 'react';
import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";

import authenticator from "./services/authenticator.service.js";

// Eager Loading
import GameComponent from './components/game/GameComponent';
import LoaderAnimation from '../src/components/common/LoaderAnimation';


// Lazy Loading
const FanGearComponent = lazy(() => import('./components/fangear/FanGearComponent'));
const LoginComponent = lazy(() => import('./components/login/LoginComponent'));
const SignUpComponent = lazy(() => import('./components/login/SignUpComponent.jsx'));
const FanGearDetails = lazy(() => import('./components/fangear/FanGearDetails'));
const GameDetails = lazy(() => import('./components/game/GameDetails'));
const CartComponent = lazy(() => import('./components/cart/CartComponent'));
const ProfileComponent = lazy(() => import('./components/profile/ProfileComponent'));
const ThankYouComponent = lazy(() => import('./components/thankyou/ThankYouComponent'));

const img404 = require('./assets/404.png').default;

const SecuredRoute = ({ component: Component, ...args }) => {
    return (
        <Route {...args} render={
            (props) => authenticator.getToken() ? <Component userData={args.userData} getCartVal={args.getCartVal} {...props} /> :
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        } />
    );
}

class SwitchComponent extends Component {
    constructor(props) {
        super(props);
        this.isLogedIn = this.isLogedIn.bind(this);
        this.getCartVal = this.getCartVal.bind(this);
    }

    isLogedIn(usrData){
        this.props.isLoggedIn(usrData);
    }

    getCartVal(){
        this.props.getCartVal();
    }

    
    render() {
        return (
            <Suspense fallback={<LoaderAnimation />}>
                <Switch>
                    <Route exact path="/" component={GameComponent} />
                    <Route exact path="/fangears" component={FanGearComponent} />
                    <SecuredRoute exact path="/cart" component={CartComponent} userData={this.props.userData} getCartVal={this.getCartVal}/>
                    <Route exact path="/signup" component={SignUpComponent} />
                    <Route exact path="/login" render={
                        (props) => <LoginComponent isLogedIn={this.isLogedIn} {...props} /> 
                    } />
                    <SecuredRoute path="/profile" component={ProfileComponent} userData={this.props.userData}/>
                    <Route exact path="/thankyou" component={ThankYouComponent} />
                    <Route exact path="/:id" render={
                        (props) => <GameDetails getCartVal={this.getCartVal} {...props} />
                    } />
                    <Route exact path="/fangears/:id" render={
                        (props) => <FanGearDetails getCartVal={this.getCartVal} {...props} />
                    } />
                    <Route path="**" render={
                        () => (
                            <div style={{marginTop: '100px'}}>
                                <article>
                                    <h1 className="text-danger">No Route Configured!</h1>
                                    <h4 className="text-danger">Please check your Route Configuration</h4>
                                </article>
                                <img src={img404} alt="404" />
                            </div>
                        )
                    } />
                </Switch>
            </Suspense>
        );
    }
}

export default SwitchComponent;