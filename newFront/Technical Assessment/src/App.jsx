import './App.css'
import { Rows } from './Row';
import { useEffect, useState } from "react";

export function App (){
    const [search, setSearch] = useState('');
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const [submittedSearch, setSubmittedSearch] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedSearch(search);
    };

    return(
        <>
            <form id="search-form" className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="search" className="search-label">Search:</label>
                <div className="search-container">
                    <input type="search" id="search" className="search-bar" value={search} onChange={handleSearchChange} 
                    placeholder="Example: Joker"></input>
                    <button type="submit" name="submit-btn" className="search-button" onSubmit={handleSubmit}>Search</button>
                </div>
            </form>
            <table className="movies-table">
                <thead>
                    <tr className="row">
                        <th>Movie</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <Rows submit={submittedSearch}></Rows>
            </table>

        </>
    );
}