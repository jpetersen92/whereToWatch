

const TitlePicker = ({ searchArr, setSearched, setTitleId, setTitle, setResults }) => {

    const handleClick = (e) => {
        setTitleId(e.target.id);
        setTitle(e.target.textContent);
        setSearched(false);
        setResults(true);
    }

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

export default TitlePicker