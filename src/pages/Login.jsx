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
        if (!data.email || data.email === '' || !data.password || data.password === '') {
            console.error("ERROR ! ERROR ! ERROR ! ERROR !");
            return;
        }

        apiHandler.login(data).then(response => {
            console.log('LOG IN OK !');
            history.push('/');
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="email">Email : <input type="text" name="email" id="email" /></label>
                <label htmlFor="password">Password : <input type="password" name="password" id="email" /></label>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login
