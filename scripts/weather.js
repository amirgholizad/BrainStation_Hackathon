import key from "../keys.json" with { type: "json" };

class weather {
  constructor(city) {
    this.key = key[0].WEATHER_API_KEY;
    this.city = city;
  }

  async getLocation() {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`
    );
    const data = response.data;
    const { lat, lon } = data[0];
    return { lat, lon };
  }

  async getWeather() {
    const { lat, lon } = await this.getLocation();
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}`
    );
    const data = response.data;
    this.temp = Math.round(data.main.temp - 273.15);
    this.feel = Math.round(data.main.feels_like - 273.15);
    this.high = Math.round(data.main.temp_max - 273.15);
    this.low = Math.round(data.main.temp_min - 273.15);
    this.description = data.weather[0].description;
  }

  // ------------------ AI GOES HERE! ------------------
  async genAi() {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const aiKey = key[1].OPENAI_API_KEY;

    await this.getWeather();
    const weatherCondition = `We predict ${this.description} for ${this.city} today. The temperature is ${this.temp} degrees of celcius. Feels like ${this.feel} and the High and low are ${this.high} and ${this.low}`;
    console.log(weatherCondition);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant who is recommending the user what to wear based on the weather condition. Always give the answer as 3 bullet points. You should recommend clothes for Top, Bottom, and Footwear. Give the answer as a json file such as {Top: , Bottom: ,Footwear:  }",
          },
          {
            role: "user",
            content: `The wether condition today is as described: ${weatherCondition}`,
          },
        ],
      }),
    });
    const data = await response.json();
    const recommendation = data.choices[0].message.content;
    this.responseJSON = JSON.parse(recommendation);
    console.log(this.responseJSON);
  }

  async genAiImage() {
      const API_URL = "https://api.openai.com/v1/images/generations";
      const aiKey = key[1].OPENAI_API_KEY;
  
      try {
          const response = await axios.post(API_URL,
              {
                model: 'dall-e-3',
                prompt: 'A cute baby sea otter',
                n: 1,
                size: '1024x1024',
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${aiKey}`,
                },
              }
            )
          console.log(response.data.data[0].url);
        } catch (error) {
              const errorMessage = await error;
              console.error('Error Details:', errorMessage);
            };
          }

  async displayWeather() {
    await this.getWeather();
    await this.genAi();
    const baseText = `Based on the weather, we recommend you to wear ${this.responseJSON.Top} for the top, ${this.responseJSON.Bottom} for the bottom, and ${this.responseJSON.Footwear} for the footwear.`;

    const weatherContainer = document.querySelector(".weather");
    weatherContainer.innerHTML = "";

    const cityDescription = document.createElement("h3");
    cityDescription.textContent = `We predict ${this.description} for ${this.city} today!`;
    cityDescription.classList.add("weather__city");
    weatherContainer.appendChild(cityDescription);

    const tempValue = document.createElement("h1");
    tempValue.classList.add("weather__temp");
    tempValue.textContent = `${this.temp}°C`;
    weatherContainer.appendChild(tempValue);

    const feelValue = document.createElement("p");
    feelValue.classList.add("weather__feel");
    feelValue.textContent = `Feels like: ${this.feel}°C`;
    weatherContainer.appendChild(feelValue);

    const highLow = document.createElement("div");
    highLow.classList.add("weather__high-low");

    const highValue = document.createElement("p");
    highValue.textContent = `High: ${this.high}°C`;

    const lowValue = document.createElement("p");
    lowValue.textContent = `Low: ${this.low}°C`;

    const returnLink = document.createElement("a");
    returnLink.classList.add("weather__return-link");
    returnLink.href = "./index.html";
    const returnButton = document.createElement("button");
    returnButton.classList.add("weather__return-button");
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
      const winterClothing = document.createElement("p");
      winterClothing.textContent = baseText;
      weatherContainer.appendChild(winterClothing);
      winterClothing.classList.add("weather__clothing");
    } else if (this.temp > 0 && this.temp <= 10) {
      backgroundImg.classList.remove("body__background__default");
      backgroundImg.classList.add("body__background__0-10");
      snow.forEach((item) => {
        item.innerHTML = "❄️";
      });

      const springClothing = document.createElement("p");
      springClothing.textContent = baseText;
      weatherContainer.appendChild(springClothing);
      springClothing.classList.add("weather__clothing");
    } else if (this.temp > 10 && this.temp <= 20) {
      backgroundImg.classList.remove("body__background__default");
      backgroundImg.classList.add("body__background__10-20");
      snow.forEach((item) => {
        item.innerHTML = "🌸";
      });

      const summerClothing = document.createElement("p");
      summerClothing.textContent = baseText;
      weatherContainer.appendChild(summerClothing);
      summerClothing.classList.add("weather__clothing");
    } else if (this.temp > 20 && this.temp <= 30) {
      backgroundImg.classList.remove("body__background__default");
      backgroundImg.classList.add("body__background__20-30");
      snow.forEach((item) => {
        item.innerHTML = "☀️";
      });

      const autumnClothing = document.createElement("p");
      autumnClothing.textContent = baseText;
      weatherContainer.appendChild(autumnClothing);
      autumnClothing.classList.add("weather__clothing");
    } else if (this.temp > 30) {
      backgroundImg.classList.remove("body__background__default");
      backgroundImg.classList.add("body__background__30");
      snow.forEach((item) => {
        item.innerHTML = "🔥";
      });

      const hotClothing = document.createElement("p");
      hotClothing.textContent = baseText;
      weatherContainer.appendChild(hotClothing);
      hotClothing.classList.add("weather__clothing");
    }
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
