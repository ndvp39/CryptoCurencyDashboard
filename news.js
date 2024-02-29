// Array of news items
const newsArray = [
    {
        title: "Cryptocasinos are evolving worryingly fast - how to get to grips with them",
        link: "https://theconversation.com/cryptocasinos-are-evolving-worryingly-fast-heres-how-to-get-to-grips-with-them-205039"
    },
    {
        title: "Are NFTs really dead and buried? All signs point to yes",
        link: "https://theconversation.com/are-nfts-really-dead-and-buried-all-signs-point-to-yes-214145"
    },
    {
        title: "Bitcoin has shot up 50% since the new year, why new lows are probably still ahead?",
        link: "https://theconversation.com/bitcoin-has-shot-up-50-since-the-new-year-but-heres-why-new-lows-are-probably-still-ahead-198682"
    }
];


const renderNews = (text, link) => {

    const News_div = createElement("div", "");

    const title_News = createElement("h3", text);
    title_News.classList = "text-xl font-semibold";

    const link_News = createElement("a", "Read More", [{name: "href", value: link}]);
    link_News.classList = "text-blue-500 font-bold";

    News_div.appendChild(title_News);
    News_div.appendChild(link_News);

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

renderNewsPage();