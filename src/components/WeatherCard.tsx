import React, {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar'
import Clock from '../components/Clock'
import {toFahrenheit} from '../utils/toFahrenheit'
import {first, second, capitalize} from '../utils/extract'
import cities from '../cities'
import Trie from '../utils/trie'
import Suggestions from '../components/Suggestions'

let cityTrie = new Trie()
for(let obj of cities) {
    cityTrie.insert(`${obj["city"]}, ${obj["state"]}`)
}

function WeatherCard() {

    const [location, setLocation] = useState({city: 'Nashville', state: 'TN', country: 'US'})
    const [weather, setWeather] = useState({temp: 0, desc: ''})
    const [inputVal, setInputVal] = useState('')
    const [cityAlert, setCityAlert] = useState<string>('')
    const [suggestions, setSuggestions] = useState<any>([])

    let min500 = window.matchMedia('min-width: 500px').matches

    // when location changes, fetch and update weather.
    useEffect(() => {
        setInputVal('')
        const APIkey = '1190971169da1d408bb276b6f237946f'
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state},${location.country}&appid=${APIkey}`)
        .then(res => res.json())
        .then((data) => {
            setWeather({temp: toFahrenheit(data.main.temp), desc: data.weather[0].description})
        })
        .catch(() => {setCityAlert('City not found')})
    }, [location])

    return (
        <>
        <div id="sun"></div>
        <legend id="header">Get weather data for U.S. cities</legend>
        <div className="card">
            <h1>{capitalize(location.city)}</h1>
            <div className="flexContainer">
                <small id="alert">{cityAlert}</small>
                <div className="searchArea"> 
                    <SearchBar func={setInputVal} funcTwo={setLocation} trie={cityTrie} setAlert={setCityAlert} setSuggestions={setSuggestions} inputVal={inputVal}/>
                    <input id='go' type="button" value="GO" onClick={() => {
                        if(!cityTrie.contains(inputVal)) {
                            setCityAlert('City not found')
                            return
                        }
                        setLocation({
                            city: first(inputVal),
                            state: second(inputVal),
                            country: 'us'
                        })
                    }}/>
                </div>
            </div>  
            {!min500 && <Suggestions arr={suggestions} setLoc={setLocation} setSuggestions={setSuggestions} minStatus={min500}/> }
            <div className="centerCard">
                <h2>{weather.temp}<span>&#176;</span></h2>
                <h3>{capitalize(weather.desc)}</h3>
            </div>
            {min500 && <Suggestions arr={suggestions} setLoc={setLocation} setSuggestions={setSuggestions} />}
            <Clock />
        </div>
        </>
    )
}

export default WeatherCard
