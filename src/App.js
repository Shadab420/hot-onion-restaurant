import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import FoodMenu from './components/FoodMenu/FoodMenu';



function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>

        {/* Setting routes */}
        <Switch>
          
          <Route path="/menu">
            <FoodMenu />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <FoodMenu />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
