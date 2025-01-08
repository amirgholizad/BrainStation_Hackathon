console.log("working");

const backgroundImg = document.querySelector("body");
const snow = document.querySelectorAll(".inner");
console.log(snow);
console.log(backgroundImg);
const temp = -55; //get this temp from api response
const button = document.querySelector(".form__button");
button.addEventListener("click", function (event) {
  //function to snow and to change background image, please wrap this in the submit eventlistener instead
  event.preventDefault();
  if (temp <= 0) {
    backgroundImg.classList.remove("body__background__default");
    backgroundImg.classList.add("body__background__-10");
    snow.forEach((item) => {
      item.innerHTML = "🔪";
    });
  } else if (temp > 0 && temp <= 10) {
    backgroundImg.classList.remove("body__background__default");
    backgroundImg.classList.add("body__background__0-10");
    snow.forEach((item) => {
      item.innerHTML = "❄️";
    });
  } else if (temp > 10 && temp <= 20) {
    backgroundImg.classList.remove("body__background__default");
    backgroundImg.classList.add("body__background__10-20");
    snow.forEach((item) => {
      item.innerHTML = "🌸";
    });
  } else if (temp > 20 && temp <= 30) {
    backgroundImg.classList.remove("body__background__default");
    backgroundImg.classList.add("body__background__20-30");
    snow.forEach((item) => {
      item.innerHTML = "☀️";
    });
  } else if (temp > 30) {
    backgroundImg.classList.remove("body__background__default");
    backgroundImg.classList.add("body__background__30");
    snow.forEach((item) => {
      item.innerHTML = "🔥";
    });
  }
});
