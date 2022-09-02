const respons = document.querySelector('.respons');
weather = (inputCity = 'New York') => {
    respons.style.display = 'none';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=1a16df53148b78e453264342eb03b680&units=metric').then(req => req.json()).then(data => {
        // Data
        const temp = data.main.temp;
        const weather = data.weather[0]['description'];
        const city = data.name;
        const country = data.sys.country;
        const icon = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/' + data.weather[0]["icon"] + '.svg';
        // Selactor
        const tempHtml = document.querySelector('.weather-status h3 span');
        const weatherHtml = document.querySelector('.weather-status p');
        const cityHtml = document.querySelector('.weather-status h1');
        const iconHtml = document.querySelector('.weather-status img');
        // Set On DOM
        tempHtml.innerHTML = temp;
        weatherHtml.innerHTML = weather;
        cityHtml.innerHTML = city + ', ' + country;
        iconHtml.setAttribute('src', icon);
    }).catch(error => {
        console.clear();
        respons.style.display = 'block';
        respons.innerHTML = 'There was an error! Try again.';
    });
}
weather();

inputedWeather = () => {
    const location = document.querySelector('.location').value;
    if (location.length > 2) {
        weather(location);
    } else {
        respons.style.display = 'block';
        respons.innerHTML = 'Please try with a valid city name.';
    }
}
document.querySelector('.submit-city').addEventListener('click', function () {
    inputedWeather();
});
document.querySelector('form').onkeydown = function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        inputedWeather();
    }
};