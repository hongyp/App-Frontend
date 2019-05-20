// import config from 'config'
import axios from '../axios/axios-app'

export const userService = {
    login,
    logout,
    register
}

function login(email, password) {
    // console.log(JSON.stringify({email, password}))
    return axios.post('/login', JSON.stringify({email, password}))
                // .then(handleResponse)
                .then(user => {
                    // console.log(user)
                    localStorage.setItem('user', JSON.stringify(user));
                })
                .catch(error => {
                    console.log(error)
                    handleResponse(error)
                })
}

function logout() {
    localStorage.removeItem('user')
}

function register(user) {
    // const requestOptions = {
    //     method: 'POST',
    //     header: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify(user)
    // }
    console.log(JSON.stringify(user))
    return axios.post('/signup', JSON.stringify(user))
                .then(response => {
                    console.log("Registration successfully")
                })
                .catch(error => {
                    handleResponse(error)
                })
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returened from api
                logout();
                window.location.reload(true);
            }
            // Conflict: 409

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
