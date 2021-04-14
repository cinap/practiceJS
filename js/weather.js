const API_KEY = '39e9de743ae58388305e01763e827eb3';
const COORDS = `coards`;
const weather = document.querySelector('.js-weather');

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    callApi(latitude, longitude);
}

function handleGeoError(){
    console.log('Error Occurred')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function callApi(lat, lnt){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lnt}&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
        return response.json();
    })
    .then((json) =>{
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `현재 기온 : ${temperature} \n 위치 : ${place}`;
    });
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    console.log(loadedCoords);
    if(!loadedCoords){
        askForCoords();
    }else{
       const parseCoords = JSON.parse(loadedCoords);
       callApi(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();