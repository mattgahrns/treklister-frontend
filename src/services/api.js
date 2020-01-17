const URL = "http://localhost:3001";

const token = () => localStorage.getItem('token');

const headers = () => ({
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: `Bearer ${token()}`
})

const getCurrentUser = () => {
    return fetch(`${URL}/current_user`, {
        method: "GET",
        headers: headers()
    }).then(res => res.json())
}

const handleSignUp = (data) => {
    return fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user: data})
    })
}

const handleLogin = (data) => {
    return fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user: data})
    })
}

const newTrip = (data, userData) => {
    return fetch(`${URL}/users/${userData.id}/new/trip`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({trip: data})
    })
}

const fetchTrips = (userData) => {
    return fetch(`${URL}/users/${userData.id}/trips`, {
        method: 'GET',
        headers: headers()
    });
}

const fetchTrip = (tripID) => {
    return fetch(`${URL}/trip/${tripID}`, {
        method: 'GET',
        headers: headers()
    });
}

const fetchLists = (tripID) => {
    return fetch(`${URL}/trip/${tripID}/lists`, {
        method: 'GET',
        headers: headers()
    });
}

const newListItem = (listID, data) => {
    return fetch(`${URL}/list/${listID}/new/item`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({list_item: data})
    });
}

const deleteListItem = (itemID) => {
    return fetch(`${URL}/item/${itemID}/delete`, {
        method: 'DELETE',
        headers: headers()
    });
}

const getListItem = (itemID) => {
    return fetch(`${URL}/item/${itemID}`, {
        method: 'GET',
        headers: headers()
    });
}

const updateListItem = (itemID, item) => {
    return fetch(`${URL}/item/${itemID}/edit`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({list_item: item})
    });
}

const checkListItem = (itemID) => {
    return fetch(`${URL}/item/${itemID}/check`, {
        method: 'PUT',
        headers: headers()
    });
}

const uncheckAllItems = (listID) => {
    return fetch(`${URL}/list/${listID}/uncheck/all`, {
        method: 'PUT',
        headers: headers()
    });
}

const deleteUser = (userID) => {
    return fetch(`${URL}/users/${userID}/delete`, {
        method: 'DELETE',
        headers: headers()
    });
}

const handleAccountEdit = (data, userID) => {
    return fetch(`${URL}/users/${userID}/edit`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data)
    });
}

const handlePasswordChange = (data, userID) => {
    return fetch(`${URL}/users/${userID}/change/password`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({user: data})
    });
}

const deleteTrip = (tripID) => {
    return fetch(`${URL}/trips/${tripID}/delete`, {
        method: 'DELETE',
        headers: headers()
    });
}

const editTrip = (data, tripID) => {
    return fetch(`${URL}/trips/${tripID}/edit`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({trip: data})
    });
}

export const api = {
    auth: {
        getCurrentUser,
        handleLogin,
        handleSignUp,
    },
    requests: {
        newTrip,
        fetchTrips,
        fetchTrip,
        fetchLists,
        newListItem,
        deleteListItem,
        getListItem,
        updateListItem,
        checkListItem,
        uncheckAllItems,
        deleteUser,
        handleAccountEdit,
        handlePasswordChange,
        deleteTrip,
        editTrip,
    }
}