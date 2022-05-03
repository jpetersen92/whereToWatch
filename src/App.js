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
  const [title, setTitle] = useState('')
  const [titleId, setTitleId] = useState()
  const [searchArr, setSearchArr] = useState([])
  const [searched, setSearched] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearched(true)
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
        search_value: title
      }
    }).then((res) => {
      setSearchArr(res.data.title_results)
    })
  }

  const getTitleDetails = () => {
    axios({
      url: baseUrl + 'title/' + titleId + 'details/',
      method: 'GET',
      dataResponse: 'json',
      params : {
        apiKey: apiKey,
      }
    }).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div className="App">
      <h1>Where to Watch</h1>
      <h2>Search to see if a movie or tv show is available on any streaming services</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title" name="title">Search a title</label>
        <input type="text" name="title" placeholder="movie/show title" onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit" value="submit">Search</button>
      </form>

      {
        searched === true
        ?
        searchArr.map((title) => {
          return (
            <div id={title.id} key={title.id}>
              <h3>{title.name}</h3>
            </div>
          )
        })
        : null
      }

    </div>
  );
}

export default App;
