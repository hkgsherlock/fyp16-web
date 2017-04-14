import './index.css';

import storage from './storage'

import React from 'react';
import ReactDOM from 'react-dom'
import Router, {Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/App'
// import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

import Login from './pages/Login';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import Portal from './pages/Home';

import NotFound from './pages/404';

// let jwt = storage.getItem('jwt');
// console.log(jwt);
// if (jwt) {
//     LoginActions.loginUser(jwt);
// }

ReactDOM.render(
    //  history={ hashHistory }
    <Router>
        <Route path='/' component={ Login }>
            {/*<IndexRoute component={ Login }/>*/}
            {/*<Route path='/login' component={Login}/>*/}
            {/*<IndexRoute component={Portal}/>*/}
            {/*<Route path="/People" component={ People }/>*/}
            {/*<Route path="/records" component={ Records }/>*/}
            {/*<Route path="/record/:id" component={ Record }/>*/}
            {/*<Route path="/settings" component={ Settings }/>*/}
            {/*<Route path="/logout" component={ Logout }/>*/}
            {/*<Route path="*" component={ NotFound }/>*/}
        </Route>
    </Router>,
    document.getElementById('root')
);