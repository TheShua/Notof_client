import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from 'components/Auth/UserContext';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import apiHandler from 'api'

const Login = () => {

    const [data, setData] = React.useState({});
    const history = useHistory();
    const {setUser} = useContext(UserContext);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data.email || data.email === '' || !data.password || data.password === '') {
            console.error("ERROR ! ERROR ! ERROR ! ERROR !");
            return;
        }

        apiHandler.login(data).then(response => {
            setUser(response);
            history.push('/');
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div>
                    <TextField required name="email" label="Email" />
                </div>
                <div>
                    <TextField required name="password" label="Password" type="pasword" />
                </div>
                <Button onClick={handleSubmit} variant="contained" color="primary">Log in</Button>
            </form>
        </div>
    )
}

export default Login
