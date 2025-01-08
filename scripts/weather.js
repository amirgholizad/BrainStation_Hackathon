import key from "../keys.json" with { type: "json" };

class weather {
  constructor(city) {
    this.key = key[0].WEATHER_API_KEY;
    this.city = city;
  }

  async getLocation() {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`);
    const data = response.data;
    const { lat, lon } = data[0];
    return { lat, lon };
  }
  
  async getWeather() {
    const { lat, lon } = await this.getLocation();
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}`);
    const data = response.data;
    this.temp = Math.round(data.main.temp - 273.15);
    this.feel = Math.round(data.main.feels_like - 273.15);
    this.high = Math.round(data.main.temp_max - 273.15);
    this.low = Math.round(data.main.temp_min - 273.15);
    this.description = data.weather[0].description;
  }

  async displayWeather() {
    await this.getWeather();

    const weatherContainer = document.querySelector(".weather");
    weatherContainer.innerHTML = '';

    const cityDescription = document.createElement("h3");
    cityDescription.textContent = `We predict ${this.description} for ${this.city} today!`;
    cityDescription.classList.add("weather__city");
    weatherContainer.appendChild(cityDescription);

    const tempValue = document.createElement("h2");
    tempValue.textContent = `${this.temp}°C`;
    weatherContainer.appendChild(tempValue);

    const feelValue = document.createElement("p");
    feelValue.textContent = `Feels like: ${this.feel}°C`;
    weatherContainer.appendChild(feelValue);

    const highLow = document.createElement("div");
    highLow.classList.add("weather__high-low");

    const highValue = document.createElement("p");
    highValue.textContent = `High: ${this.high}°C`;

    const lowValue = document.createElement("p");
    lowValue.textContent = `Low: ${this.low}°C`;

    highLow.appendChild(highValue);
    highLow.appendChild(lowValue);
    
    weatherContainer.appendChild(highLow);
}
}


const formValue = document.querySelector(".form");



const formListener = formValue.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = e.target.city.value.trim();

  // const formInput = document.querySelector(".form_input");
  // formInput.classList.remove("error");

  const weatherContainer = new weather(cityValue);
  weatherContainer.displayWeather();

  formValue.reset();
});
