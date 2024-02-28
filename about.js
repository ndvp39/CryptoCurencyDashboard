const render_paragraph = () => {
    const paragraph = createElement("p", "Welcome to B1, your trusted source for comprehensive cryptocurrency insights. At B1, we are committed to providing you with a cutting-edge Cryptocurrency Dashboard that empowers you with real-time and historical data of various cryptocurrencies.\nOur mission is to simplify the complexities of the cryptocurrency market and offer you a user-friendly platform.");

    const tabPage = document.querySelector("#tab-About");

    tabPage.appendChild(paragraph);
}

const render_key_features = () => {
    const keyFeatures_title = createElement("h2", "Key Features:");

    const keyFeatures_ = createElement("ul", "");
    const keyFeatures_text1 = createElement("li", "Real-time Price Tracking: Stay updated with live cryptocurrency prices across the market.");
    const keyFeatures_text2 = createElement("li", "Daily Changes: Monitor daily fluctuations and trends in the cryptocurrency market.");
    const keyFeatures_text3 = createElement("li", "Interactive Charts: Explore detailed and interactive charts for in-depth analysis.");
    const keyFeatures_text4 = createElement("li", "Cryptocurrency Profiles: Dive into comprehensive profiles for a closer look at each digital asset.");
 
    const tabPage = document.querySelector("#tab-About");

    keyFeatures_.appendChild(keyFeatures_text1);
    keyFeatures_.appendChild(keyFeatures_text2);
    keyFeatures_.appendChild(keyFeatures_text3);
    keyFeatures_.appendChild(keyFeatures_text4);
    tabPage.appendChild(keyFeatures_title);
    tabPage.appendChild(keyFeatures_);

}

const render_ourteam = () => {

    const paragraph = createElement("p", "Experience the power of information with B1's Cryptocurrency Dashboard.\nJoin us on the journey of navigating the dynamic world of cryptocurrencies with confidence and ease.");
    
    const ourTeam_title = createElement("h2", "Our Team:");

    const ourTeam_ = createElement("ul", "");
    const ourTeam_names = createElement("p", "Alon\nItamar\nTomer\nNadav");
 
    const tabPage = document.querySelector("#tab-About");

    ourTeam_.appendChild(ourTeam_names);

    tabPage.appendChild(paragraph);
    tabPage.appendChild(ourTeam_title);
    tabPage.appendChild(ourTeam_);
    
}

const renderAboutPage = () => {
    const tabPage = document.querySelector("#tab-About");
    tabPage.classList = "tab-content hidden";
  
    render_paragraph();
    render_key_features();
    render_ourteam();
}

renderAboutPage();