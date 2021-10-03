import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ErrorHandler from '../Handlers/ErrorHandler.component';
import IndexLayout from '../Layout/IndexLayout.component';
import Page404 from '../Layout/Page404.component';

const Router = () => {
  return (
    <>
      <BrowserRouter>.
        <ErrorHandler>
          <Switch>
            <Route exact path="/" component={IndexLayout} />
            <Route component={Page404} />
          </Switch>
        </ErrorHandler>
      </BrowserRouter>
    </>
  )
};

export default Router;


