const fetch = require('node-fetch');
require('dotenv').config()
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const browserObject = require('./browser');
const scraperController = require('./pageController');


// Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller

// if(localStorage.getItem('proxies')===null){
    // fetch("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all")
    //     .then(response => response.text()).then(data =>console.log(data) )
// }
if(localStorage.getItem('places')===null){
    console.log("here")
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tattoo%20shop%20in%20london&key=${process.env.API_KEY}`)
    .then(response=>response.json()).then(data=>localStorage.setItem('places',JSON.stringify(data))).then(()=>scraperController(browserInstance))
}
else{
    scraperController(browserInstance)
}

// data.split("\r\n")
