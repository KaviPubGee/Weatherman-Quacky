const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");

async function checkWeather(city = 'Sri Lanka') {
    const res = await fetch(URL +city + `&appid=${APIKEY}`);
    let data = await res.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "+";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value)
})
searchBox.addEventListener("click", (e)=>{
    if(e.key == "Enter"){
        checkWeather(searchBox.value)
    }
})

checkWeather();