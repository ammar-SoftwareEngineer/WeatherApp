let searchInput = document.getElementById("search");
let filterSelect = document.querySelectorAll(".form-select");
let btnLocation = document.getElementById("btnLocation");
// start date
let time = new Date();
let day = time.getDay();
let todayNumber = time.getDate();
let month = time.getMonth();
let daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let weekData = daysWeek[day];
let monthData = months[month];
// end date

// ################################################
// ******* start API
btnLocation.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  }
});

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let changeLat = latitude;
  let changeLon = longitude;
  let contentLocation = `${changeLat},${changeLon}`;
  weatherApp(contentLocation);
}
async function weatherApp(s, f) {
  let weatherApi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ac72d922828f430f85e201458240301&q=${s}&days=${f}`
  );
  let getWeatherApi = await weatherApi.json();
  console.log(getWeatherApi);
  let days = getWeatherApi.forecast.forecastday;

  showDataFirst(getWeatherApi);
  showDataCards(days);
  // nameCountry();
}
weatherApp("egypt");

// ################################################

function showDataFirst(getWeatherApi) {
  let country = document.querySelector(".card-title .country");
  let degree = document.querySelector(".card-title .degree");
  let iconWeather = document.querySelector(".card img");
  let windSpeed = document.querySelector(".card .wind-speed span");
  let windDirection = document.querySelector(".card .wind-direction span");
  let humidity = document.querySelector(".card .humidity span");
  let statusWeather = document.querySelector(".card-status");
  let monthWeather = document.querySelector(".card-month");
  let dayWeather = document.querySelector(".card-day");
  country.innerHTML =
    getWeatherApi.location.country + " " + getWeatherApi.location.name;
  degree.innerHTML = getWeatherApi.current.temp_c + "°C";
  iconWeather.src = getWeatherApi.current.condition.icon;
  windSpeed.innerHTML = getWeatherApi.current.wind_kph;
  statusWeather.innerHTML = getWeatherApi.current.condition.text;
  dayWeather.innerHTML = weekData;
  monthWeather.innerHTML = todayNumber + " " + monthData;
  windDirection.innerHTML = getWeatherApi.current.wind_dir;
  humidity.innerHTML = getWeatherApi.current.humidity;
}

// ################################################

function showDataCards(days) {
  // cards
  let dateCards;
  let afterDate;
  let numberDaysCard;
  let daysCard;
  let monthsCard;
  let finalDays;
  let finalDate;
  let col = ``;
  for (let i = 1; i <= days.length; i++) {
    dateCards = days[i].date;
    afterDate = new Date(dateCards);
    numberDaysCard = afterDate.getDate();
    daysCard = afterDate.getDay();
    monthsCard = afterDate.getMonth();
    finalDays = daysWeek[daysCard];
    finalDate = numberDaysCard + " " + months[monthsCard];
    col += `
      <div class="col-lg-4 col-md-6 col-10 mx-auto">
      <div class="card rounded-4 text-white shadow-lg">
        <div class="img-card   mx-auto pt-2 pt-lg-3">
          <img src="${days[i].day.condition.icon}" class="" alt="...">
        </div>
        <div class="card-body px-3">
          <div class=" flex-wrap text-center pb-2 pb-lg-3">
            <div class=" d-grid pb-2 pb-lg-3    ">
              <p class="  fs-6">${finalDate} </p>
              <p class="  fs-6">${finalDays}</p>
            </div>
            <h5 class=" fs-1 fw-semibold ">
              <span class="text-white">${days[i].day.maxtemp_c + "°C"}</span>
            </h5>
          </div>
          <p class=" fs-6 text-center">${days[i].day.condition.text}</p>
        </div>
      </div>
    </div>`;
    document.getElementById("row").innerHTML = col;
  }
}

// ################################################

searchInput.addEventListener("keyup", (s) => {
  weatherApp(s.target.value);
});

filterSelect.forEach((select) => {
  select.addEventListener("change", (f) => {
    let selectedValue = f.target.value;
    if (selectedValue >= 2) {
      document.getElementById("row").style.display = "flex";
    } else {
      document.getElementById("row").style.display = "none";
    }
    let search = searchInput.value;
    weatherApp(search, selectedValue);
  });
});


// ################################################
// **** Dark Mode And Light Mode
let btnTheme = document.querySelector(".nav-link-theme");

function setLight() {
  document.body.classList.add("light");
  localStorage.setItem("lightMode", "enabled");
}

function disableLight() {
  document.body.classList.remove("light");
  localStorage.setItem("lightMode", "disabled");
}

function toggleLightMode() {
  if (localStorage.getItem("lightMode") === "enabled") {
    disableLight();
    btnTheme.innerHTML = `<i class="fa-regular fa-lightbulb text-white"></i>`;
  } else {
    setLight();
    btnTheme.innerHTML = `<i class="fa-solid fa-lightbulb text-dark"></i>`;
  }
}

window.onload = function () {
  if (localStorage.getItem("lightMode") === "enabled") {
    setLight();
    btnTheme.innerHTML = `<i class="fa-solid fa-lightbulb text-dark"></i>`;
  }
};

btnTheme.addEventListener("click", toggleLightMode);
