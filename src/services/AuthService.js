import request from 'reqwest';
import when from 'when';
import {LOGIN_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

    login(username, password) {
        return this.handleAuth(when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username, password
            }
        })));
    }

    logout() {
        LoginActions.logoutUser();
    }

    handleAuth(loginPromise) {
        // debug
        LoginActions.loginUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
            "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9." +
            "TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ");
        return true;

        //noinspection UnreachableCodeJS
        return loginPromise
            .then(function (response) {
                let jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });
    }
}

export default new AuthService()
