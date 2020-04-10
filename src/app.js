const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Information Injection',
    name: 'Kevin',
    forecast: 'It is going to never stop.',
    location: 'Neverwhere, Hell',
    created: 'Created by KNH',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    info: 'There are 7 cats in the house',
    number: '(678)549-1650',
    forecast: 'It is going to BE SUNNY!',
    location: 'Neverwhere, Hell',
    created: 'Created by KNH',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    help: 'help! is an album by the Beatles.',
    contact: 'Contact Information',
    forecast: 'It is going to POUR.',
    location: 'Neverwhere, Hell',
    created: 'Created by KNH',
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'Must provide a valid location.'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location}={} ) => {
      if (error) {
        return res.send({error})
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error})
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        })

      })

  })

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    forecast: 'Some things are not easy',
    errorMessage:'No more HELP exists...',
    created: 'Created by KNH',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    forecast: 'Shit outta luck.',
    errorMessage:'GROSS. The page you are looking for does not exist.',
    created: 'Created by KNH',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
