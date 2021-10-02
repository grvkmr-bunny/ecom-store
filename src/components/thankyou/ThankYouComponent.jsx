import React, { Component } from 'react';
import authenticator from '../../services/authenticator.service';

class ThankYouComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
    }


    componentDidMount(){
        // authenticator.getP(this.state.username, this.state.password).then(() => {
        //     this.setState({ redirectToReferrer: authenticator.isAuthenticated });
        // }).catch(eMsg => {
        //     this.setState({ message: eMsg });
        // });
    }

    render() {
        return (
            <div style={{marginTop: "100px"}}>
                <h4 className="alert alert-info">Payment Successful</h4>
            </div>
        );
    }
}

export default ThankYouComponent;