import './index.css';

import React from 'react';
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/App'
// import RouterContainer from './services/RouterContainer';
// import LoginActions from './actions/LoginActions';

import Login from './login/Login';
import FaceList from './face/FaceList'
import Face from './face/Face'
// import RecordList from './record/RecordList'
// import Record from './record/Record'
import Settings from './settings/Settings';
import SetPortal from './settings/SetPortal'
import SetLogin from './settings/SetLogin';
import SetDropbox from './settings/SetDropbox';
import SetGmail from './settings/SetGmail';
import SetVideoCapture from './settings/SetVideoCapture';
import SetMotionDetection from './settings/SetMotionDetection';
import SetFaceDetection from './settings/SetFaceDetection';
import SetFaceRecognition from './settings/SetFaceRecognition';
import SetVideoRecording from './settings/SetVideoRecording';
import SetDiskSpace from './settings/SetDiskSpace';
import SetReboot from './settings/SetReboot';
import Logout from './logout/Logout';
import Portal from './portal/Portal';

import NotFound from './not_found/404';

// let jwt = storage.getItem('jwt');
// console.log(jwt);
// if (jwt) {
//     LoginActions.loginUser(jwt);
// }

ReactDOM.render(
    <Router history={ browserHistory } >
        <Route path='/login' component={ Login }/>
        <Route path='/' component={ App } >
            <IndexRoute component={ Portal }/>
            <Route path="face(s)" component={ FaceList }/>
            <Route path="face/:id" component={ Face }/>
            {/*<Route path="/record(s)" component={ Records }/>*/}
            {/*<Route path="/record/:id" component={ Record }/>*/}
            <Route path="settings" component={ Settings }>
                <IndexRoute component={ SetPortal } />
                <Route path="login" component={ SetLogin }/>
                <Route path="dropbox" component={ SetDropbox }/>
                <Route path="gmail" component={ SetGmail }/>
                <Route path="capture" component={ SetVideoCapture }/>
                <Route path="motion" component={ SetMotionDetection }/>
                <Route path="face" component={ SetFaceDetection }/>
                <Route path="facerec" component={ SetFaceRecognition }/>
                <Route path="record" component={ SetVideoRecording }/>
                <Route path="diskspace" component={ SetDiskSpace }/>
                <Route path="reboot" component={ SetReboot }/>
            </Route>
            <Route path="logout" component={ Logout }/>
        </Route>
        <Route path="*" component={ NotFound }/>
    </Router>,
    document.getElementById('root')
);