const request = require('request')

const geocode = (location, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXRsLWtuaCIsImEiOiJjazhvN2Ezcm8xNmIxM2dvMmR2YXg2a29jIn0.zub2Se7zMimJXZfFy5LqWw&limit=1'

    request({ url: geoURL, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location services.', undefined)
      } else if (body.features.length === 0) {
        callback('Invalid location. Please use valid location format.')
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        })
      }

    })

}

module.exports = geocode
