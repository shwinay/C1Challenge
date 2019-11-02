import React,  { Component } from 'react';

/*
    Card component that shows a question, answer, airdate, and category/difficulty.
    props taken:
        question
        answer
        category
        difficulty
        airdate
*/
class ContentCard extends Component {

    state = {
        cardState: "Question" //Question or Answer
    }

    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <center>
                        <h5 className="card-title">{this.getTitle()}</h5>
                    </center>
                        <h6 className="card-subtitle mb-2 text-muted"><b>Category: </b>{this.props.category}</h6>
                        <h6 className="card-subtitle mb-2 text-muted"><b>Difficulty: </b>{(this.props.difficulty != null ? this.props.difficulty : "Not Given")}</h6>
                        <h6 className="card-subtitle mb-2 text-muted"><b>Airdate: </b>{this.dateToString(this.props.airdate)}</h6>
                    <center>
                        <p clasNames="card-text">{this.getBody()}</p>
                        <button className="btn btn-primary" onClick={this.buttonClick}>{this.getButtonText()}</button>
                    </center>
                </div>
            </div>
        );
    }

    getTitle() { return this.state.cardState }
    getButtonText() { return this.state.cardState == "Question" ? "See Answer" : "See Question"; }
    getBody() { return this.state.cardState == "Question" ? this.props.question : this.props.answer};
    buttonClick = () => {
        let newState = this.state.cardState == "Question" ? "Answer" : "Question";
        this.setState({cardState : newState});
    }

    dateToString(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return month + '/' + day + '/' + year;
    }

}

export default ContentCard;