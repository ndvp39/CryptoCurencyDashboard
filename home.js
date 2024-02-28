const cryptoDataCards = [
    {
      name: "Market Cap 24Hrs",
      value: "-4.2531%",
      class: "marketcup",
    },
    {
      name: "All Time High",
      value: "5236.78 $",
      class: "all_time_high",
    },
    {
      name: "All Time Low",
      value: "0.83842 $",
      class: "all_time_low",
    },
    {
      name: "Positive Sentiments",
      value: "68.31 %",
      class: "positive_sentiments",
    },
    {
      name: "High 24Hrs",
      value: "2147.76 $",
      class: "high24",
    },
    {
      name: "Low 24Hrs",
      value: "1784.16 $",
      class: "low24",
    },
  ];
  
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
        updateGraphs(cryptoOptions[selectedIndex].value);
    };

    cryptoOptions.forEach((coin) => {
      const optionEl = createElement("option", coin.content, [
        {
          name: "value",
          value: coin.name,
        },
      ]);
  
      selectEl.appendChild(optionEl);
    });

    
  
    const selectContainer = document.querySelector("#tab-home");
    selectContainer.prepend(selectEl);
  };
  
  const renderCryptoDataCards = () => {
    cryptoDataCards.forEach((card) => {
      const cardEl = createElement("div", "", [
        {
          name: "class",
          value: "card",
        },
      ]);
  
      const nameEl = createElement("p", card.name);
      const valueEl = createElement("p", card.value, [
        {
          name: "class",
          value: card.class,
        },
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
  
  renderHomePage();
  