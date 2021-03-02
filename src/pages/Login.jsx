import React from 'react'
import { useHistory } from 'react-router-dom'
import apiHandler from 'api'

const Login = () => {

    const [data, setData] = React.useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data.username || data.username === '' || !data.password || data.password === '') {
            console.error("ERROR ! ERROR ! ERROR ! ERROR !");
            return;
        }

        apiHandler.login(data).then(response => {
            console.log('LOG IN OK !');
            history.path('/');
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="username">Username : <input type="text" name="username" id="username" /></label>
                <label htmlFor="password">Password : <input type="password" name="password" id="username" /></label>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login
