let City = document.querySelector('.CityName');
let CityDate = document.querySelector('.TimeZone');
let Temp = document.querySelector('.Temperature');
let Humidity = document.querySelector('.Humidity');
let WindSpeed = document.querySelector('.WindSpeed');
let WindPressure = document.querySelector('.Pressure');
let Weather_data = document.querySelector('.weather_data_info');
let citySearchForm = document.querySelector('#search-btn');
let searchInput = document.querySelector('#search-input'); // City input field

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(curDate);
};

const getWeatherData = async (city) => {
    const apiKey = "bcf85ad2a2e3f3d19c4bfbe11b17d978"; // Your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const res = await fetch(weatherUrl);
        if (!res.ok) {
            throw new Error("City not found");
        }
        const data = await res.json();
        const { main, name, weather, wind, sys, dt } = data;

        City.innerHTML = `${name}, ${sys.country}`;
        CityDate.innerHTML = getDateTime(dt);
        Weather_data.innerHTML = `${(main.temp - 273).toFixed(0)}°C`; // Round to 0 decimal
        Temp.innerHTML = `${(main.temp - 273.15).toFixed(2)}°C`; // Detailed temperature
        Humidity.innerHTML = `${main.humidity}%`;
        WindSpeed.innerHTML = `${wind.speed} m/s`;
        WindPressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.log(error);
        alert("Unable to fetch weather data for the city.");
    }
};

citySearchForm.addEventListener('click', (e) => {
    e.preventDefault();
    const cityName = searchInput.value.trim(); // Get the city name from the input field

    if (cityName !== "") {
        getWeatherData(cityName); // Fetch weather data for the searched city
    } else {
        alert("Please enter a city name.");
    }
});

window.addEventListener("load", () => {
    getWeatherData("Patna"); // Default city on page load
});
