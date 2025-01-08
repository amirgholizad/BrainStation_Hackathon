import key from "../keys.json" with { type: "json" };


class weather {
  constructor(city) {
    this.key = key.WEATHER_API_KEY;
    this.city = city;
  }

  async getLocation() {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`);
    const data = await response.json();
    const { lat, lon } = data[0];
    return { lat, lon };
  }
  
  async getWeather() {
    const { lat, lon } = await this.getLocation();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}`);
    const data = await response.json();
    return data;
  }

  async displayWeather() {
    const data = await this.getWeather();
    const temp = Math.round(data.main.temp - 273.15);
    const feel = Math.round(data.main.feels_like - 273.15);
    const high = Math.round(data.main.temp_max - 273.15);
    const low = Math.round(data.main.temp_min - 273.15);
    const description = data.weather[0].description;

    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.innerHTML = '';

    const cityDescription = document.createElement("h4");
    cityDescription.textContent = `We predict ${description} for ${this.city} today!`;
    weatherContainer.appendChild(cityDescription);

    const tempValue = document.createElement("h2");
    tempValue.textContent = `${temp}°C`;
    weatherContainer.appendChild(tempValue);

    const feelValue = document.createElement("p");
    feelValue.textContent = `Feels like: ${feel}°C`;
    weatherContainer.appendChild(feelValue);



    const highLow = document.createElement("div");
    highLow.classList.add("high-low");

    const highValue = document.createElement("p");
    highValue.textContent = `High: ${high}°C`;

    const lowValue = document.createElement("p");
    lowValue.textContent = `Low: ${low}°C`;

    highLow.appendChild(highValue);
    highLow.appendChild(lowValue);

    weatherContainer.appendChild(highLow);
}
}


const formValue = document.querySelector(".form");


const formListener = formValue.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = e.target.city.value.trim();

  const weatherContainer = new weather(cityValue);
  weatherContainer.displayWeather();

  formValue.reset();
});

