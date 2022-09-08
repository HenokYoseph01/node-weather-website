const request = require('request');


const forecast = (latitude,longitude, callback)=>{
    
    const url = `http://api.weatherstack.com/current?access_key=49067cdd932351d309450ba2ecb38a14&query=${latitude},${longitude}`

    request({url,json:true},(err, {body})=>{
        if(err){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
         }
         else{
            console.log(body.current)
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. Wind Speed is ${body.current.wind_speed} at a direction of ${body.current.wind_dir}`)
         }
    })
}

module.exports = forecast