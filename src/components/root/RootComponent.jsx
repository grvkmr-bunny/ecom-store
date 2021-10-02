/* eslint-disable */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ErrorHandler from '../errorhandler/ErrorHandler';
import NavigationComponent from '../navigation/NavigationComponent';

const RootComponent = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <ErrorHandler>
                    <NavigationComponent />
                </ErrorHandler>
            </BrowserRouter>
        </div>
    );
};

export default RootComponent;