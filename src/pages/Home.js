import React, {Component} from 'react';

class Portal extends Component {
    render() {
        return (<h1>Hello {this.props.user ? this.props.user.username : ''}</h1>);
    }
}

export default Portal;