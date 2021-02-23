import React from 'react';
import { useHistory } from 'react-router-dom';
import apiHandler from 'api';

const Signup = () => {
    const [data, setData] = React.useState();
    const [errors, setErrors] = React.useState();
    const history = useHistory();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = [];
        if (data.password !== data.confirm) {
            errors.push({ field: ['password', 'confirm'], option: 'none', message: 'Les deux mots de passe ne correspondent pas :(' });
        }
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(String(data.email).toLowerCase())) {
            errors.push({field: 'mail', option: 'none', message: 'Votre adresse mail n\'est pas valide...' })
        }
        if (data.password === '' || data.password === null) {
            errors.push({ field: 'password', option: 'empty', message: 'Mot de passe' });
        }
        if (data.username === '' || data.username === null) {
            errors.push({ field: 'username', option: 'empty', message: 'Pseudonyme' });
        }
        if (data.email === '' || data.email === null) {
            errors.push({ field: 'email', option: 'empty', message: 'Email' });
        }
        if (errors.length > 0) {
            setErrors(errors);
            return;
        } else {
            setErrors([]);
            apiHandler.signup(data).then(result => {
                history.push('/');
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const showErrors = () => {
        let emptyFields = errors.filter(x => x.option === "empty");

        return (
            <ul>
                {errors.map((x, i) => {
                    if (x.option !== 'empty') {
                        return <li key={i}>{x.message}</li>
                    } else {
                        return null;
                    }
                })}
                {emptyFields.length > 0 && <li>Les champs suivants sont obligatoire :
                    <ul>
                        {
                            errors.map((err, i) => {
                                if (err.option === 'empty') {
                                    return <li key={i}>{err.message}</li>
                                } else {
                                    return null;
                                }
                            })
                        }
                    </ul>
                </li>}
            </ul>
        )
    }

    return (
        <div>
            <h1>Sign up !</h1>
            {errors && showErrors()}
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="username">Pseudonyme : <input type="text" name="username" id="username" /></label>
                <label htmlFor="email">Email : <input type="text" name="email" id="email" /></label>
                <label htmlFor="password">Password : <input type="password" name="password" id="password" /></label>
                <label htmlFor="confirm">Confirm : <input type="password" name="confirm" id="confirm" /></label>
                <button>Send !</button>
            </form>
        </div>
    )
}

export default Signup
