import React, { Component } from 'react';
import CardDetailsComponent from '../common/CardDetailsComponent';

class GameDetails extends Component {
    render() {
        console.log("====Inside GameDetails=====");
        return (      
            <div style={{margin: '100px 0px'}}>
                <CardDetailsComponent name={'games'} {...this.props}/>
            </div>      
        );
    }
}

export default GameDetails;