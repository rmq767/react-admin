import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const provideRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (
        false ? <Component {...routeProps} /> : <Redirect to="/" />
      )}
    />
  );
}

export default provideRouter
