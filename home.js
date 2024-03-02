
const apiKey = 'CG-yDnWGRJ82gHZipwJp4oUvnAY';
const apiUrl = 'https://api.coingecko.com/api/v3';

const data = {};
let cryptoOptions;
let priceChart; // Declare a variable to store the chart instance
let current_selectedCoin; // the crypto currency was selected


$(() => {
  fetchData();
});

const getTopCoinsByUSDValue = async () => {
  try {
    // Fetching the market data for coins sorted by market cap (a proxy to get popular/high-value coins)
    const marketData = await makeApiRequest('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1');
    // Sorting the fetched coins by their current price in USD in descending order
    const sortedByValue = marketData.sort((a, b) => b.current_price - a.current_price);
    // Slicing the array to get the top 10 coins
    return sortedByValue.slice(0, 10);
    
  } catch (error) {
    console.error('Error in getTopCoinsByUSDValue:', error);
    throw error;
  }
};

const getDateAtIndex = (index) => {
  // Get the current year
  var currentYear = new Date().getFullYear();

  // Create a new date object for January 1st of the current year
  var currentDate = new Date(currentYear, 0, 1);

  // Add the index number of days to the current date
  currentDate.setDate(currentDate.getDate() + index);

  return currentDate;
};

const fetchData = async () => {
  try {
    cryptoOptions = await getTopCoinsByUSDValue();
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

const getCoinCardData = async (id) => { // Make it an async function to use 'await'
  try {
    query = "simple/price?ids=" + id + "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false&precision=4";
    const coinCardData = await makeApiRequest(query);
    //debugger;
    return coinCardData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getCoinChartData = async(id) =>{
  try {
    query = "coins/" + id + "/market_chart?vs_currency=usd&days=365&interval=daily&precision=5";
    const coinChartData = await makeApiRequest(query);
    return coinChartData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const extractSecondElement = (subList) => {
  return subList[1];
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

   // Function to update the graph
   const updateGraphs = (chartData) => {

    const days = [];
    for (var i = 0 ; i<365 ; i++){
      days.push(getDateAtIndex(i));
    }
    const chartPrices = chartData.prices.map(extractSecondElement);
    //const chartMarketCap = chartData.market_caps.map(extractSecondElement);

      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains("dark");
      // Define background color based on dark mode
      const chartBackgroundColor = isDarkMode ? "gray" : "gray";
      const chartLineColor = isDarkMode ? "white" : "black"; // Set the line color based on dark mode
      
      // Check if the chart is already initialized
      if (priceChart) {
        priceChart.data.datasets[0].data = chartPrices;
        priceChart.data.datasets[0].backgroundColor = chartBackgroundColor;
        //priceChart.data.datasets[1].data = chartMarketCap;
        //priceChart.data.datasets[1].backgroundColor = chartBackgroundColor;
        
        // Update the legend label color
        priceChart.options.plugins.legend.labels.color = isDarkMode
          ? "white"
          : "black";
  
        // Update the grid and ticks colors
        priceChart.options.scales.x.grid.color = isDarkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)";
        priceChart.options.scales.x.ticks.color = isDarkMode ? "white" : "black";
        priceChart.options.scales.y.grid.color = isDarkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)";
        priceChart.options.scales.y.ticks.color = isDarkMode ? "white" : "black";
        priceChart.data.datasets[0].borderColor = chartLineColor;
  
        // Update the chart
        priceChart.update();
      } else {
        // Initialize a new chart
        const priceChartCanvas = document.getElementById("line-chart");
        priceChart = new Chart(priceChartCanvas, {
          type: "line",
          data: {
            labels: days,
            datasets: [
              {
                data: chartPrices,
                borderWidth: 2,
                backgroundColor: chartBackgroundColor,
                borderColor: "white",
                pointRadius:0,
                pointHoverRadius:10,
                label:"Prices in USD"
              },
              /*
              {
                data: chartMarketCap,
                borderWidth: 2,
                backgroundColor: chartBackgroundColor,
                borderColor: "red",
                pointRadius:0,
                pointHoverRadius:10,
                label:"Market cap in USD"
              },*/
            ]

          },
          options: {
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              
            },
            scales: {
              x: {
                display:false,
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "white",
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "white",
                },
              },
            },
          },
        });
      }
  };
  
  
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
        current_selectedCoin = event.target.options[selectedIndex];
        getCoinData(selectedCoinID);



       // updateGraphs(selectedCoinID);
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

  const getCoinData = (id) => {
    getCoinCardData(id)
    .then((card) => {
      updateCards(card, id);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    getCoinChartData(id)
    .then((chart) => {
      updateGraphs(chart);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
    getCoinData(cryptoOptions[0].id);
    current_selectedCoin = cryptoOptions[0];
  };
  
  
  