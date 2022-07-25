//Importing the library
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')

//Setting path
const pubPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//calling express for setting server
const app = express()
const port = process.env.PORT || 3000

//Settign locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Using the static files
app.use(express.static(pubPath))


app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',name:'Akshay Garg'});
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page'
        ,name:'Akshay Garg'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page'
        ,name:'Akshay Garg'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            'error':'Please provide address for weather forecast'
        });
    }
    forecast(req.query.address, (error, {temp,rain,city,cont}={}) => {
        if (error) {
            return res.send({error})
        }
        
        res.send({
            forecast:' It is currently ' + temp + ' degress out. There is a ' + rain + '% chance of rain.',
            address:city+', '+cont
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.text)
    {
        return res.send({
            'error':'Please provide search term'
        });
    }
    res.send({
            'product':[]
        });
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help Error Page'
        ,name:'Akshay Garg'
        ,error:'Help Article Not Found'
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error Page'
        ,name:'Akshay Garg'
        ,error:'Page Not Found'
    });
})


app.listen(port,()=>{
    console.log("Server Starting on port "+port);
})