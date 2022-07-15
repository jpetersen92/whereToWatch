import { useState } from "react"
import axios from "axios"


const SearchForm = ({ setSearched, setSearchArr, baseUrl, apiKey, setResults, setLoading }) => {

    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setSearched(true)
        setResults(false)
        getTitleId()
    }

    const getTitleId = () => {
        axios({
            url: baseUrl + 'search/',
            method: 'GET',
            dataResponse: 'json',
            params : {
            apiKey: apiKey,
            search_field: 'name',
            search_value: input
        }
        }).then((res) => {
            setSearchArr(res.data.title_results)
            setLoading(false)
        })
    }


    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="title" name="title" className='titleSearch'>Search Results For</label>
            <input type="text" name="title" placeholder="Movie/Show Title" onChange={(e) => setInput(e.target.value)}/>
            <button type="submit" value="submit" className='submit'>Search</button>
        </form>
    )
}

export default SearchForm