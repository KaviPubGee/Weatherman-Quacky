const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");

async function checkWeather(city = "Sri Lanka") {
    try {
        const res = await fetch(URL + city + `&appid=${APIKEY}&units=metric`);
        const data = await res.json();

        if (!data || !data.main || !data.weather) {
            console.log("Invalid API response:", data);
            return;
        }

        const weatherMain = data.weather?.[0]?.main;

        if (weatherMain) {
            setWeatherVideo(weatherMain);
            setDuck(weatherMain);
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    } catch (err) {
        console.log("Weather fetch error:", err);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

checkWeather("Colombo");

function setWeatherVideo(weather) {
    const video = document.getElementById("bgVideo");

    let newSrc = "sunny.mp4";

    if (weather.includes("Rain")) {
        newSrc = "rain.mp4";
    } 
    else if (weather.includes("Clouds")) {
        newSrc = "clouds.mp4";
    } 

    video.src = newSrc;
    video.load();
    video.play();
}

function setDuck(weather) {
    const duck = document.getElementById("duck");

    if (weather.includes("Rain")) {
        duck.src = "duck_raincoat.png";
    } 
    else if (weather.includes("Clouds")) {
        duck.src = "duck_cloud.png";
    } 
    else{
        duck.src = "duck_sun.png";
    }
}