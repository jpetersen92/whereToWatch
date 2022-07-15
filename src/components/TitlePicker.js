import { PulseLoader } from "react-spinners";

const TitlePicker = ({ searchArr, setSearched, setTitleId, setTitle, setResults, setLoading, loading }) => {

    const handleClick = (e) => {
        setTitleId(e.target.id);
        setTitle(e.target.textContent);
        setLoading(true)
        setSearched(false);
        setResults(true);
    }

    if (loading) {
        return(
            <div className="loader">
                <PulseLoader color="#fff"/>
            </div>
        )
    }else if (searchArr.length === 0) {
        return (
            <div className="noRes">
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