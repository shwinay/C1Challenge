import React, { Component } from "react"
import ContentCard from "./ContentCard";

/*
    localStorage structure:

    favorites : {
        questions : [
            {
                question: 
                answer: 
                category: 
                airdate: 
                difficulty:
            },
            {
                ...
            },
            ...
        ]
    }

*/

//favorites class
class Favorites extends Component {

    state = {
        cardsList: []
    }

    componentDidMount() {
        this.getCards();
        setInterval(() => {this.getCards()}, 100);
    }

    render() {
        return (
            <React.Fragment>
                {this.getGrid()}
            </React.Fragment>
        );
    }

    getCards() {
        this.setState({cardsList: []});
        let favorites = localStorage.getItem("favorites");
        if (favorites == null) return; //no favorites in local storage
        let favoritesJSON = JSON.parse(favorites);
        if (!favoritesJSON.hasOwnProperty("questions")) return;
        let questionList = favoritesJSON.questions;
        for (let i = 0; i < questionList.length; i ++) {
            let currElement = questionList[i];
            this.state.cardsList.push(
                <ContentCard
                question={currElement.question}
                answer={currElement.answer}
                category={currElement.category}
                airdate={new Date(currElement.airdate)}
                difficulty={currElement.difficulty}
                favorited={true}
                />
            );
        }
        this.setState({});
    }

    getGrid() {
        let numCols = 3;
        let rowList = [];
        let currRow = [];
        for (let i = 0; i < this.state.cardsList.length; i ++) {
            if (currRow.length == numCols) {
                rowList.push(
                    <div className="row m-4">
                        {currRow}
                    </div>
                );
                currRow = [];
            }
            currRow.push(
                <div className="col m-2">
                    {this.state.cardsList[i]}
                </div>
            );
        }
        if (currRow.length != 0) rowList.push(
            <div className="row m-4">
                {currRow}
            </div>
        );

        return (
            <div className="container">
                <center>
                    {rowList}
                </center>
            </div>
        );
    }

}

export default Favorites;