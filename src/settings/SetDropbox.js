import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetDropbox extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        step1_url: '',
        step1_url_redirect: '',
        step2_url: '',
        step2_code: '',
        step2_loading: false,
        token: 'ranbu'
    };

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/dropbox');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                step1_url: json.step1_url,
                step1_url_redirect: json.step1_url_redirect,
                step2_url: json.step2_url,
                token: json.token
            });
        } else {
        }
    }

    async save(e) {
        e.preventDefault();
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/dropbox', {
            method: 'POST',
            body: JSON.stringify({
                token: this.state.token
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

    async put_step1_url(e) {
        e.preventDefault();
        // let result;
        // result = await fetch(this.state.step1_url);
        // let json = await result.json();
        // if (result.ok) {
        //     let ownerWindow = this.props.window || window;
        //     ownerWindow.open(
        //         json.url,
        //         'dropbox',
        //         'toolbar=0,status=0,width=650,height=600');
        // }
        window.open(
            this.state.step1_url_redirect,
            'dropbox',
            'toolbar=0,status=0,width=650,height=600');
    }

    async put_step2_url(e) {
        e.preventDefault();
        this.setState({step2_loading: true});
        let result;
        result = await fetch(this.state.step2_url, {
            method: 'POST',
            body: JSON.stringify({
                code: this.state.step2_code
            })
        });
        let json = await result.json();
        this.setState({
            step2_loading: false
        });
        if (result.ok) {
            this.setState({token: json.token})
        }
    }

    handleChange(field, e) {
        this.setState({ [field]: e.target.value })
    }

    render() {
        const handleStep1BtnClick = this.put_step1_url.bind(this);
        const handleStep2BtnClick = this.put_step2_url.bind(this);
        const handleCodeChange = (e) => this.handleChange('step2_code', e);
        const handleTokenChange = (e) => this.handleChange('token', e);
        const handleSaveBtnClick = this.save.bind(this);

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
                            <Button color='blue' icon='dropbox' content="Grant access token from Dropbox"
                                    onClick={handleStep1BtnClick} />
                            <p>
                                After you allowed this app the permissions, Dropbox will display an access token.<br/>
                                Please paste that access token below.
                            </p>
                            <Input
                                action={{ color: 'yellow', labelPosition: 'left', icon: 'key',
                                    content: 'Retrieve new Access Token', onClick: handleStep2BtnClick,
                                    loading: this.state.step2_loading
                                }}
                                onChange={handleCodeChange}
                                placeholder='Access Code'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Dropbox Access Token (OAuth2)</label>
                            <Input placeholder='Access Token' value={this.state.token}
                                   onChange={handleTokenChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Store location</label>
                            <p>Your videos will always be stored at
                                <code>
                                    /Apps/PiSmartCam
                                </code>.
                            </p>
                        </Form.Field>
                    </Form>
                    <Message info>
                        <Message.Header>Permissions we use</Message.Header>
                        <p>
                            We only grant the permission to store videos recorded into your Dropbox account whenever new
                            videos are recorded. <br/>
                            The permission also limits this app has read/write access only to files inside its folder.
                        </p>
                    </Message>
                </Segment>
            </Segment>
        );
    }
}

export default SetDropbox;