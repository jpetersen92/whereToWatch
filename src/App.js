import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const baseUrl = 'https://api.watchmode.com/v1/';
const apiKey = 'wpBNZj7YCKWCgbOoirUk98YWjhsUP0PxcCs8kcXP';


// use the WatchMode API to search database for movie streaming
// User inputs movie or show title
// on submit title will be used to call search api to get title_id
// with title_id another api call will be used to get title streaming sources
// source name, region, type, price (if available) and web_url to be posted to page
// show show/movie title, plot_overview, type, 

function App() {
  const [input, setInput] = useState('')
  const [title, setTitle] = useState('')
  const [titleId, setTitleId] = useState()
  const [searchArr, setSearchArr] = useState([])
  const [resArr, setResArr] = useState([])
  const [searched, setSearched] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearched(true)
    getTitleId()
  }

  const handleClick = (e) => {
    setTitleId(e.target.id);
    setSearched(false);
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
    })
  }

  const getTitleDetails = () => {
    axios({
      url: baseUrl + 'title/' + titleId + '/sources/',
      method: 'GET',
      dataResponse: 'json',
      params : {
        apiKey: apiKey,
      }
    }).then((res) => {
      setResArr(res.data)
    })
  }

  useEffect(() => {
    if(titleId){
      getTitleDetails()
    }
  }, [titleId])

  return (
    <div className="App">
      <h1>Where to Watch</h1>
      <h2>Search to see if a movie or tv show is available stream, buy or rent</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title" name="title" className='titleSearch'>Search Results For</label>
        <input type="text" name="title" placeholder="Movie/Show Title" onChange={(e) => setInput(e.target.value)}/>
        <button type="submit" value="submit" className='submit'>Search</button>
      </form>

      <div className="titlePicker">
      {
        searched === true
        ?
        searchArr.map((title) => {
          return (
              <button id={title.id} key={title.id} onClick={handleClick}>{title.name}</button>
          )
        })
        : null
      }
      </div>



    </div>
  );
}

export default App;
