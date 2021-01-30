import {connect} from 'react-redux';
import {autoLogin} from './store/actions/user';
import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import UsersList from './Pages/UsersList/UsersList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App(props) {
  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <Router>
      <div>
        <Navbar/>
        <div className="pageContent"> 
          <Switch>
            <Route path="/list">
              <UsersList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


const mapDispatchToProps = (dispatch) =>{
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(null, mapDispatchToProps)(App);

