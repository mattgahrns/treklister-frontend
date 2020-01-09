const token = localStorage.getItem("token");
const url = "http://localhost:3001";

const headers = {
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: `Bearer ${token}`
}

const getCurrentUser = () => {
    // console.log("%cCalled API", "color:red;")
    // console.log(headers)
    return fetch(`${url}/current_user`, {
        method: "GET",
        headers
    }).then(res => res.json())
}

export const api = {
        auth: {
            getCurrentUser
        }
}