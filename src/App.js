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
  const [titleDetails, setTitleDetails] = useState([])
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState(false)


  const getSourceDetails = () => {
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

  const getTitleDetails = () => {
    axios({
      url: baseUrl + 'title/' + titleId + '/details/',
      method: 'GET',
      dataResponse: 'json',
      params : {
        apiKey: apiKey,
      }
    }).then((res) => {
      setTitleDetails(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    if(titleId){
      getTitleDetails()
      getSourceDetails()
    }
  }, [titleId])

  const handleClick = () => {
    setResults(false)
    setSearched(true)
}

  return (
    <div className="App">
      

      {
        results === false
        ? 
        <>
        <h1>Where to Watch</h1>
        <h2>Search to see if a movie or tv show is available stream, buy or rent</h2>
        </> : null
        // <button className='back' onClick={handleClick}>Back</button>
      }

      <SearchForm setSearched={setSearched} setSearchArr={setSearchArr} baseUrl={baseUrl} apiKey={apiKey} setResults={setResults}/>

      {
        results === true ? <button className='back' onClick={handleClick}>Back</button> : null
      }

      {
        searched === true
        ?
        <TitlePIcker searchArr={searchArr} setSearched={setSearched} setTitleId={setTitleId} setTitle={setTitle} setResults={setResults}/>
        : null
      }

      {
        results === true
        ?
        <FinalResults title={title} resArr={resArr} setSearched={setSearched} setResults={setResults} titleDetails= {titleDetails}/>
        : null
      }

    </div>
  );
}

export default App;
