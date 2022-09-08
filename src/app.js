const path = require('path')

const express = require('express');

const app = express();

//hbs
const hbs = require('hbs')

//GeoCode
const geoCode = require('./utils/geocode')

//Forecast
const forecast = require('./utils/forecast')


//app.com
//app.com/help
//app.com/about

const publicDirectoryPath = path.join(__dirname, '../public')

//customize view path
const viewPath = path.join(__dirname, '../templates/views')

//paritals path
const partialsPath = path.join(__dirname, '../templates/partials')

//for dynamic pages
app.set('view engine','hbs') //using handlebars

//to customize where to find the handlebars, if we don't do this it'll go to the views folder if created in the root folder
app.set('views', viewPath)

//registering partials
hbs.registerPartials(partialsPath);

//for static pages we create this static directory within public
app.use(express.static(publicDirectoryPath))

app.get('',(req,res,next)=>{
    //render will go into view folder and get index
    res.render('index',{
        title: 'Weather App',
        name: 'Henok Yoseph'
    }) 
})

app.get('/about',(req,res,next)=>{
    res.render('about',{
        title: 'About',
        name: 'Henok Yoseph'
    })
})

app.get('/help', (req,res,next)=>{
    res.render('help', {
        message: 'We can help you with anything',
        title: 'Help',
        name: "Henok Yoseph"
    })
})

// app.get('',(req,res,next)=>{
//     res.send('<h1>HOME</h1>')
// })

// app.get('/help',(req,res,next)=>{
//     res.send({
//         name: 'Henok',
//         age: 21
//     })
// })

// //CHALlENGE
// app.get('/about',(req,res,next)=>{
//     res.send('<h1>This is the about page</h1>')
// })

app.get('/weather',(req,res,next)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address search term'
        })
    }
    
    geoCode(req.query.address, (err, {latitude, longitude, location}={})=>{
        if(err){
            return res.send({
                error: err
            })
            
        }
        forecast(latitude, longitude, (err,data)=>{
            if(err){
                return res.send({
                    error: err
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: data
            })
        })    
    })
  
  
})

app.get('/products',(req,res,next)=>{
    if(!req.query.search){
        return res.send({
            error:"Must provide an error search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res,next)=>{
    res.render('error',{
        errorMessage: 'Help article not found',
        title: "404",
        name: 'Henok Yoseph'
    })
})

//404 page handler
app.get('*',(req,res,next)=>{ //is * a wild card which is everything that isn't mentioned above
    res.render('error',{
        errorMessage: 'Page not found',
        title: "404",
        name: 'Henok Yoseph'
    })
})

app.listen(3000, ()=>{
    console.log(`Server is up on port 3000`)
});