import {connect} from 'react-redux';
import {autoLogin} from './store/actions/user';
import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import UsersList from './Pages/UsersList/UsersList';
import {Switch, Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {Helmet} from 'react-helmet'

function App(props) {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <div className="app">
      <Helmet>
        <title>Steam-bans</title>
        <meta name="description" content="This is a tool which allows you to track the ban status for any STEAMID and if you wish you can save it to a list. Optionally you can get notified via discord or email when the user gets banned!" />
        <meta name="google-site-verification" content="MiJvGxvf8uGZzFjT2rgNXJSPGaPBZbzcE80vLpT2e-w" />
      </Helmet>
      <Navbar/>
      <div className="pageContent"> 
        <Switch>
          <ProtectedRoute exact path="/list" isLoggedIn={props.usr.loggedIn} isLoading={props.usr.isLoading} component={UsersList}/>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch) =>{
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}

const mapStateToProps = state =>{
  return{
    usr: state.usr,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

