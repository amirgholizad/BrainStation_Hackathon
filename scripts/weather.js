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

