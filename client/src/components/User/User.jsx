import React from 'react'

class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            rating: 0,
            age: null,
            telephone: null,
            gender: null,
            registered: null,
            numberOfTrips: 0,
            numberOfDrives: 0
        }
    }

    render(){
        return(
            <article>
                <h1>Profile</h1>

            </article>
        )
    }
}

export default User