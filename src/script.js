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

