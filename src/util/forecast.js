const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'https://api.openweathermap.org/data/2.5/weather?appid=0a6952b833883fe554f6760d4011a388&units=imperial&lat=' + latitude + '&lon=' + longitude

  request({ url: url, json: true}, (error, { body }) => {
    if (error) {
      callback( 'Cannot connect to weather service.', undefined)
    } else if (body.error) {
      callback('Invalid location format. Location does not exist.', undefined)
    } else {
      callback(undefined, 'The current temp feels like ' + body.main.feels_like + ' *F. '+ 'It is actually ' + body.main.temp + ' *F degrees out. '+ 'The weather is ' + body.weather[0].description + ' .')
    }
  })
}
module.exports = forecast
