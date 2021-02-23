import { Switch, Route } from 'react-router-dom';
import Navigation from 'components/layout/Navigation';
import Home from 'pages/Home';
import Signup from 'pages/Signup';

const App = () => {
  return (
    <div>
        <Navigation />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
