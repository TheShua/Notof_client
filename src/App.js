import { Switch, Route } from 'react-router-dom';
import Navigation from 'components/layout/Navigation';
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';

const App = () => {
  return (
    <div>
        <Navigation />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Login} />
        </Switch>
    </div>
  );
}

export default App;
