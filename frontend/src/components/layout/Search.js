import React, {useState} from 'react'
import MetaData from "./MetaData";


//this function components added to the Header.js and take keyword to Home.js while render
const Search = ({history}) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            //used in Home.js file as a parameter to render item
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <>
            <form onSubmit={searchHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Search