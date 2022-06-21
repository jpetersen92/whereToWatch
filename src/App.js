import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import SearchForm from './components/SearchForm';
import TitlePIcker from './components/TitlePicker'
import FinalResults from './components/FinalResults';

const baseUrl = 'https://api.watchmode.com/v1/';
const apiKey = 'wpBNZj7YCKWCgbOoirUk98YWjhsUP0PxcCs8kcXP';


// use the WatchMode API to search database for movie streaming
// User inputs movie or show title
// on submit title will be used to call search api to get title_id
// with title_id another api call will be used to get title streaming sources
// source name, region, type, price (if available) and web_url to be posted to page
// show show/movie title, plot_overview, type, 


// TO DOS
// create error handeling for if not data is available or spelt wrong

function App() {
  const [title, setTitle] = useState('')
  const [titleId, setTitleId] = useState('')
  const [searchArr, setSearchArr] = useState([])
  const [resArr, setResArr] = useState([])
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState(false)


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

      <SearchForm setSearched={setSearched} setSearchArr={setSearchArr} baseUrl={baseUrl} apiKey={apiKey} setResults={setResults}/>

      {
        searched === true
        ?
        <TitlePIcker searchArr={searchArr} setSearched={setSearched} setTitleId={setTitleId} setTitle={setTitle} setResults={setResults}/>
        : null
      }

      {
        results === true
        ?
        <FinalResults title={title} resArr={resArr}/>
        : null
      }

    </div>
  );
}

export default App;
