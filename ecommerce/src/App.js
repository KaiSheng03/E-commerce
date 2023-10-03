import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Market from './Market';

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
      </Switch>
    </Router>
  );
}

export default App;
