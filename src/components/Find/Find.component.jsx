import React, { useState,useEffect } from "react";
import './find.css'

const Find = ({ searchElementClassName }) => {

    const [count,setCount] = useState("");
    const [pattern, setPattern] = useState("");
    const [showResults, setShowResults] = React.useState(false)
    const [showContainer, setShowContainer] = React.useState(false)

    const keydownHandler = (e) => {
        if(e.keyCode===13 && e.ctrlKey) setShowContainer(true);
    };

   
    document.addEventListener('keydown',keydownHandler);

    const onClose = () => {
      cleanUp(document.querySelectorAll(searchElementClassName),0);
      setPattern("");
      setShowContainer(false);
    }

    const cleanUp = (list,resCount) => {
      for (let i = 0; i < list.length; i++) {
        let res = list[i].innerHTML
          .replace(new RegExp('<span class="text-found">', "g"), "")
          .replace(new RegExp("</span>", "g"), "");

        document.querySelectorAll(searchElementClassName)[i].innerHTML = res;
      }

      resCount = 0;
    };


    useEffect(() => {

        let list = document.querySelectorAll(searchElementClassName);
        let resCount = 0;

        const searchText = (pattern) => {

          if (!pattern){
            setShowResults(false);
            return;
          }  

          const searchValue = pattern.trim();

          for (let i = 0; i < list.length; i++) {
              
            const text = list[i].innerHTML.toLowerCase();
            const regExp = new RegExp(searchValue, "g");

            resCount += ((text || '').match(regExp) || []).length;

            let res = text.replace(
              regExp,
              `<span class="text-found">${searchValue}</span>`
            );

            document.querySelectorAll(searchElementClassName)[i].innerHTML = res;
          }

          resCount !== 0 ? setShowResults(true) : 
                          setShowResults(false);

          setCount(resCount);
        };

        searchText(pattern);
  
        return () => cleanUp(list,resCount);

      }, [pattern,searchElementClassName,cleanUp]);


    return (
       
      <div id="find-container">
        { showContainer ? 
         <div className="container">      
            <button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}></button>
               <div className="input-field col s12">
                 <input
                   placeholder="Find Term..."
                   id="query_param"
                   type="text"
                   value={pattern}
                   className="validate"
                   onChange={e => setPattern(e.target.value)}
                 />
               </div>
           
           { showResults ? <div className='resultsCount' > {count} terms found </div> : null}
           </div>
         : null                      
        }   
      </div>
    );
}


export default Find;