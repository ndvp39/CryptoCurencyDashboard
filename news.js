// Array of news items
let newsArray = [];

// Fetch cryptoInfo from the server
fetch('http://localhost:3000/News')
.then(response => response.json())
.then(data => {
    
    // Assuming 'data' is your array of news categories
    data.forEach(category => {

        Object.keys(category).forEach(categoryName => {
            if(categoryName != "_id"){
                newsArray.push({
                    title: categoryName,
                    link: null
                })
            }
            if (Array.isArray(category[categoryName])) {
            category[categoryName].forEach(newsItem => {
                newsArray.push({
                    title: newsItem.title,
                    link: newsItem.link
                })
            })
        }
        })

    });

    renderNewsPage();

})
.catch(error => console.error('Error fetching data:', error));






const renderNews = (text, link) => {

    const News_div = createElement("div", "");
    let link_News;

    const title_News = createElement("h3", "\n" + text);
    title_News.classList = "text-xl font-semibold";

    if(link == null){
        title_News.classList= "text-xl font-bold text-blue-500";
    }
    else{
        link_News = createElement("a", "Read More", [{name: "href", value: link}]);
        link_News.classList = "text-blue-500 font-bold";
    }

    News_div.appendChild(title_News);
    if(link != null){
        News_div.appendChild(link_News);
    }

    return News_div;
}



const renderNewsPage = () => {
    const NewsPage = document.querySelector("#tab-News");
    NewsPage.classList = "tab-content hidden text-center";
  
    const title_News = createElement("h2", "Get the Latest Crypto News Here");
    title_News.classList = "text-2xl font-bold mb-4";

    const text_News = createElement("p", "Stay informed with our latest updates and crypto articles.");
    text_News.classList = "mb-8";

    NewsPage.appendChild(title_News);
    NewsPage.appendChild(text_News);
    
    const NewsList = createElement("div", "", [{name: "id", value: "news-list"}]);

    // Loop through the array and append each news item
    newsArray.forEach(newsItem => {
        NewsList.appendChild(renderNews(newsItem.title, newsItem.link));
    });
    NewsPage.appendChild(NewsList);

}