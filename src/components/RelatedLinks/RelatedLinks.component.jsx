import React from 'react';
import Loading from "../Loading";

const RelatedLinks = ({ relatedLinks, loading }) => {

  loading && <Loading />

  return (
    <ul className='related-list list-group mb-4'>
      {relatedLinks.map((relatedLink, index) => (
        <>
          <li key={index} className='list-group-item'>
            {relatedLink.Title}
          </li>
          <li key={index + 1} className='list-group-item'>
            <a href={relatedLink.FirstURL}>{relatedLink.FirstURL}</a>
          </li>
        </>
      ))}
    </ul>
  );
};

export default RelatedLinks;




