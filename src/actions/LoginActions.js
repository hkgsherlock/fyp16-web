import storage from '../storage'

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
    loginUser: (jwt) => {
        let savedJwt = storage.getItem('jwt');

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt: jwt
        });

        if (savedJwt !== jwt) {
            let nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

            RouterContainer.get().transitionTo(nextPath);
            storage.setItem('jwt', jwt);
        }
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        storage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}
