import React, { Component } from "react";

/*
    Jumbotron component for the top of the screen
*/
class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#ecfcff"}}>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {this.getLinks()}
                    </div>
                </div>
            </nav>
        )
    }

    getLinks() {

        return (
            <React.Fragment>
            <a className="nav-item nav-link" onClick={() => {this.props.changePage("search")}}>Search</a>
            <a className="nav-item nav-link" onClick={() => {this.props.changePage("favorites")}}>Favorites</a>
            <a className="nav-item nav-link" onClick={() => {this.props.changePage("about")}}>About</a>
            </React.Fragment>
        )
    }

}

export default Navbar;