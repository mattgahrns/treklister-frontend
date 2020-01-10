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
    return fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user: data})
    })
}

export const api = {
    auth: {
        getCurrentUser,
    },
    rails: {
        handleSignUp,
    }
}