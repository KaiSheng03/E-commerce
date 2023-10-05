import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Market from './Market';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/market'>
          <Market />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
