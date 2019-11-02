// async cacheCategories() {
//     let offset = 0;
//     while (true) {
//         let corsurl = "";
//         let url = corsurl + "http://jservice.io/api/categories?count=100&offset=" + offset;
//         let response = await fetch(url);
//         let data = await response.json();
//         if (data.length == 0 || data == null) {
//             this.setState({doneCaching : true});
//             return;
//         }
//         for (let i = 0; i < data.length; i ++) {
//             let entryObj = data[i];
//             let entryCategory = entryObj.title == null ? "" : entryObj.title.toLowerCase();
//             let entryId = entryObj.id;
//             this.state.allCategories.push({
//                 category: entryCategory,
//                 categoryId: entryId
//             });
//         }
//         this.setState({});
//         offset += data.length;
//     }
// }
// async getIDsByCategory() {
//     let category = this.props.category;
//     if (category == null || category.length == 0) return;
//     let offset = 0;
//     while (true) {
//         let url = "http://jservice.io/api/categories?count=100&offset=" + offset;
//         let response = await fetch(this.state.corsurl + url);
//         let data = await response.json();
//         if (data.length == 0 || data == null) return;
//         for (let i = 0; i < data.length; i ++) {
//             let entryObj = data[i];
//             let entryCategory = entryObj.title == null ? "" : entryObj.title.toLowerCase();
//             let entryId = entryObj.id;
//             if (entryCategory.includes(category.toLowerCase())) {
//                 this.getQuestionsById(entryId, entryCategory);
//             }
//         }
//         offset += data.length;
//     }
// }

// async getIDsByCategoryCached() {
//     for (let i = 0; i < this.props.allCategories.length; i ++) {
//         let categoryObj = this.props.allCategories[i];
//         let entryCategory = categoryObj.category;
//         let entryCategoryId = categoryObj.categoryId == null ? "" : categoryObj.categoryId;
//         if (entryCategory.includes(this.props.category.toLowerCase())) {
//             this.getQuestionsById(entryCategoryId, entryCategory);
//         }
//     }
// }

// async getQuestionsById(id, category) {
//     let url = "http://jservice.io/api/category?id=" + id;
//     fetch(this.state.corsurl + url)
//     .then(response => response.json())
//     .then(data => {
//         let clues = data.clues;
//         for (let i = 0; i < clues.length; i ++) {
//             let answer = clues[i].answer;
//             let question = clues[i].question;
//             let value = clues[i].value;
//             let airDate = new Date(clues[i].airdate);
//             console.log("startDate: " + this.props.startDate + ", endDate: " + this.props.endDate + ", airDate: " + airDate);
//             if ((this.props.difficulty == "all" || value == this.props.difficulty) && question != null && answer != null && question.length > 0 && answer.length > 0) {
//                 let startDate = this.props.startDate;
//                 let endDate = this.props.endDate;
//                 startDate.setHours(0, 0, 0);
//                 endDate.setHours(0, 0, 0);
//                 if (startDate <= airDate && airDate <= endDate) {
//                     this.state.cardData.push(<ContentCard question={question} answer={answer} category={category} difficulty={value}  airdate={airDate}/>);
//                 }
//             }
//         }
//         this.setState({});
//     });
// }