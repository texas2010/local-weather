import DOM from './view-function'
import getJSON from './request'

const render = ({ weather, main, name, sys }) => {
  DOM.id('city_country').textContent = `${name}, ${sys.country}`
  DOM.id('weather_main').textContent = weather[0].main
  DOM.id('weather_icon').src = weather[0].icon
  DOM.id('weather_icon').alt = weather[0].description
  DOM.id('celsius').textContent = parseInt(main.temp)
  DOM.id('fahrenheit').textContent = parseInt((main.temp * 9 / 5 + 32))
}

const localWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
      const data = await getJSON(url)
      render(data)
    })
  }
}

localWeather()

DOM.id('weather_temp').addEventListener('click', () => {
  DOM.id("fah-box").classList.toggle("show")
  DOM.id("cel-box").classList.toggle("hide")
})