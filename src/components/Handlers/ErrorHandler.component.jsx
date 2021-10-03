import { React, useEffect, createContext, useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Page404 from '../Layout/Page404.component';

const ErrorStatusContext = createContext();

const ErrorHandler = ({ children }) => {
    const history = useHistory();
    const [errorStatusCode, setErrorStatusCode] = useState();


    useEffect(() => {

        const unlisten = history.listen(() => setErrorStatusCode(undefined));

        return unlisten;
    }, [])


    const renderContent = () => {
        if (errorStatusCode === 404) {
            return <Page404 />
        }

        // ... more HTTP codes handled here
        return children;
    }

    const contextPayload = useMemo(
        () => ({ setErrorStatusCode }),
        [setErrorStatusCode]
    );

    return (
        <ErrorStatusContext.Provider value={contextPayload}>
            {renderContent()}
        </ErrorStatusContext.Provider>
    )
}

export const useErrorStatus = () => useContext(ErrorStatusContext);

export default ErrorHandler