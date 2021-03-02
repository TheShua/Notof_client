import axios from 'axios';

const service = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true,
});

const errorHandler = (error) => {
	if (error.response.data) {
		console.log(error.response && error.response.data);
		throw error;
	}
	throw error;
};

const apiHandler = {
    service,

    signup(userInfo) { return service.post(`/users`, userInfo).then((res) => res.data).catch(errorHandler); },
    login(userInfo) { return service.get(`/auth/login`, userInfo).then((res) => res.data).catch(errorHandler); }
};

export default apiHandler;