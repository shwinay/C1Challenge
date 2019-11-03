import React,  { Component } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

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
        cardState: "Question", //Question or Answer
        favorited: false
    }

    componentDidMount() {
        this.setState({
            favorited: this.props.favorited
        });
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
                        <p className="card-text">{this.getBody()}</p>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                            <button className="btn btn-primary" onClick={this.buttonClick}>{this.getButtonText()}</button>
                            </div>
                            <div className="col-2">
                            {this.getFavoriteStar()}
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        );
    }

    getTitle() { return this.state.cardState }

    //gets the text of the push button
    getButtonText() { return this.state.cardState == "Question" ? "See Answer" : "See Question"; }

    //gets the question or answer of the card
    getBody() { return this.state.cardState == "Question" ? this.props.question : this.props.answer};

    //changes the state of the card to either question or answer
    buttonClick = () => {
        let newState = this.state.cardState == "Question" ? "Answer" : "Question";
        this.setState({cardState : newState});
    }

    //gets either the clicked or unclicked favorite star
    getFavoriteStar() {
        if (this.state.favorited == false) { //set to unfavorited
            this.unfavoriteLocalStorage();
            return <button 
                    class="btn" 
                    style={{ boxShadow: "none", float: "right"}}
                    onClick={() => this.setState({favorited: true})}>
                        <FaRegStar />
                    </button>;
        }
        else { //set to favorited
            this.favoriteLocalStorage();
            return <button 
                    class="btn" 
                    style={{ boxShadow: "none", float: "right"}}
                    onClick={() => {this.setState({favorited: false})}}
                    >
                        <FaStar style={{color: "gold"}}/>
                    </button>;
        }
    }

    //removes the current card from local storage
    unfavoriteLocalStorage() {
        let favorites = localStorage.getItem("favorites");
        console.log(localStorage);
        let favoritesJSON = {
            questions: []
        };
        if (favorites != null) favoritesJSON = JSON.parse(favorites);
        console.log(favoritesJSON);
        let questionList = favoritesJSON.questions;
        for (let i = 0; i < questionList.length; i ++) {
            if (questionList[i].question == this.props.question) {
                questionList.splice(i, 1);
                break;
            }
        }
        favoritesJSON.questions = questionList;
        localStorage.setItem("favorites", JSON.stringify(favoritesJSON));
    }

    //puts the current card in local storage
    favoriteLocalStorage() {
        
        let favorites = localStorage.getItem("favorites");
        console.log(localStorage);
        let favoritesJSON = {
            questions: []
        };
        if (favorites != null) favoritesJSON = JSON.parse(favorites);
        console.log(favoritesJSON);
        let questionList = favoritesJSON.questions;
        questionList.push({
            category: this.props.category,
            difficulty: this.props.difficulty,
            airdate: this.props.airdate,
            answer: this.props.answer,
            question: this.props.question
        });
        favoritesJSON.questions = questionList;
        localStorage.setItem("favorites", JSON.stringify(favoritesJSON));
    }

    //converts date to MM/DD/YYYY string
    dateToString(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return month + '/' + day + '/' + year;
    }

}

export default ContentCard;