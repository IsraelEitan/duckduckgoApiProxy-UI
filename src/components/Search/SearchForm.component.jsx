import { React, useEffect, useRef, useState } from "react";
import { variables } from "../Variables";

import Search from "./Search.component";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.component";
import { useErrorStatus } from "../Handlers/ErrorHandler.component";

const SearchForm = ({ setLinks,
  setLoading,
  setTerm,
  setSearchTerm,
  setSideBarQuery,
  searchTerm,
  searchValue }) => {

  const { setErrorStatusCode } = useErrorStatus();

  const [isPostApiCall, setIsPostApi] = useState(false);

  const prevSearchIdRef = useRef();
  const prevSearch = prevSearchIdRef.current;

  useEffect(() => {
    prevSearchIdRef.current = searchTerm;
  });

  useEffect(() => {

    //Calling API here
    const getLinks = async () => {

      setLoading(true);

      //fetch
      let result = [];

      try {
        if (isPostApiCall) {

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ queryParam: searchTerm, creationDate: (new Date()).toDateString() })
          };

          result = await fetch(variables.API_URL_BASE, requestOptions);

        } else {

          result = await fetch(`${variables.API_URL_BASE}/?queryParam=${searchTerm}`);
        }

        const data = await result.json();

        if (data.length > 0) {

          setLoading(false);
          setLinks(data);
        }

      }
      catch (err) {
        if (err > 400) {
          setErrorStatusCode(400)
        }
      };
    };

    if (searchTerm && (searchTerm !== prevSearch)) {
      setTerm(searchTerm);
      getLinks();
      setSideBarQuery(searchTerm);
    }

    searchValue = searchTerm;

  }, [searchTerm]);


  return (
    <div className="my-3">
      <div className="row">
        <form className="row">

          <div className="col-md-auto">
            <div className="mb-2">
              <label htmlFor="query_param">Search Term For Available Links</label>
            </div>
            <Search id="query_param" checked={isPostApiCall} onChange={setTerm} setSearchTerm={setSearchTerm} term={searchValue} />
          </div>

          <div className="col-md-auto">
            <div className="mb-2">
              <label htmlFor="api_call_switcher">Choose Api Request Method</label>
            </div>
            <ToggleSwitch id="api_call_switcher" checked={isPostApiCall} onChange={setIsPostApi} />
          </div>

        </form>
      </div>
    </div>
  );
};


export default SearchForm;
