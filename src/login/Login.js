import React, {Component} from 'react';
import {Form, Input, Button, Segment, Header, Icon, Grid} from 'semantic-ui-react';
import './Login.css'
import {Flex} from 'react-layout-components'
import { browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title'
import storage from '../storage'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            uname: '',
            password: '',
            waiting: false,
            result: null
        };
    }

    async login(e) {
        e.preventDefault();
        this.setState({waiting: true});
        let result;
        result = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                uname: this.state.uname,
                pwd: this.state.password,
            }),
        });
        let json = await result.json();
        this.setState({waiting: false});
        if (result.ok) {
            this.setState({result: true});
            storage.setItem('uinfo', json.jwt);
            browserHistory.push('/');
        } else {
            this.setState({result: false});
        }
    }

    handleChange(field, e) {
        this.setState({ [field]: e.target.value })
    }

    render() {
        const handleSubmit = this.login.bind(this);
        const handleUnameChange = this.handleChange.bind(this, 'uname');
        const handlePasswordChange = this.handleChange.bind(this, 'password');
        return (
            <DocumentTitle title="Login">
                <Flex center height="100vh">
                    <Segment>
                        <Grid centered padded divided="vertically">
                            <Grid.Row textalign="center">
                                <Header as='h1' icon textalign="center">
                                    <Icon name='video camera' />
                                    <Header.Content>
                                        PiSmartCamera
                                        <Header.Subheader>
                                            Web Admin Panel
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Row>
                            <Grid.Row textalign="center">
                                <Form textalign="center" onSubmit={ handleSubmit }
                                      success={ this.state.result === true }>
                                    <Form.Field required>
                                        <Input size="large" type="text" placeholder="Username" name="uname"
                                               icon='user' iconPosition='left'
                                               disabled={ this.state.waiting || this.state.result === true }
                                               error={ this.state.result === false }
                                               value={ this.state.uname } onChange={ handleUnameChange } />
                                    </Form.Field>
                                    <Form.Field required>
                                        <Input size="large" type="password" placeholder="Password" name="pwd"
                                               icon='key' iconPosition='left'
                                               disabled={ this.state.waiting || this.state.result === true }
                                               error={ this.state.result === false }
                                               value={ this.state.password } onChange={ handlePasswordChange } />
                                    </Form.Field>
                                    <Form.Field>
                                        <br/>
                                        <Button size="large" fluid inverted
                                                color='blue'
                                                positive={ this.state.result === true }
                                                negative={ this.state.result === false }
                                                loading={ this.state.waiting }>
                                            Login
                                        </Button>
                                    </Form.Field>
                                </Form>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Flex>
            </DocumentTitle>
        );
    }
}

export default Login;