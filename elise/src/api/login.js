import axios from './http'

export function login (loginForm) {
    let params = {
        username: loginForm.username.trim(),
        password: loginForm.password
    }
    return axios.get('/user/login', {params})
}

export function loginOut (token) {
    let params = {
        token: token
    }
    return axios.get('/user/logout', {params})
}

export function getInfo (token) {
    let params = {
        token: token
    }
    return axios.get('/user/shopType', {params})
}
