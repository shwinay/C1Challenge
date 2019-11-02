let fetch = require('node-fetch');

let categoryCache = [];

//function that caches categories on initial server startup
exports.cacheCategories = async function() {
    console.log("started caching categories..");
    let offset = 0;
    while (true) {
        let url = "http://jservice.io/api/categories?count=100&offset=" + offset;
        let response = await fetch(url);
        let data = await response.json();
        if (data.length == 0 || data == null) {
            console.log("done caching categories!");
            console.log(categoryCache);
            return;
        }
        for (let i = 0; i < data.length; i ++) {
            let entryObj = data[i];
            let entryCategory = entryObj.title == null ? "" : entryObj.title.toLowerCase();
            let entryId = entryObj.id;
            if (entryCategory.length > 0) {
                categoryCache.push({
                    category: entryCategory,
                    categoryId: entryId
                })
            }
        }
        console.log("caching " + offset + "...");
        offset += data.length;
    }
}

exports.getCategories = () => {return categoryCache;}