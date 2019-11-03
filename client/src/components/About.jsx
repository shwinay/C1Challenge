import React, { Component } from "react"

class About extends Component {

    render() {
        return (
            <React.Fragment>
                <br /><br />
                <div class="container">
                    <p>
                        My name is Ashwin Kudva, and I'm a student at The University of Texas at Austin studying Computer Science
                        and Mathematics under the Turing Scholars Program. As a passionate programmer, I've dabbled in everything from 
                        machine learning to robotics to game development, and I like to create and build whenever I get the chance. I'm 
                        especially interested in Machine Learning and Data Science, as well as Full Stack Web Development. For relevant projects
                        I've done in these areas, feel free to check out my portfolio <a href="https://www.ashwinkudva.com/">here</a>. In my free time 
                        I do some light programming and reading, and enjoy playing basketball and camping.
                    </p>
                    <p>
                        This website was made for the Capital One Summit Challenge 2019-2020 - using a REST API that stores questions and answers from
                        over 18,000 Jeopardy trivia categories. Jeopardy Lookup filters Q/A results based on category name, question value, as well as
                        airdate of the question. Additionally, it features favoriting of a user's favorite questions and answers, based on browser-local
                        storage. It was made using a Node.js and Express backend (used for API requests and category caching for faster results),
                        as well as a React.js-based frontend coupled with Bootstrap. The project is hosted on <a href="https://www.heroku.com/">Heroku</a>, 
                        and was based on <a href="https://www.mindsumo.com/contests/jeopardy-api">this problem statement</a>.
                    </p>
                </div>
            </React.Fragment>
        )
    }

}

export default About;