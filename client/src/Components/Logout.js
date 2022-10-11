import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

export class Logout extends Component {
    constructor(props){
        super(props);
        // token remove...
        localStorage.removeItem('token')
    }
    render() {
        return <Redirect to="/login" />
    }
}

export default Logout
