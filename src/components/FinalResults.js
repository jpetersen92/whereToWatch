const FinalResults = ({title, resArr}) => {

    const uniqueObjects = [...new Map(resArr.map(item => [item.source_id, item])).values()]

    console.log(uniqueObjects)

    return (
            <div className="results">
                <h3>{title}</h3>
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
                        }

                        return (
                            <div className="resultsCard">
                                <h4>{res.name}</h4>
                                <ul>
                                    <li><a href={res.web_url}>{type}</a></li>
                                    {res.price
                                    ?
                                    <li>${res.price}</li>
                                    : <li>See {res.name}'s site for subscription pricing</li>
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
                </div>
            </div>
    )
}

export default FinalResults