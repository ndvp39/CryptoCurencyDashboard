const tabs = ["home", "About", "Contact", "News", "FAQ"];

const setUpTabTitle = () => {
  const tab_title_div = createElement("div", "");
  tab_title_div.classList = "py-4";

  const tab_title = createElement("h1", "Home", [{name: "id", value: "tab_title"}]);
  tab_title.classList = "text-3xl border-b-[10px] border-blue-300";

  tab_title_div.appendChild(tab_title);

  const mainDiv = document.querySelector("#mainDiv");
  mainDiv.prepend(tab_title_div);


  }

const renderDesktopHeader = () => {
  const desktopMenu = createElement("div", "", [
    { name: "class", value: "justify-start gap-4 hidden sm:flex" },
    { name: "id", value: "desktopMenu" },
  ]);

  tabs.forEach((tab) => {
    const tabButton = createElement("button", tab);
    tabButton.onclick = () => setView(tab, `tab-${tab}`);

    desktopMenu.appendChild(tabButton);
  });

  const headerEl = document.querySelector("#header");
  headerEl.appendChild(desktopMenu);
};

const renderMobileHeader = () => {
  const ddMenu = createElement("div", "", [
    {
      name: "class",
      value: "absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full z-10",
    },
    { name: "id", value: "ddMenu" },
  ]);

  tabs.forEach((tab) => {
    const tabButton = createElement("button", tab);
    tabButton.classList.add("block", "py-1", "px-2");
    tabButton.onclick = () => setView(tab, `tab-${tab}`);

    ddMenu.appendChild(tabButton);
  });

  const headerEl = document.querySelector("#header");
  headerEl.appendChild(ddMenu);
};

const renderMenuButton = () => {
  const menuButtonEl = createElement("button", "", [
    {
      name: "class",
      value: "block sm:hidden",
    },
  ]);

  menuButtonEl.onclick = () => toggleMenu();
  menuButtonEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
    <path fill="#ffffff"
    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </svg>
    <svg class="hidden" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
    <path fill="#ffffff"
    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
    `;

  const headerEl = document.querySelector("#header");
  headerEl.appendChild(menuButtonEl);
};

const renderToggleButton = () => {
  const containerEl = createElement("div", "", [
    { name: "class", value: "w-9" },
  ]);

  containerEl.innerHTML = `
    <img src="https://cdn3.iconfinder.com/data/icons/basic-ui-102/32/Basic_UI__Night_Mode-512.png"
        alt="Dark Mode" class="dark:hidden block" onclick="modeChange()">
    <img src="https://cdn3.iconfinder.com/data/icons/basic-ui-102/32/Basic_UI__Night_Mode-512.png"
        alt="Light Mode" class="hidden dark:block" onclick="modeChange()">
 `;

  const headerEl = document.querySelector("#header");
  headerEl.appendChild(containerEl);
};

const renderHeader = () => {
  const headerEl = createElement("div", "", [
    { name: "id", value: "header" },
    {
      name: "class",
      value: "bg-blue-700 dark:bg-blue-500 text-white p-4 flex justify-between",
    },
  ]);

  const containerEl = document.querySelector("#root");

  containerEl.prepend(headerEl);

  renderDesktopHeader();
  renderMobileHeader();
  renderMenuButton();
  renderToggleButton();
  setUpTabTitle();
};

renderHeader();
