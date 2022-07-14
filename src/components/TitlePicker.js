

const TitlePicker = ({ searchArr, setSearched, setTitleId, setTitle, setResults }) => {

    const handleClick = (e) => {
        setTitleId(e.target.id);
        setTitle(e.target.textContent);
        setSearched(false);
        setResults(true);
    }

    if (searchArr.length === 0) {
        return (
            <div className="nores">
                <h3>Sorry this movie or show title was not found. Double check spelling or try a new title.</h3>
            </div>
        )
    } else {
        return (
            <div className="titlePicker">
                {
                    searchArr.map((title) => {
                        return (
                            <button id={title.id} key={title.id} onClick={handleClick}>{title.name}</button>
                        )
                    })
                }
            </div>
        )
    }

}

export default TitlePicker