var express = require('express');
var fetch = require('node-fetch');
var categoryCache = require('./categorycache');
var router = express.Router();

// The general outline - we want to have a server with the categories
// already cached. From there, we want to have an endpoint that takes in
// a category, a difficulty, a startDate, and an endDate and looks through
// cached categories for a category match. For each category match, we make an api
// request to get the category questions, and then return that json.

/*
response returned: 
{
    questions: [
        {
            question: question,
            answer: answer,
            category: category,
            difficulty: value,
            airdate: airDate
        },
        ...
    ]
}
*/

//routing request
router.get('/:category/:difficulty/:startDate/:endDate', function(req, res, next) {
    let category = req.params.category;
    let difficulty = req.params.difficulty;
    let startDate = new Date(req.params.startDate);
    let endDate = new Date(req.params.endDate);

    getAllQuestions(category, difficulty, startDate, endDate, res);
});


//HELPER FUNCTIONS

//function that gets all questions for a given category, difficulty, startdate, and enddate
function getAllQuestions(category, difficulty, startDate, endDate, res) {
    category = category.toLowerCase();
    let questions = [];
    let promises = [];

    let categories = categoryCache.getCategories();
    for (let i = 0; i < categories.length; i ++) {
        let currCategory = categories[i].category.toLowerCase();
        if (currCategory.includes(category)) {
            promises.push(getQuestionsById(categories[i].categoryId, currCategory, difficulty, startDate, endDate));
        }
    }
    Promise.all(promises)
    .then(function(values) {
        for (let i = 0; i < values.length; i ++) {
            let questionArr = values[i];
            for (let j = 0; j < questionArr.length; j ++) {
                questions.push(questionArr[j]);
            }
        }
        res.json({
            questions: questions,
            categories: categories.length
        });
    });
}

//function that gets all questions for a given category id, difficulty, startdate, and enddate 
//called by getAllQuestions for relevant categories
async function getQuestionsById(id, category, difficulty, startDate, endDate) {

    return new Promise(resolve => {
        let questions = [];
        let url = "http://jservice.io/api/category?id=" + id;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let clues = data.clues;
            for (let i = 0; i < clues.length; i ++) {
                let answer = clues[i].answer;
                let question = clues[i].question;
                let value = clues[i].value;
                let airDate = new Date(clues[i].airdate);
                startDate.setHours(0, 0, 0);
                endDate.setHours(0, 0, 0);
                airDate.setHours(0, 0, 0);
                if (!(startDate <= airDate && airDate <= endDate)) continue;
                if (difficulty != value && difficulty != "all") continue;
                if (question.length == 0 || answer.length == 0) continue;
                questions.push({
                    question: question,
                    answer: answer,
                    category: category,
                    difficulty: value,
                    airdate: airDate
                });
            }
            resolve(questions);
        });
    });
}

module.exports = router;