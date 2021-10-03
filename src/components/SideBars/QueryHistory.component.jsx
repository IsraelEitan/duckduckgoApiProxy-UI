import React from 'react';
import './QueryHistory.css'

const QueryHistorySideBar = ({ queryHistorylist, setSearchTerm, saveQueries }) => {


  return (
    <div className='container side-bar shadow '>
      <h4>Queries History</h4>
      <ul className='pl-0 list-unstyled '>
        {queryHistorylist.map((item) => (
          <li style={{ cursor: 'pointer' }} key={item.id} onClick={() => setSearchTerm(item.queryParam)}>
            {item.creationDate.getHours()}:{item.creationDate.getMinutes()}:{item.creationDate.getSeconds()} - <span className='text-info' >{item.queryParam}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mb-2" aria-label="SaveQueries" onClick={() => saveQueries()}>Save Queries</button>
    </div>
  )
};

export default QueryHistorySideBar;