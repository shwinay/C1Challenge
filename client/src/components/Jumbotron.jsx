import React, { Component } from 'react';

/*
    Jumbotron component for the top of the screen
*/
class Jumbotron extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid" style={{background : "#ecfcff"}}>
                <div className="container">
                    <h1 className="display-4">Jeopardy Lookup</h1>
                    <p className="lead">What is "a website to search questions and answers from your favorite trivia show?"</p>
                </div>
            </div>
        )
    }
}

export default Jumbotron;