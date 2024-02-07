        
            // Initial fake coin data
        let fakeCoinData = [
            { name: 'Bitcoin', symbol: 'BTC', prices: [35000, 38000, 42000, 40000, 45000, 47000, 48000,35000, 38000, 42000, 40000, 45000], volumes: [], MarketCap24Hrs: [] },
            { name: 'Ethereum', symbol: 'ETH', prices: [35000, 38000, 42000, 6, 45000, 47000, 5, 42000, 6, 45000, 47000 ,8452], volumes: [], MarketCap24Hrs: [] },
            {name: 'Ripple', symbol: 'RIPPLE', prices: [0.5090, 1, 5.5, 6, 2, 1, 5, 9, 6, 50, 4 ,6], volumes: [], MarketCap24Hrs: []}
            // Add more fake coin data as needed
        ];

        // set theme
        const modeChange = () => {
            
            document.documentElement.classList.toggle("dark")
            document.documentElement.classList.toggle("light")

        }

        // view
        const setView = (v, tabId) => {
            document.querySelector('h1').innerText = v
            var randomColor = Math.floor(Math.random()*16777215).toString(16)
            document.querySelector('h1').style.borderBottom = `10px solid #${randomColor}`

            // show only the tab that was clicked
            var tabContents = document.getElementsByClassName('tab-content');
            Array.from(tabContents).forEach((el) => {
                el.classList.add('hidden');
            })
            document.getElementById(tabId).classList.remove('hidden');


            

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


    // Function to update the graph
let priceChart;  // Declare a variable to store the chart instance

const updateGraphs = (selectedCoin) => {
    const selectedCoinData = fakeCoinData.find(coin => coin.symbol === selectedCoin);

    // Check if the chart is already initialized
    if (priceChart) {
        // Destroy the existing chart
        priceChart.destroy();
    }

    // Check if selectedCoinData is defined
    if (selectedCoinData) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // Initialize a new chart
        const priceChartCanvas = document.getElementById('line-chart');
        priceChart = new Chart(priceChartCanvas, {
            type: 'line',  // Change the chart type to bar (you can adjust as needed)
            data: {
                labels: monthNames.slice(0, selectedCoinData.prices.length), // Use actual month names
                datasets: [{
                    label: selectedCoinData.name || 'Unknown Coin',
                    data: selectedCoinData.prices, // Use the entire prices array
                    backgroundColor: 'blue',  // Adjust color as needed
                    borderWidth: 2,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error(`Coin with symbol ${selectedCoin} not found in fakeCoinData.`);
    }
};

      