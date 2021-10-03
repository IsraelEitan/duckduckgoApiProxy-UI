import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { variables } from "../Variables";

import RelatedLinks from "../RelatedLinks/RelatedLinks.component";
import Pagination from '../Pagination/Pagination.component';
import QueryHistorySideBar from "../SideBars/QueryHistory.component";
import Find from "../Find/Find.component"
import SearchForm from "../Search/SearchForm.component";
import Popup from "../Popup/Popup.component";

function MainLayout() {

    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const [term, setTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [linksPerPage] = useState(variables.LINKS_PER_PAGE);
    const [relatedLinks, setLinks] = useState([]);
    const [queryHistorylist, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get current relatedLinks
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentLinks = relatedLinks.slice(indexOfFirstLink, indexOfLastLink);

    // Popup toggle
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //setting side bar data
    const setSideBarQuery = (searchTerm) => {
        const date = new Date();
        const newList = queryHistorylist.concat({ queryParam: searchTerm, id: uuidv4(), creationDate: date });
        setList(newList);
    }

    const saveQueries = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queryHistorylist)
        };

        await fetch(`${variables.API_URL_BASE}/UpdateQueryHistory`, requestOptions);
    }


    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`${variables.API_URL_BASE}/GetQueriesHistory`);
            const rawData = await result.json();
            const newData = rawData.map(queryHistoryEntery => {

                return { queryParam: queryHistoryEntery.queryParam, id: uuidv4(), creationDate: new Date(queryHistoryEntery.creationDate) };
            })

            if (newData.length > 0) {
                setList(newData);
            }
        }

        fetchData();

    }, []);

    return (
        <>


            <div className="row">

                <div className=" col-md-auto">
                    {queryHistorylist.length > 0 &&
                        <QueryHistorySideBar
                            queryHistorylist={queryHistorylist}
                            setSearchTerm={setSearchTerm}
                            saveQueries={saveQueries}
                        />}
                </div>
                <div className="col">
                    <h2 className='text-primary mb-3'>DuckDuckGo API Proxy</h2>

                    <SearchForm
                        setLinks={setLinks}
                        setLoading={setLoading}
                        setTerm={setTerm}
                        setSearchTerm={setSearchTerm}
                        setSideBarQuery={setSideBarQuery}
                        searchTerm={searchTerm}
                        searchValue={term}
                    />

                    <RelatedLinks
                        relatedLinks={currentLinks}
                        loading={loading} />

                    <Pagination
                        linksPerPage={linksPerPage}
                        totalLinks={relatedLinks.length}
                        paginate={paginate}
                    />
                </div>
            </div>

            {isPopupOpen && <Popup
                content={<>
                    <b>Welcome to DuckDuckGo API Proxy</b>
                    <p></p>
                    <p>Please choose an api method ( Get , Post ) from the selector and search a term to get the relevent information.</p>
                    <p style={{ color: 'red' }}>*Pressing Ctrl + Enter key will open a side search box on the top right corner</p>
                </>}
                handleClose={togglePopup}
            />}
            <Find
                searchElementClassName={'.related-list .list-group-item a'}
            />
        </>
    );
}

export default MainLayout;