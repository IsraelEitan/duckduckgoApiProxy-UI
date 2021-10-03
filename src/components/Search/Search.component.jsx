import React from "react";

const Search = ({ id, onChange, setSearchTerm, term }) => {

    const onSubmit = event => {
        event.preventDefault();
        setSearchTerm(term);
    };

    return (
        <>
            <div>
                <div className="d-flex gap-2">
                    <input
                        placeholder="Search Term..."
                        id={id}
                        type="text"
                        value={term}
                        className="validate"
                        onChange={event => onChange(event.target.value)}
                    />
                    <button
                        className="btn btn-primary d-flex justify-content-center align-items-center"
                        type="submit"
                        name="action"
                        onClick={e => onSubmit(e)}
                    >
                        Search
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </>
    );
};


export default Search;
