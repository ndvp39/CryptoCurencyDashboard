    $(() => {
        fetchData()
    });
      
      // Initial fake coin data
       let fakeCoinData = [
        { name: 'Bitcoin', symbol: 'BTC', prices: [35000, 38000, 42000, 40000, 45000, 47000, 48000,35000, 38000, 42000, 40000, 45000], volumes: [], MarketCap24Hrs: [] },
        { name: 'Ethereum', symbol: 'ETH', prices: [35000, 38000, 42000, 6, 45000, 47000, 5, 42000, 6, 45000, 47000 ,8452], volumes: [], MarketCap24Hrs: [] },
        {name: 'Ripple', symbol: 'RIPPLE', prices: [0.5090, 1, 5.5, 6, 2, 1, 5, 9, 6, 50, 4 ,6], volumes: [], MarketCap24Hrs: []}
        // Add more fake coin data as needed
    ];


    const tabNames = ['Home', 'About', 'Contact', 'News', 'FAQ'];
    const tabIds = ['tab-Home', 'tab-About', 'tab-Contact', 'tab-News', 'tab-FAQ'];

    let priceChart;  // Declare a variable to store the chart instance
    let current_selectedCoin; // the crypto currency was selected 

    // set theme
    const modeChange = () => {
        document.documentElement.classList.toggle("dark")
        document.documentElement.classList.toggle("light")

        // updating the graph for dark / light adjustment
        if(current_selectedCoin != null){
            updateGraphs(current_selectedCoin)
        }

    }

    // view
    const setView = (v, tabId) => {

        console.log('setView called with:', v, tabId);


        document.querySelector('h1').innerText = v
        var randomColor = Math.floor(Math.random()*16777215).toString(16)
        document.querySelector('h1').style.borderBottom = `10px solid #${randomColor}`

        // show only the tab that was clicked
        var tabContents = document.getElementsByClassName('tab-content');
        Array.from(tabContents).forEach((el) => {
            el.classList.add('hidden');
        })
        
        document.getElementById(tabId).classList.remove('hidden');
        
        console.log('ClassList after removing "hidden":', document.getElementById(tabId).classList);

        toggleMenu(true)
    }

    // menu
    const toggleMenu = (hide) => {
        if (!hide) {
            document.querySelector('#ddMenu').classList.toggle('hidden')
            document.querySelectorAll('svg').forEach((el) => {
                el.classList.toggle('hidden')
            })
        }
        else {
            document.querySelector('#ddMenu').classList.add('hidden')
            document.querySelectorAll('svg')[0].classList.remove('hidden')
            document.querySelectorAll('svg')[1].classList.add('hidden')                    
        }
    }

    function tmp(){
        alert('Test')
    }

    const fetchData = async () => {
        try {
            createTabs();
            createHomeScreen();
        } catch (e) {
          console.error(e)
        }
      };



    const createTabs = () => {
        let container = $("#ddMenu");
        container.empty();
        container.addClass("absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full z-10");

        const buttons = tabNames.map((tabName, index) => createTabButton(tabNames, tabIds[index]));
        container.append(buttons);

    }

    const createTabButton = (tab_name, tab_id) => {
        return $("<button>").addClass("block py-1 px-2").text(tab_name).attr("id", tab_id).click(() => {
            setView(tab_name, tab_id)
          });
    }
    


    
    const createHomeScreen = () => {

        let main_div = $("<div>").addClass("py-4 p-4");

        let tab_title = $("<h1>").addClass("text-3xl border-b-[10px] border-blue-300").text("Home");

        main_div.append(tab_title)

        main_div.appendTo("body");


        let container = $("#tab-Home").addClass("tab-content max-w-[1000px] w-full mx-auto relative");
        container.empty();
        main_div.append(container)

        let title = $("<h2>").addClass("center-align").text("Web Crypto project");
        container.append(title);

        let text = $("<p>").text("Select CryptoCurrency");
        container.append(text);

        let coins_select = $("<select>").addClass("dark:bg-gray-700 w-200").attr("id", "coinsellector").change(() => {
            updateGraphs(this.value)
        });

        $.each(fakeCoinData, function(index, coin) {
            let option_to_select = $("<option>").text(coin.name).val(coin.symbol);
            coins_select.append(option_to_select);
        });
        container.append(coins_select);

   
        let cards = $("<div>").addClass("flex flex-wrap gap-4").attr("id", "cards");
        container.append(cards);

        let card1 = $("<div>").addClass("card");
        let card1_content_title = $("<p>").text("All Time High");
        let card1_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card1.append(card1_content_title);
        card1.append(card1_content);
        cards.append(card1);

        let card2 = $("<div>").addClass("card");
        let card2_content_title = $("<p>").text("All Time High");
        let card2_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card2.append(card2_content_title);
        card2.append(card2_content);
        cards.append(card2);

        let card3 = $("<div>").addClass("card");
        let card3_content_title = $("<p>").text("All Time High");
        let card3_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card3.append(card3_content_title);
        card3.append(card3_content);
        cards.append(card3);

        let card4 = $("<div>").addClass("card");
        let card4_content_title = $("<p>").text("All Time High");
        let card4_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card4.append(card4_content_title);
        card4.append(card4_content);
        cards.append(card4);

        let card5 = $("<div>").addClass("card");
        let card5_content_title = $("<p>").text("All Time High");
        let card5_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card5.append(card5_content_title);
        card5.append(card5_content);
        cards.append(card5);

        let card6 = $("<div>").addClass("card");
        let card6_content_title = $("<p>").text("All Time High");
        let card6_content = $("<p>").addClass("all_time_high").text("5236.78 $");
        card6.append(card6_content_title);
        card6.append(card6_content);
        cards.append(card6);



        let graph = $("<div>").addClass("p-6 rounded-lg shadow-md").attr("id", "chart-container");
        let chart = $("<canvas>").addClass("w-full").attr("id", "line-chart");
        graph.append(chart)
        container.append(graph);


        


    }


















// Function to update the graph
const updateGraphs = (selectedCoin) => {
    current_selectedCoin = selectedCoin;
    const selectedCoinData = fakeCoinData.find((coin) => coin.symbol === selectedCoin);

    // Check if selectedCoinData is defined
    if (selectedCoinData) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // Check if dark mode is enabled
        const isDarkMode = document.documentElement.classList.contains('dark');
        // Define background color based on dark mode
        const chartBackgroundColor = isDarkMode ? 'gray' : 'gray';
        const chartLineColor = isDarkMode ? 'white' : 'black'; // Set the line color based on dark mode

        // Check if the chart is already initialized
        if (priceChart) {
            // Update the existing chart with new data
            priceChart.data.labels = monthNames.slice(0, selectedCoinData.prices.length);
            priceChart.data.datasets[0].data = selectedCoinData.prices;
            priceChart.data.datasets[0].backgroundColor = chartBackgroundColor;
            priceChart.data.datasets[0].label = selectedCoinData.name;
            
            // Update the legend label color
            priceChart.options.plugins.legend.labels.color = isDarkMode ? 'white' : 'black';

            // Update the grid and ticks colors
            priceChart.options.scales.x.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            priceChart.options.scales.x.ticks.color = isDarkMode ? 'white' : 'black';
            priceChart.options.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            priceChart.options.scales.y.ticks.color = isDarkMode ? 'white' : 'black';
            priceChart.data.datasets[0].borderColor = chartLineColor;

            // Update the chart
            priceChart.update();
        } else {
            // Initialize a new chart
            const priceChartCanvas = document.getElementById('line-chart');
            priceChart = new Chart(priceChartCanvas, {
                type: 'line',
                data: {
                    labels: monthNames.slice(0, selectedCoinData.prices.length),
                    datasets: [{
                        label: selectedCoinData.name || 'Unknown Coin',
                        data: selectedCoinData.prices,
                        borderWidth: 2,
                        backgroundColor: chartBackgroundColor,
                        borderColor: 'white',
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                            },
                            ticks: {
                                color: 'white',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                            },
                            ticks: {
                                color: 'white',
                            },
                        },
                    },
                },
            });
        }
    } else {
        console.error(`Coin with symbol ${selectedCoin} not found in fakeCoinData.`);
    }
};

  
