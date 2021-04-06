import React, { useState, useContext } from 'react';
import { UserContext } from 'components/Auth/UserContext';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const ProfileEdit = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({})

    const handleSubmit = event => {
        event.preventDefault();
        console.log("SUBMIIIIIIIIIT");
    }

    const handleChange = event => {
        if(event)
        setData({ ...data, [event.target.name]: event.target.value })
        console.log(data);
    }

    if (!user) {
        return <div>euuh... t'es pas log là, nan ?</div>
    } else {
        return (
            <div>
                <h1>Changement de faciesse !</h1>
                {/* {errors && showErrors()} */}
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <div>
                        <TextField required name="username" label="Pseudonyme" defaultValue={data.username} />
                    </div>
                    <div>
                        <TextField required name="password" label="Mot de passe" type="password" autoComplete="current-password" />
                    </div>
                    <div>
                        <TextField name="password_check" label="Confirmez le siouplait" type="password" autoComplete="current-password" />
                    </div>
                    <div>
                        <TextField required name="email" label="Email" defaultValue={data.email} />
                    </div>
                    <div>Avatar : 
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input type="file" name="avatar" hidden />
                        </Button>
                    </div>
                    <Button onClick={handleSubmit}>Send !</Button>
                </form>
            </div>
        )
    }
}

export default ProfileEdit
