console.log("working");

const backgroundImg = document.querySelector("body");
const snow = document.querySelectorAll(".inner");
console.log(snow);
console.log(backgroundImg);
const this.temp = -55; //get this temp from api response
const button = document.querySelector(".form__button");
button.addEventListener("click", function (event) {
  //function to snow and to change background image, please wrap this in the submit eventlistener instead
  event.preventDefault();
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
});
