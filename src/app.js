const path= require('path')
const express= require('express')
const hbs= require('hbs')
const axios= require('axios')
const getweather= require('./utils/weather')


const PublicPath= path.join(__dirname, "../public")
const PartialsPath= path.join(__dirname, "../templates/partials")
const ViewsPath= path.join(__dirname, "../templates/views")
const PORT_NUMBER=4004

const app= express()

app.set('view engine', 'hbs')
app.set('views', ViewsPath)
app.use(express.static(PublicPath))
hbs.registerPartials(PartialsPath);

app.get('', (req, res)=>{
    res.render('index.hbs', {
        title: "Home Page"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help"
    })
})

app.get('/weather', (req, res)=>{
    console.log(req.query.location)
    getweather.getweather(req.query.location, 'current', (data) => res.send(data), (error)=> res.send(error))
})

app.get('/about/*', (req, res)=>{
    res.render('404', {
        title: "Error 404",
        suggested_message: "You may want to ho to help",
        suggested_endpoint: "/help"
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',  {
        title: "Error 404",
        suggested_message: "You may want to ho to help",
        suggested_endpoint: "/help"
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "Error 404",
        suggested_message: "You may want to ho to home",
        suggested_endpoint: "/"
    })
})

app.listen(PORT_NUMBER, ()=> console.log(`Running at port ${PORT_NUMBER}`))