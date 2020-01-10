const token = localStorage.getItem("token");
const url = "http://localhost:3001";

const headers = {
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: `Bearer ${token}`
}

const getCurrentUser = () => {
    return fetch(`${url}/current_user`, {
        method: "GET",
        headers
    }).then(res => res.json())
}

const handleSignUp = (data) => {
    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user: data})
    })
}

const handleLogin = (data) => {
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user: data})
    })
}

const newTrip = (data, userData) => {
    return fetch(`${url}/users/${userData.id}/new/trip`,{
        method: 'POST',
        headers,
        body: JSON.stringify({trip: data})
    })
}

export const api = {
    auth: {
        getCurrentUser,
        handleLogin,
    },
    rails: {
        handleSignUp,
        newTrip,
    }
}