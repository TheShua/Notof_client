import React, { useState, useEffect, useContext } from 'react';
import apiHandler from 'api/apiHandler';
import UserContext from './UserContext';

const UserProvider = ({children}) => {
    const [user, setUser] = useContext(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiHandler.isLoggedIn().then((data) => {
            setUser(data);
            setIsLoggedIn(true);
            setIsLoading(false);
        }).catch((error) => {
            setUser(null);
            setIsLoggedIn(false);
            setIsLoading(false);
        })
    }, []);

    const authValues = {
        user,
        setUser,
        isLoggedIn,
        isLoading
    }

    return <UserContext.Provider value={authValues}>{children}</UserContext.Provider>;
}

export default UserProvider;