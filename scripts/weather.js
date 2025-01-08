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
    return data;
  }

  async displayWeather() {
    const data = await this.getWeather();
    this.temp = Math.round(data.main.temp - 273.15);
    this.feel = Math.round(data.main.feels_like - 273.15);
    this.high = Math.round(data.main.temp_max - 273.15);
    this.low = Math.round(data.main.temp_min - 273.15);
    this.description = data.weather[0].description;

    const weatherContainer = document.querySelector(".weather");
    weatherContainer.innerHTML = '';

    const cityDescription = document.createElement("h3");
    cityDescription.textContent = `We predict ${this.description} for ${this.city} today!`;
    cityDescription.classList.add("weather__city");
    weatherContainer.appendChild(cityDescription);

    const tempValue = document.createElement("h1");
    tempValue.classList.add("weather__temp")
    tempValue.textContent = `${this.temp}°C`;
    weatherContainer.appendChild(tempValue);

    const feelValue = document.createElement("p");
    feelValue.classList.add("weather__feel")
    feelValue.textContent = `Feels like: ${this.feel}°C`;
    weatherContainer.appendChild(feelValue);

    const highLow = document.createElement("div");
    highLow.classList.add("weather__high-low");

    const highValue = document.createElement("p");
    highValue.textContent = `High: ${this.high}°C`;

    const lowValue = document.createElement("p");
    lowValue.textContent = `Low: ${this.low}°C`;

    const returnLink = document.createElement("a");
    returnLink.classList.add("weather__return-link")
    returnLink.href = "./index.html";
    const returnButton = document.createElement("button");
    returnButton.classList.add("weather__return-button")
    returnButton.textContent = `back`;
      
    
    highLow.appendChild(highValue);
    highLow.appendChild(lowValue);
    
    weatherContainer.appendChild(highLow);
    weatherContainer.appendChild(returnLink);
   returnLink.appendChild(returnButton);
    
    const initial = document.querySelector(".initial");
    initial.classList.add("hide");

    const backgroundImg = document.querySelector("body");
    const snow = document.querySelectorAll(".inner");
    if (this.temp <= 0) {
  backgroundImg.classList.remove("body__background__default");
  backgroundImg.classList.add("body__background__-10");
  snow.forEach((item) => {
    item.innerHTML = "🔪";
  });
} else if (this.temp > 0 && this.temp <= 10) {
  backgroundImg.classList.remove("body__background__default");
  backgroundImg.classList.add("body__background__0-10");
  snow.forEach((item) => {
    item.innerHTML = "❄️";
  });
} else if (this.temp > 10 && this.temp <= 20) {
  backgroundImg.classList.remove("body__background__default");
  backgroundImg.classList.add("body__background__10-20");
  snow.forEach((item) => {
    item.innerHTML = "🌸";
  });
} else if (this.temp > 20 && this.temp <= 30) {
  backgroundImg.classList.remove("body__background__default");
  backgroundImg.classList.add("body__background__20-30");
  snow.forEach((item) => {
    item.innerHTML = "☀️";
  });
} else if (this.temp > 30) {
  backgroundImg.classList.remove("body__background__default");
  backgroundImg.classList.add("body__background__30");
  snow.forEach((item) => {
    item.innerHTML = "🔥";
  });
}

}
}

// const formInput = document.querySelector(".form__input");
// formInput.addEventListener("invalid", (event) => {
//   event.preventDefault();
//   formInput.classList.add("error");
// });



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

