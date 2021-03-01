import React, { useRef, useEffect } from 'react'
import {first, second, formatCity} from '../utils/extract'

function Suggestions(props: any, minStatus: any) {

    return (
        <div id="suggestions">
            <ul id='ul'>
            {props.arr.map((city: string, i: number) => (
                <li className="suggestion" key={i} onClick={() => {
                    props.setSuggestions([])
                    props.setLoc({city: first(city), state: second(city), country: 'us'}); 
                }}>{formatCity(city)}</li>
            ))}
        </ul>
        </div>
    )
}

export default Suggestions
