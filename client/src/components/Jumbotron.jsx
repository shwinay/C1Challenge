import React, { Component } from 'react';

/*
    Jumbotron component for the top of the screen
*/
class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid" style={{background : "#ecfcff"}}>
                <div className="container">
                    <h1 className="display-4">{this.props.title}</h1>
                    <p className="lead">{this.props.subtitle}</p>
                </div>
            </div>
        )
    }
}

export default Jumbotron;