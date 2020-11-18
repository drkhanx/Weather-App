const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const imgSrc = document.querySelector("img.time");
const iconSrc = document.querySelector(".icon img");

// console.log(imgSrc); Working
// console.log(iconSrc); Working

const updateUI = (data) => {
  //   const cityDetails = data.cityDetails;
  //   const cityWeather = data.cityWeather;

  // Destructuring
  const { cityDetails, cityWeather } = data;
  const UI = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${cityWeather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>`;
  details.innerHTML = UI;
  //   console.log(cityDetails);
  //   console.log(cityWeather);

  // Update Icons
  let icon = cityWeather.WeatherIcon;
  //   console.log(icon); Working
  iconSrc.setAttribute("src", `img/icons/${icon}.svg`);

  // Change Day/Night Images
  // Using Ternary Operator
  let timeSrc = cityWeather.IsDayTime ? "img/day.svg" : "img/night.svg";
  //   let timeSrc = null;
  //   if (cityWeather.IsDayTime) {
  //     timeSrc = "img/day.svg";
  //   } else {
  //     timeSrc = "img/night.svg";
  //   }
  imgSrc.setAttribute("src", timeSrc);

  //   Removes Display Class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);

  //   return {
  //     cityDetails: cityDetails,
  //     cityWeather: cityWeather,
  //   };

  //   Object Shorthand
  return {
    cityDetails,
    cityWeather,
  };
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form.city.value.trim();
  //   console.log(city);
  form.reset();
  updateCity(city)
    .then((data) => {
      updateUI(data);
      //   console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  localStorage.setItem("city", city);
});

if (localStorage.city) {
  updateCity(localStorage.city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
