import {connect} from 'react-redux';
import {autoLogin} from './store/actions/user';
import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import UsersList from './Pages/UsersList/UsersList';
import {Switch, Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App(props) {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <div className="app">
      <Navbar/>
      <div className="pageContent"> 
        <Switch>
          <ProtectedRoute exact path="/list" isLoggedIn={props.usr.loggedIn} component={UsersList}/>
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
    usr: state.usr
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

