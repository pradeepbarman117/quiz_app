import Cookies from "js-cookie"

const setToken = (field, token) => {
    Cookies.set(field, token)
}

const getToken = (field) => {
    return Cookies.get(field);
}

export { setToken, getToken }