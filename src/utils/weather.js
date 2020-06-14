const axios= require('axios')

const API_KEY = "9b3faa9733433555844474043d3c63a6"

const getweather= (location, type, callback, errorcallback) => {
    let url= `http://api.weatherstack.com/${type}?access_key=${API_KEY}&query=${location}`
    axios.get(url).then((response)=>{
        if(response.data.error) errorcallback({'error': 'API error'})
        else callback(response.data)
    }).catch((error)=> errorcallback({'error': 'error'}))
}

module.exports ={
    getweather: getweather
}