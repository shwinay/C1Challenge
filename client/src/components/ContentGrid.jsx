import React, { Component } from 'react';
import ContentCard from './ContentCard';

/*
    Component that displays ContentCards in a grid and makes queries to retrieve these cards.
    Props taken -
        category
        difficulty
        startdate
        enddate
*/
class ContentGrid extends Component {

    state = {
        cardList : [], //list of ContentCards for a given query
        //cardData : [], //list of card metadata for a given query
        gridCount : 9, //number of cards to display per page
        gridOffset : 0, //the page
        loading : false //displays loading text if loading
    }

    render() {
        return (
            <React.Fragment>
                <center>
                    <button className="btn btn-secondary m-4" onClick={event => this.handleSearchSubmit(event)}>Search</button>
                    {this.getPrevAndNext()}
                    {this.getGrid()}
                </center>
            </React.Fragment>
        )
    }

    //handles search onSubmit
    handleSearchSubmit(event) {
        event.preventDefault();
        this.setState({
            cardList: [],
            gridOffset: 0
        });
        this.requestCards();
    }

    //makes an API request to the server for cards,
    //and pushes them to this.state.cardList
    requestCards() {
        let url = "/jservice/" + this.props.category + "/" + this.props.difficulty + "/" + this.dateToString(this.props.startDate) + "/" + this.dateToString(this.props.endDate);
        this.setState({loading: true});
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let questionList = data.questions;
            for (let i = 0; i < questionList.length; i ++) {
                let currQuestion = questionList[i];
                this.state.cardList.push(
                    <ContentCard
                        question={currQuestion.question}
                        answer={currQuestion.answer}
                        category={currQuestion.category}
                        difficulty={currQuestion.difficulty}
                        airdate={new Date(currQuestion.airdate)}
                        favorited={false}
                    />
                );
            }
            this.state.loading = false;
            this.setState({});
        });
    }

    //gets the prev, page tiles, and next tiles
    getPrevAndNext() {

        if (this.state.cardList.length == 0) return;
        let numPages = Math.floor(this.state.cardList.length / this.state.gridCount);
        if (this.state.cardList.length % this.state.gridCount != 0) numPages ++;

        let pageButtonList = [];
        for (let i = 0; i < numPages; i ++) {
            if (i > 10) {
                pageButtonList.push(
                    <li class="page-item"><button class="page-link">...</button></li>
                );
                break;
            }

            //push active tile if offset == i
            if (Math.floor(this.state.gridOffset / this.state.gridCount) == i) {
                pageButtonList.push(
                    <li class="page-item active"><button class="page-link" onClick={event => this.handlePagination(i)}>{i + 1}</button></li>
                ); 
            }
            //push non-active tile
            else {
                pageButtonList.push(
                    <li class="page-item"><button class="page-link" onClick={event => this.handlePagination(i)}>{i + 1}</button></li>
                );
            }
        }

        return (
            <React.Fragment>
                <div className="text-xs-center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item">
                                <button class="page-link" aria-label="Previous" onClick={event => this.handlePrev()}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </button>
                            </li>
                            {pageButtonList}
                            <li class="page-item">
                                <button class="page-link" href="#" aria-label="Next" onClick={event => this.handleNext()}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        );
    }

    //handles onClick for previous arrow
    handlePrev() {
        let newOffset = Math.max(0, this.state.gridOffset - this.state.gridCount);
        this.setState({
            gridOffset: newOffset
        });
    }

    //handles onClick for next arrow
    handleNext() {
        let newOffset = Math.min(this.state.cardList.length - this.state.gridCount, this.state.gridOffset + this.state.gridCount);
        this.setState({
            gridOffset: newOffset
        });
    }

    //handles onClick for a page tile
    handlePagination(index) {
        this.setState({
            gridOffset : index * this.state.gridCount
        });
    }

    //gets the grid of cards for a current pagination offset, list of filters
    getGrid() {
        if (this.state.loading) return <h1 className="display-4">Loading...</h1>;

        let numCols = 3;
        let rowList = [];
        let currRow = [];
        for (let i = this.state.gridOffset; i < Math.min(this.state.gridOffset + this.state.gridCount, this.state.cardList.length); i ++) {
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
                    {this.state.cardList[i]}
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

    dateToString(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
      
        return month + '-' + day + '-' + year;
    }

}

export default ContentGrid;