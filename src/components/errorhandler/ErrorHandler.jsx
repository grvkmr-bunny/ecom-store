import React, { Component } from 'react';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    render() {
        if (this.state.hasError) {
            // var img500 = require('../../assets/http-500.jpg').default;
            return (
                <div>
                    <h2 className="text-danger">Something went wrong, please contact admin!</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                    {/* <img src={img500} alt="Internal Server Error"/> */}
                </div>
            );
        } else {
            return this.props.children || <h2 className="text-warning">No Component to Render</h2>;
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, error: error, errorInfo: info });
    }

}

export default ErrorHandler;