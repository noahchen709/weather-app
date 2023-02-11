let weather = {
    "apiKey": "25046fa66eb4e1c1c704ed1000526227",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name, } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_max, temp_min, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description; 
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";   
        document.querySelector(".hi-and-low").innerText = "H:" + Math.round(temp_max) + "° L:" + Math.round(temp_min) + "°"; 
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"; 
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";  
        document.querySelector(".feels-like").innerText = "Feels like: " + Math.round(feels_like) + "°";
        
        // outfit recommendation based on current temp
        difference = temp - feels_like;
        averageTemp = (temp_max + temp_min) / 2 - difference;
        if (averageTemp >= 25) {
            document.querySelector(".outfit-recommendation").innerText = "It's shorts weather";
        } else if (averageTemp >= 18) {
            document.querySelector(".outfit-recommendation").innerText = "It's short-sleeves weather";
        } else if (averageTemp >= 8) {
            document.querySelector(".outfit-recommendation").innerText = "It's sweater weather";
        } else if (averageTemp >= -3) {
            document.querySelector(".outfit-recommendation").innerText = "It's fleece/vest weather";
        } else if (averageTemp >= -10) {
            document.querySelector(".outfit-recommendation").innerText = "It's winter coat weather";
        } else {
            document.querySelector(".outfit-recommendation").innerText = "Extreme cold! Wear Canada Goose";
        }

        // outfit colour recommendation
        function generateOutfit() {
            // create an array of possible outfit options
            const outfit = [
              "wear white top and grey bottoms",
              "wear black top and grey bottoms",
              "wear red top and black bottoms",
              "wear black top and black bottoms",
              "wear white top and black bottoms",
              "wear black top and denim bottoms",
              "wear white top and denim bottoms",
            ];
          
            // generate a random number between 0 and the length of the outfit array
            const randomIndex = Math.floor(Math.random() * outfit.length);
          
            // return the outfit at the randomly generated index
            return outfit[randomIndex];
          }
          
          // generate and log a random outfit to the console
          document.querySelector(".colour-recommendation").innerText = generateOutfit();

        document.querySelector(".weather").classList.remove("loading"); 
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function() {
        weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Toronto");    