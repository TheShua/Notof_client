import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import apiHandler from 'api'
import { UserContext } from 'components/Auth/UserContext';

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
                <label htmlFor="email">Email : <input type="text" name="email" id="email" /></label>
                <label htmlFor="password">Password : <input type="password" name="password" id="password" /></label>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login
