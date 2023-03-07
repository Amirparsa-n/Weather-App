const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "20213d9ef9ed66dec92f2d67bcea85e5";

form.addEventListener("submit" , event => {
    event.preventDefault(); 
    const city = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let {main, name, sys, weather} = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li = document.createElement("li");
            li.classList.add("city");
            
            const info = `
            <h2 class='ajax-section city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src='${icon}' alt ='city' >
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure>
            `;

            li.innerHTML = info;
            list.appendChild(li); 

            msg.innerText = "";

        })
        .catch(() => {
            msg.innerText = "Search for a valid city";
        })

        input.value = "";
})




// https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg