//Importing the library
const path = require('path')
const express = require('express')

const pubPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')

//The library contains only one funciton which is express() 
//and we are calling that function here and storing it into app variable
const app = express()

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(pubPath))

//app.get function is like routing throught the request of the user
//if the user just enters the domain name then the returned thing will be displayed
//req is a parameter which contains the info about the incoming request to the server
//res is a parameter which contains the methods which allow us to send 
//custamized data to the user 
//if akshay.com is called then this will be displayed
app.get('',(req,res)=>{
//     //sending the data to display to user
    res.render('index',{title:'Weather App',name:'Akshay Garg'});
})

//if akshay.com/about is called then this funciton will be called
app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/help',(req,res)=>{
    res.render('help');
})

app.get('/weather',(req,res)=>{
    res.send({
        'location':'Ahmedabad',
        'forecast': 23
    });
})


//to start the server up we have to call listen method
//we have to pass the port and function what to do when port start
app.listen(8000,()=>{
    console.log("Server starting");
})