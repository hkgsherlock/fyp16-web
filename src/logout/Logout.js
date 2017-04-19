import {Component} from 'react';
import storage from '../storage'
import {browserHistory} from 'react-router'

class Logout extends Component {
    componentDidMount() {
        storage.setItem('uinfo', null);
        browserHistory.push('/login');
    }

    render() {
        return null;
    }
}

export default Logout;