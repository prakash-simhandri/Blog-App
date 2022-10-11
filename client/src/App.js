import React from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Logout from './Components/Logout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/logout" component={Logout}/>
          <Redirect to="/login"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
