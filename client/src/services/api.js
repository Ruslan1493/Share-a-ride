
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