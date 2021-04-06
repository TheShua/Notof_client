import React, {useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from 'components/Auth/UserContext';
import apiHandler from 'api';

const Navigation = () => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const Disconnect = () => {
        setUser(null);
        apiHandler.logout().then(() => history.push('/'));
    }

    if (user) {
        return (
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/profile">Edit Profile</NavLink></li>
                    <li><span onClick={() => Disconnect}>BOBAYE</span></li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/signup">Signup</NavLink></li>
                    <li><NavLink to="/signin">Signin</NavLink></li>
                </ul>
            </nav>
        )
    }
    
}

export default Navigation;
