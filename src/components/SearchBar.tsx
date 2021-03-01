import React, {useState, useRef} from 'react'
import cities from '../cities'
import Trie from '../utils/trie'
import {first, second} from '../utils/extract'
import cityTrie from '../components/WeatherCard'
import Suggestions from './Suggestions'

function SearchBar(props: any) {
    
    return (
        <>
        <input id="search" placeholder="Search" autoComplete='off' value={props.inputVal} type="text" onChange={
            (e) => {
                props.setAlert('')
                props.func(e.target.value)
                if(props.trie.autocomplete(e.target.value) === undefined) {
                    props.setSuggestions([])
                } else {
                    props.setSuggestions(props.trie.autocomplete(e.target.value).slice(0, 6))
                }
            }
        } />
        </>
    )
}


export default SearchBar 
