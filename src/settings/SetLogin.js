import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetLogin extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        uname: '',
        pwd: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/login');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                uname: json.uname,
                pwd: json.pwd
            });
        } else {
        }
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/login', {
            method: 'POST',
            body: JSON.stringify({
                uname: this.state.uname,
                pwd: this.state.pwd
            })
        });
        let json = await result.json();
        this.setState({
            saving: false,
            lastSaveResult: result.ok
        });
        if (!result.ok) {
            this.setState({
                lastSaveReason: json.message
            })
        }
    }

    handleChange(field, e) {
        this.setState({ [field]: e.target.value })
    }

    render() {
        const handleSaveBtnClick = this.save.bind(this);

        const handleOnUsernameChange = (e) => this.handleChange('uname', e);
        const handleOnPasswordChange = (e) => this.handleChange('uname', e);
        return (
            <Segment basic loading={this.state.loading}>
                <Breadcrumb size='big'>
                    <Breadcrumb.Section>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section >
                        Basics
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section active>
                        Login Credentials
                    </Breadcrumb.Section>
                </Breadcrumb>
                <Button floated='right' color='blue' icon='save' content='Save'
                        loading={ this.state.saving }
                        positive={ this.state.lastSaveResult === true }
                        negative={ this.state.lastSaveResult === false }
                        onClick={ handleSaveBtnClick }/>
                <Segment basic loading={ this.state.saving }>
                    { this.state.lastSaveResult === true &&
                    <Message positive>
                        <Message.Header>Settings saved</Message.Header>
                    </Message>
                    }
                    { this.state.lastSaveResult === false &&
                    <Message positive>
                        <Message.Header>Failed to save settings</Message.Header>
                        { this.state.lastSaveReason }
                    </Message>
                    }

                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <Input placeholder='Username' value={ this.state.uname } onChange={ handleOnUsernameChange } />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input placeholder='Password' value={ this.state.pwd } onChange={ handleOnPasswordChange }/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetLogin;