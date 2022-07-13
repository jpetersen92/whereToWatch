const FinalResults = ({title, resArr, setSearched, setResults, titleDetails}) => {

    const uniqueObjects = [...new Map(resArr.map(item => [item.source_id, item])).values()]

    const handleClick = () => {
        setResults(false)
        setSearched(true)
    }

    // DELETE THIS LOG
    // console.log(uniqueObjects)

    if (uniqueObjects.length === 0) {
        return (
            <div className="noRes">
                <h3>Sorry No Results Found</h3>
                <button onClick={handleClick}>Back</button>
            </div>
        )
    } else {
        return (
                <div className="results">
                    <div className="titleContainer">
                        <div className="title">
                            <h3>{title}</h3>
                            <p>{titleDetails.year}</p>
                            <p>{titleDetails.plot_overview}</p>
                        </div>
                    <img className="poster" src={titleDetails.poster} alt={title} />
                    </div>
                        <h3>Buy, Rent or Stream</h3>
                    <div className="cardContainer">
                    {
                        uniqueObjects.map((res) => {
    
                            let type = '';
                            if(res.type === 'rent') {
                                type = 'Rent'
                            } else if(res.type === 'buy') {
                                type = 'Buy'
                            } else if(res.type === 'sub') {
                                type = 'Stream'
                            } else if(res.type === 'tve') {
                                type = 'Watch Online'
                            } else if(res.type === 'free') {
                                type = 'Free'
                            }
    
                            return (
                                <div key={res.source_id} className="resultsCard">
                                    <h4>{res.name}</h4>
                                    <ul>
                                        <li><a href={res.web_url}>{type}</a></li>
                                        {res.price
                                        ?
                                        <li>${res.price}</li>
                                        : <li>See {res.name} for subscription pricing</li>
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                    </div>
                    <img src={titleDetails.backdrop} alt="" />
                </div>
        )
    }
}

export default FinalResults