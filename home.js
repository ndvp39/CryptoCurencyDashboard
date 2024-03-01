
const apiKey = 'CG-yDnWGRJ82gHZipwJp4oUvnAY';
const apiUrl = 'https://api.coingecko.com/api/v3';

const data = {};
let cryptoOptions;

/*

  const cryptoOptions = [
    {
      content: "Bitcoin",
      value: "BTC",
    },
    {
      content: "Ethereum",
      value: "ETH",
    },
    {
      content: "Ripple",
      value: "RIPPLE",
    },
  ];

*/



$(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    cryptoOptions = await getCoinsList();
    renderHomePage();  // load the page when all data above is loaded from the API
  } catch (e) {
    console.error(e);
  }
};

const makeApiRequest = async (endpoint) => {
  try {
    const options = { method: 'GET' };
    const url = `${apiUrl}/${endpoint}?x_cg_demo_api_key=${apiKey}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in makeApiRequest:', error);
    throw error;
  }
};

const getCoinsList = async () => { // Make it an async function to use 'await'
  try {
    const coinsList = await makeApiRequest('coins/list?include_platform=false');
    return coinsList.slice(50, 90); // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ sort @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getCoinData = async (id) => { // Make it an async function to use 'await'
  try {
    query = "simple/price?ids=" + id + "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false&precision=4";
    
    const coinData = await makeApiRequest(query);
    return coinData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


const updateCards = (coin_data, coinID) => {

  const card1 = document.querySelector("#card_0");
  card1.innerText = coin_data[coinID].usd;
  const card2 = document.querySelector("#card_1");
  card2.innerText = coin_data[coinID].usd_market_cap;
  const card3 = document.querySelector("#card_2");
  card3.innerText = coin_data[coinID].usd_24h_vol;
  const card4 = document.querySelector("#card_3");
  card4.innerText = coin_data[coinID].usd_24h_change;

}

const cryptoDataCards = [
    {
      name: "usd",
      value: "---",
      class: "usd"
    },
    {
      name: "usd market cap",
      value: "---",
      class: "usd_market_cap"
    },
    {
      name: "usd 24h vol",
      value: "---",
      class: "usd_24h_vol"
    },
    {
      name: "usd 24h change",
      value: "---",
      class: "usd_24h_change"
    }
  ];
  
  
  const renderCryptoSelector = () => {
    const selectEl = createElement("select", "", [
      {
        name: "class",
        value: "dark:bg-gray-700 w-200",
      },
      {
        name: "id",
        value: "coinsellector",
      },
    ]);
    selectEl.onchange = (event) => {
        let selectedIndex = event.target.options.selectedIndex;
        let selectedCoinID = event.target.options[selectedIndex].id;


        getCoinData(selectedCoinID)
        .then(coin_data => {
          updateCards(coin_data, selectedCoinID);
        })
        .catch(error => {
          console.error('Error:', error);
        });


        //updateGraphs(cryptoOptions[selectedIndex].value);
    };
    cryptoOptions.forEach((coin) => {
      const optionEl = createElement("option", coin.symbol, [
        {
          name: "id",
          value: coin.id
        },
        {
          name: "symbol",
          value: coin.symbol
        },
        {
          name: "name",
          value: coin.name
        }
      ]);
  
      selectEl.appendChild(optionEl);
    });

    
  
    const selectContainer = document.querySelector("#tab-home");
    selectContainer.prepend(selectEl);
  };
  
  const renderCryptoDataCards = () => {
    cryptoDataCards.forEach((card, index) => {
      const cardEl = createElement("div", "", [
        {
          name: "class",
          value: "card",
        }
      ]);
  
      const nameEl = createElement("p", card.name);
      const valueEl = createElement("p", card.value, [
        {
          name: "class",
          value: card.class,
        },
        {
          name: "id",
          value: "card_" + index,
        }
      ]);
  
      cardEl.appendChild(nameEl);
      cardEl.appendChild(valueEl);
  
      const cards = document.getElementById("cards");
      cards.appendChild(cardEl);
    });
  };
  
  const renderHomePage = () => {
    const homePage = document.querySelector("#tab-home");
    homePage.classList = "tab-content";
  
    const h2El = createElement("h2", "Web Crypto project", [
      {
        name: "class",
        value: "center-align",
      },
    ]);
  
    const pEl = createElement("p", "Select CryptoCurrency");
  
    const cardsEl = createElement("div", "", [
      {
        name: "class",
        value: "flex flex-wrap gap-4",
      },
      {
        name: "id",
        value: "cards",
      },
    ]);
  
    const chartContainer = createElement("div", "", [
      {
        name: "class",
        value: "p-6 rounded-lg shadow-md",
      },
      {
        name: "id",
        value: "chart-container",
      },
    ]);
  
    const canvasEl = createElement("canvas", "", [
      {
        name: "id",
        value: "line-chart",
      },
      {
        name: "class",
        value: "w-full",
      },
    ]);
  
    chartContainer.appendChild(canvasEl);
    homePage.appendChild(h2El);
    homePage.appendChild(pEl);
    homePage.appendChild(cardsEl);
    homePage.appendChild(chartContainer);
  
    renderCryptoSelector();
    renderCryptoDataCards();
  };
  
  
  