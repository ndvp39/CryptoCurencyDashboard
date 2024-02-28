// Initial fake coin data
let fakeCoinData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      prices: [
        35000, 38000, 42000, 40000, 45000, 47000, 48000, 35000, 38000, 42000,
        40000, 45000,
      ],
      volumes: [],
      MarketCap24Hrs: [],
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      prices: [
        35000, 38000, 42000, 6, 45000, 47000, 5, 42000, 6, 45000, 47000, 8452,
      ],
      volumes: [],
      MarketCap24Hrs: [],
    },
    {
      name: "Ripple",
      symbol: "RIPPLE",
      prices: [0.509, 1, 5.5, 6, 2, 1, 5, 9, 6, 50, 4, 6],
      volumes: [],
      MarketCap24Hrs: [],
    },
    // Add more fake coin data as needed
  ];
  let priceChart; // Declare a variable to store the chart instance
  let current_selectedCoin; // the crypto currency was selected
  
  // set theme
  const modeChange = () => {
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  
    // updating the graph for dark / light adjustment
    if (current_selectedCoin != null) {
      updateGraphs(current_selectedCoin);
    }
  };
  
  // view
  const setView = (v, tabId) => {
    document.querySelector("h1").innerText = v;
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector("h1").style.borderBottom =
      `10px solid #${randomColor}`;
  
    // show only the tab that was clicked
    var tabContents = document.getElementsByClassName("tab-content");
    Array.from(tabContents).forEach((el) => {
      el.classList.add("hidden");
    });
    document.getElementById(tabId).classList.remove("hidden");
  
    toggleMenu(true);
  };
  
  // menu
  const toggleMenu = (hide) => {
    if (!hide) {
      document.querySelector("#ddMenu").classList.toggle("hidden");
      document.querySelectorAll("svg").forEach((el) => {
        el.classList.toggle("hidden");
      });
    } else {
      document.querySelector("#ddMenu").classList.add("hidden");
      document.querySelectorAll("svg")[0].classList.remove("hidden");
      document.querySelectorAll("svg")[1].classList.add("hidden");
    }
  };
  
  function tmp() {
    alert("Test");
  }
  
  // Function to update the graph
  const updateGraphs = (selectedCoin) => {
    current_selectedCoin = selectedCoin;
    const selectedCoinData = fakeCoinData.find(
      (coin) => coin.symbol === selectedCoin,
    );
  
    // Check if selectedCoinData is defined
    if (selectedCoinData) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains("dark");
      // Define background color based on dark mode
      const chartBackgroundColor = isDarkMode ? "gray" : "gray";
      const chartLineColor = isDarkMode ? "white" : "black"; // Set the line color based on dark mode
  
      // Check if the chart is already initialized
      if (priceChart) {
        // Update the existing chart with new data
        priceChart.data.labels = monthNames.slice(
          0,
          selectedCoinData.prices.length,
        );
        priceChart.data.datasets[0].data = selectedCoinData.prices;
        priceChart.data.datasets[0].backgroundColor = chartBackgroundColor;
        priceChart.data.datasets[0].label = selectedCoinData.name;
  
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
            labels: monthNames.slice(0, selectedCoinData.prices.length),
            datasets: [
              {
                label: selectedCoinData.name || "Unknown Coin",
                data: selectedCoinData.prices,
                borderWidth: 2,
                backgroundColor: chartBackgroundColor,
                borderColor: "white",
              },
            ],
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
    } else {
      console.error(
        `Coin with symbol ${selectedCoin} not found in fakeCoinData.`,
      );
    }
  };