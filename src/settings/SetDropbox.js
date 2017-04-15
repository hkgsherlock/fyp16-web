import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetDropbox extends Component {
    constructor() {
        super();
        this.state = {
            saving: false,
            lastSaveResult: null,
            lastSaveReason: null
        }
    }

    save() {
        this.setState({
            saving: true,
            lastSaveResult: null,
            lastSaveReason: null
        });

        setTimeout(() => {
            this.setState({
                saving: false,
                lastSaveResult: true
            })
        }, 3000);
    }

    render() {
        const handleSaveBtnClick = this.save.bind(this);

        return (
            <Segment basic>
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
                        Dropbox
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
                            <label>Grant Permission</label>
                            <p>
                                Please click the button below to get an access token for file save.
                            </p>
                            <Button color='blue' icon='dropbox' content="Grant access token from Dropbox" />
                            <p>
                                After you allowed this app the permissions, Dropbox will display an access token.<br/>
                                Please paste that access token below.
                            </p>
                            <Input
                                action={{ color: 'yellow', labelPosition: 'left', icon: 'key', content: 'Retrieve new Access Token' }}
                                actionPosition='right' placeholder='Access Code'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Dropbox Access Token (OAuth2)</label>
                            <Input placeholder='Access Token'/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetDropbox;