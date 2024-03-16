

  // set theme
  const modeChange = () => {
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  
    // updating the graph for dark / light adjustment
    if (current_selectedCoin != null) {
      //updateGraphs(current_selectedCoin);
      getCoinData(current_selectedCoin.id);
    }
  };
  
  // view
  const setView = (v, tabId) => {
    document.querySelector("#tab_title").innerText = v;
    // var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector("#tab_title").style.borderBottom =
      `10px solid #FFD369`;
  
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
  
  const renderAllTabs = () => {

    const mainDiv = document.querySelector("#mainDiv");
    mainDiv.classList = "p-4";

    tabs.forEach(tab => {
      mainDiv.appendChild(createElement("div", "", [{name: "id", value: `tab-${tab}`}]));
    });

    const root = document.querySelector("#root");
    root.appendChild(mainDiv);


  }
  renderAllTabs();
