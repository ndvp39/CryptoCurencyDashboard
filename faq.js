
// Array of FAQs
const faqArray = [
    {
        question: "What services do you offer?",
        answer: "We provide a range of services including real-time and historical data of various cryptocurrencies, News and more."
    },
    {
        question: "Can I contact customer support?",
        answer: "You can reach our customer support team by sending us a message. See more at 'Contact'."
    }
];

const renderFAQ = (question, answer) => {

    const FAQ_div = createElement("div", "");

    const title_FAQ = createElement("h3", question);
    title_FAQ.classList = "text-xl font-semibold";

    const text_FAQ = createElement("p", answer);
  
    FAQ_div.appendChild(title_FAQ);
    FAQ_div.appendChild(text_FAQ);

    return FAQ_div;
}

const renderFAQPage = () => {
    const FAQPage = document.querySelector("#tab-FAQ");
    FAQPage.classList = "tab-content hidden text-center";
  
    const title_FAQ = createElement("h2", "Frequently Asked Questions");
    title_FAQ.classList = "text-2xl font-bold mb-4";

    const text_FAQ = createElement("p", "Find answers to common questions about our products and services.");
    text_FAQ.classList = "mb-8";


    FAQPage.appendChild(title_FAQ);
    FAQPage.appendChild(text_FAQ);
    
    const FAQList = createElement("div", "", [{name: "id", value: "faq-list"}]);

    // Loop through the array and append each FAQ
    faqArray.forEach(faqItem => {
        FAQList.appendChild(renderFAQ(faqItem.question, faqItem.answer));
    });
    
    FAQPage.appendChild(FAQList);

}

renderFAQPage();