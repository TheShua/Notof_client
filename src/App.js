import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from 'components/Auth/UserContext';
import Navigation from 'components/layout/Navigation';

// Pages
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import ProfileEdit from 'pages/ProfileEdit';

// Api
import apiHandler from 'api';

const App = () => {
    const [user, setUser] = useState(null);
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    
    useEffect(() => {
        apiHandler.isLoggedIn().then(userLogged => setUser(userLogged)).catch(error => console.log(error));
    }, []);

    return (
        <div>
            <UserContext.Provider value={providerValue}> 
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile" component={ProfileEdit} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/signin" component={Login} />
                </Switch>
            </UserContext.Provider>
        </div>
    );
}

export default App;
