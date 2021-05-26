

moment().format('L');

// Search function to get the current City Weather from openweather

function searchCityWeather(searchCityEl) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    searchCityEl + 
    "&units=imperial&appid=f8d11b4cf79d3c3e9c639576025ce0ca"
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
    
        var currentDate = moment().format('L');
        var cityNameEl = $('<h3>').text(response.name);
        var displayDate = cityNameEl.append(" " + currentDate);
        var temperatureEl = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windEl = $("<p>").text("Wind: " + response.wind.speed);
        var currentWeather = response.weather[0].main;
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        //Get the icon that matches the current weather for the current city
        if (currentWeather === "Rain"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
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

        fetch("https://api.openweathermap.org/data/2.5/onecall?&appid=f8d11b4cf79d3c3e9c639576025ce0ca&lat=" + lat + "&lon=" + lon)

        .then(function(response) {
            return response.json();
          })
        
        .then(function(response){
            var uvindexEl = $("<p>").text("UV Index: " + response.current.uvi);
            currentWeatherDiv.append(uvindexEl);
            $('#currentweather').html(currentWeatherDiv);
        })  
        
    });

        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + 
        searchCityEl + 
        "&units=imperial&appid=f8d11b4cf79d3c3e9c639576025ce0ca"
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            
            var results = response.list;
            //create the cards for the five day forcast
            for (var i = 0; i < results.length; i +=8){

            var fivedaycard = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

            var fiveDayDate = results[i].dt_txt;
            var setdate = fiveDayDate.substr(0,10);
            var fiveDayTemp = results[i].main.temp;
            var fiveDayHum = results[i].main.humidity;

            var fiveDayDateEl = $("<h4 class='cardtitle'>").text(setdate);
            var fiveDayTempEl = $("<p class='cardtext'>").text("Temp: " + fiveDayTemp);
            var fiveDayHumEl = $("<p class='cardtext'>").text("Humidity: " + fiveDayHum);

            var fivedayweather = results[i].weather[0].main;

            if (fivedayweather === "Rain"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Clouds"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Clear"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Drizzle"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Snow"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            }
            
            fivedaycard.append(fiveDayDateEl);
            fivedaycard.append(fiveDayWeatherIconEl);
            fivedaycard.append(fiveDayTempEl);
            fivedaycard.append(fiveDayHumEl);
            $("#fiveday").append(fivedaycard);
        }

    });    
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