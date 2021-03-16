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
import {UserProp} from './models/User'

type PropTypes = {
  autoLogin: Function,
  usr: UserProp
}

function App({autoLogin, usr}:PropTypes) {
  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <div className="app">
      <Helmet>
        <title>Steam-bans</title>
        <meta name="description" content="This is a tool which allows you to track the ban status for any STEAMID and if you wish you can save it to a list. Optionally you can get notified via discord or email when the user gets banned!" />
      </Helmet>
      <Navbar/>
      <div className="pageContent"> 
        <Switch>
          <ProtectedRoute exact path="/list" isLoggedIn={usr.loggedIn} isLoading={usr.isLoading} component={UsersList}/>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch: any) =>{
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}

const mapStateToProps = (state:any) =>{
  return{
    usr: state.usr,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

