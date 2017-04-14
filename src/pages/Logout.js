import React, {Component} from 'react';
import Auth from '../services/AuthService'

class Logout extends Component {
    componentDidMount() {
        Auth.logout();
    }

    render() {
        return null;
    }
}

export default Logout;