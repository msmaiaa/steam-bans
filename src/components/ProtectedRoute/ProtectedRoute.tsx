import { Route, Redirect } from 'react-router-dom';


type PropTypes = {
  component: any,
  isLoggedIn: boolean,
  isLoading: boolean,
  exact: boolean,
  path: string
}

const ProtectedRoute = ({ component: Component, isLoggedIn, isLoading, ...rest }:PropTypes) => {
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