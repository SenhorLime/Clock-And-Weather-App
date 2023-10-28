document.addEventListener("DOMContentLoaded", () => {
  function updateClock() {
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secs = date.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secs = secs < 10 ? "0" + secs : secs;

    document.getElementById(
      "clock"
    ).innerHTML = /*html*/ `<p> ${hours}:${minutes}:${secs} </p>`;

    setTimeout(updateClock, 1000);
  }

  function updateDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    document.getElementById(
      "calendar"
    ).innerHTML = /*html*/ `<p> ${day} / ${month} / ${year} </p>`;
    setTimeout(updateDate, 1000);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetchWeather(latitude, longitude);
        },
        (error) => {
          fetchWeather(35.69, 139.69);
          console.error("Could not get geolocation", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }

  function setWeather(data) {
    return /*html*/ `<p> ${data.location.name} - ${data.current.temp_c}ºC / ${data.current.temp_f}ºF </p>`;
  }

  async function fetchWeather(latitude, longitude) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "19766c5197mshbf2aa1bb926be8ep10caeejsnc6a17b899c56",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      document.getElementById("weather").innerHTML = setWeather(data);
    } catch (error) {
      console.error(error);
      document.getElementById(
        "calendar"
      ).innerHTML = /*html*/ `<p>An error occurred while fething weather data</p>`;
    }
  }

  getLocation();
  updateDate();
  updateClock();
});
