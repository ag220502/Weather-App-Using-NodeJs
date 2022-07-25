const { urlencoded } = require('express')
const request = require('request')

const forecast = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&units=metric&appid=a04cdaf22c6f4056a23a371b5ca4294d'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{temp:body.main.temp,rain:body.clouds.all,city:body.name,cont:body.sys.country})
        }
    })
}

module.exports = forecast