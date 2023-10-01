import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Market from './Market';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path='/market'>
              <Market />
            </Route>
          </Switch>
    </div>
    </Router>
  );
}

export default App;
