var config={
    key:"10794dda3982dc8ec8679ea6dde1d9fd",
    baseurl:"https://api.openweathermap.org/data/2.5/", 
}
function initial(){
    fetch(`${config.baseurl}weather?q=delhi&units=metric&APPID=${config.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(event){
    if(event.keyCode==13){
        getResults(searchbox.value);
        //console.log(searchbox.value);
    }
};

function getResults(query){
    fetch(`${config.baseurl}weather?q=${query}&units=metric&APPID=${config.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
};

function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerHTML=`${weather.name}, ${weather.sys.country}`;
    
    let now=new Date();
    let date=document.querySelector('.location .date');
    console.log(now);
    date.innerHTML=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>&#8451;</span>`; 
    
    let weather_el=document.querySelector('.current .weather');
    weather_el.innerHTML=`${weather.weather[0].main}`;

    let hilow=document.querySelector('.current .hi-low');
    hilow.innerHTML=`${Math.round(weather.main.temp_max)}<span>&#8451;</span> / ${Math.round(weather.main.temp_min)}<span>&#8451;</span>`;
};

function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
};

initial();