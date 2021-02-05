import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, isLoading, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if(isLoggedIn || isLoading){
            return <Component {...rest} {...props} />
        }else{
            return <Redirect to={{pathname:'/'}}/>
        }
    }
    } />
  )
}

export default ProtectedRoute;