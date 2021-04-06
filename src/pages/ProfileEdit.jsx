import React, { useState, useContext } from 'react';
import { UserContext } from 'components/Auth/UserContext';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import apiHandler from 'api'

const ProfileEdit = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({})

    const handleSubmit = event => {
        event.preventDefault();
        console.log('Start FormData...')
        console.log(data);
        let formData = new FormData();
        if (data.username) formData.append('username', data.username);
        if (data.email) formData.append('email', data.email);
        if (data.avatar) formData.append('avatar', data.avatar);
        apiHandler.editProfile(user._id, formData).then(result => {
            console.log("Notification : saved");
        }).catch(e => console.log(e));
    }

    const handleChange = event => {
		const value =
			event.target.type === 'file'
				? event.target.files[0]
				: event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
        
        setData({ ...data, [event.target.name]: value })
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
                        <TextField required name="username" label="Pseudonyme" defaultValue={user.username} />
                    </div>
                    <div>
                        <TextField required name="email" label="Email" defaultValue={user.email} />
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
                    <Button onClick={handleSubmit} variant="contained" color="primary">Send !</Button>
                </form>
            </div>
        )
    }
}

export default ProfileEdit
