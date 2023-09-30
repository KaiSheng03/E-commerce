import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Base from './Base';

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path='/'>
            <Base />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
