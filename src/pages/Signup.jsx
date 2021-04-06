import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import apiHandler from 'api';
import TextField from '@material-ui/core/TextField';

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
        if (data.password !== data.password_check) {
            errors.push({ field: ['password', 'password_check'], option: 'none', message: 'Les deux mots de passe ne correspondent pas :(' });
        }
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(String(data.email).toLowerCase())) {
            errors.push({field: 'email', option: 'none', message: 'Votre adresse mail n\'est pas valide...' })
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
            console.log(data);
            setErrors([]);
            apiHandler.signup(data).then(() => {
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
                <div>
                    <TextField required name="username" label="Pseudonyme" />
                </div>
                <div>
                    <TextField required name="password" label="Mot de passe" type="password" autoComplete="current-password" />
                </div>
                <div>
                    <TextField name="password_check" label="Confirmez le siouplait" type="password" autoComplete="current-password" />
                </div>
                <div>
                    <TextField required name="email" label="Email" />
                </div>
                <Button onClick={handleSubmit}>Send !</Button>
            </form>
        </div>
    )
}

export default Signup
