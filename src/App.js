import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import UsersList from './Pages/UsersList/UsersList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
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

export default App;
