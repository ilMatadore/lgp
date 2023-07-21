import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './errorBoundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasErrored: false
        };
    }
    
    static getDerivedStateFromError(error) {
        //process error
        return { hasErrored: true};
    }

    componentDidCatch(error, info) {
        console.log(info, error)
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText>Oopss... algo se rompio...</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        
        return this.props.children;
    }
}

export default ErrorBoundary;
