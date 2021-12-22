export function getAllRides() {
    return fetch('http://localhost:4000/api/all-rides')
        .then(res => res.json())
}

export async function getDetailedRide(id) {
    return fetch(`http://localhost:4000/api/ride-details/${id}`)
        .then(res => res.json())
}

export async function getUserInfo(cookieToken) {
    return await fetch('http://localhost:4000/user/' + cookieToken.data.id)
        .then(user => user.json())
}

export function editRideInfo(body, id) {
    return fetch(`http://localhost:4000/api/edit-ride/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
}

export function signinUser(e, isRegister) {
    return fetch(`http://localhost:4000/user/${isRegister ? 'register' : 'login'} `, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: isRegister
            ?
            JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                repeatPass: e.target.repeatPass.value
            })
            :
            JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            })
    })
        .then(data => data.json())
}


export function createARide(cityFrom, cityTo, date, carCapacity, numberOfStops, creator) {
    return fetch('http://localhost:4000/api/create-a-ride', {
        method: 'POST',
        body: JSON.stringify({
            cityFrom,
            cityTo,
            date,
            carCapacity,
            numberOfStops,
            creator
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
}