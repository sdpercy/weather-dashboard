

moment().format('L');

// Search function to get the current City Weather

function searchCityWeather(searchCityEl) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    searchCityEl + 
    "&units=imperial&appid=f8d11b4cf79d3c3e9c639576025ce0ca"
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
        console.log(response.data);
    

        var currentDate = moment().format('L');

        var cityNameEl = $('<h3>').text(response.name);
        var displayDate = cityNameEl.append(" " + currentDate);
        var temperatureEl = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windEl = $("<p>").text("Wind: " + response.wind.speed);
        var currentWeather = response.weather[0].main;

        //Get the icon that matches the current weather for the current city
        if (currentWeather === "Rain"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
            displayDate.append(weatherIconEl);
        } else if (currentWeather === "Clouds"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
           
        } else if (currentWeather === "Clear"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } else if (currentWeather === "Drizzle"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } else if (currentWeather === "Snow"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } 
        
        var currentWeatherDiv = $('<div>');

        currentWeatherDiv.append(displayDate, weatherIconEl, temperatureEl, humidityEl, windEl);

        $('#currentweather').html(currentWeatherDiv);

        //populate UV

       /* var lat = response.coord.lat;
        var lon = response.coord.lon;

        fetch("https://api.openweathermap.org/data/2.5/onecall?&appid=f8d11b4cf79d3c3e9c639576025ce0calat=" + lat + "&lon=" + lon)

        .then(response => response.json())
        
        .then(function(data){
            console.log(data);

        }) */   
        
    })
};

$("#searchbtn").on("click", function(event){
    //prevent button from submitting form
    event.preventDefault();
    //store the name of the city to search
    var searchCityEl = document.querySelector("#cityname").value;
    
    console.log(searchCityEl);
    
    //save search result to localstorage

    //var inputTextEl = $(this).siblings("input").val();
    //var storearray = [];
    //storearray.push(inputTextEl);
    //localstorage.setItem('cityname', JSON.stringify(storearray));

    searchCityWeather(searchCityEl);

});