import React, { Component } from 'react';
import CardDetailsComponent from '../common/CardDetailsComponent';

class FanGearDetails extends Component {    
    render() {
        console.log("====Inside FanGearDetails=====");
        return (
            <div style={{margin: '100px 0px'}}>
                <CardDetailsComponent name={'fangear'} {...this.props}/>
            </div>
        );
    }
}

export default FanGearDetails;
