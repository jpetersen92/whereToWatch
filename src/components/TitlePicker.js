

const TitlePicker = ({ searchArr, setSearched, setTitleId }) => {

    const handleClick = (e) => {
        setTitleId(e.target.id);
        setSearched(false);
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