import React, {Component} from 'react';
import {Form, Input, Button} from 'semantic-ui-react';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        };
    }
    //
    // login(e) {
    //     e.preventDefault();
    //     // Auth.login(this.state.user, this.state.password)
    //     //     .catch(function (err) {
    //     //         alert("There's an error logging in");
    //     //         console.log("Error logging in", err);
    //     //     });
    // }
    //
    handleChange(field, e) {
        this.setState({ [field]: e.target.value })
    }

    render() {
        console.log("login");
        // const handleSubmit = this.login.bind(this);
        const handleUsernameChange = this.handleChange.bind(this, 'username');
        const handlePasswordChange = this.handleChange.bind(this, 'password');
        return (
            <Form>
                <Form.Field>
                    <Input type="text" placeholder="Username" name="username" value={this.state.user } onChange={ handleUsernameChange } />
                </Form.Field>
                <Form.Field>
                    <Input type="password" placeholder="Password" name="password" value={this.state.password } onChange={ handlePasswordChange } />
                </Form.Field>
                <Form.Field>
                    <br/>
                    <Button inverted color="blue">Login</Button>
                </Form.Field>
            </Form>
        );
    }
}

export default Login;