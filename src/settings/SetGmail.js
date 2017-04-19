import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetGmail extends Component {
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
        gmail_url_hostname: ''
    };

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/gmail');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                step1_url: json.step1_url,
                step1_url_redirect: json.step1_url_redirect,
                step2_url: json.step2_url,
                gmail_url_hostname: json.gmail_url_hostname
            });
        } else {
        }
    }

    async save(e) {
        e.preventDefault();
        this.setState({saving: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/gmail', {
            method: 'POST',
            body: JSON.stringify({
                gmail_url_hostname: this.state.gmail_url_hostname
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
        //         'gmail',
        //         'toolbar=0,status=0,width=650,height=600');
        // }
        window.open(
            this.state.step1_url_redirect,
            'gmail',
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
            step2_loading: false,
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
        const handleStep1BtnClick = this.put_step1_url.bind(this);
        const handleStep2BtnClick = this.put_step2_url.bind(this);
        const handleCodeChange = (e) => this.handleChange('step2_code', e);
        const handleHostnameChange = (e) => this.handleChange('gmail_url_hostname', e);
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
                        GMail
                    </Breadcrumb.Section>
                </Breadcrumb>
                <Button floated='right' color='blue' icon='save' content='Save'
                        loading={ this.state.saving }
                        positive={ this.state.lastSaveResult === true }
                        negative={ this.state.lastSaveResult === false }
                        onClick={ handleSaveBtnClick }/>
                <Segment basic>
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
                                Please click the button below to get an access token for sending you email notifications.
                            </p>
                            <Button color='red' icon='google' content="Grant access token from GMail"
                                    onClick={handleStep1BtnClick} />
                            <p>
                                After you allowed this app the permissions, Google Accounts will display an access token.<br/>
                                Please paste that access token below.
                            </p>
                            <Input
                                action={{ color: 'yellow', labelPosition: 'left', icon: 'key',
                                    content: 'Retrieve new Access Token', onClick: handleStep2BtnClick,
                                    loading: this.state.saving,
                                    positive: this.state.lastSaveResult === true,
                                    negative: this.state.lastSaveResult === false
                                }}
                                onChange={handleCodeChange}
                                placeholder='Access Code'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Hostname of URLs in notification email</label>
                            <p>That means, if we send you email to go to <code>/trigger</code></p>
                            <Input placeholder='e.g.: http://your.domain:8080/'
                                   value={this.state.gmail_url_hostname}
                                   onChange={handleHostnameChange}/>
                        </Form.Field>
                    </Form>
                    <Message info>
                        <Message.Header>Permissions we use</Message.Header>
                        <p>
                            We only use the "<em>Send Mail</em>" permission to use the GMail account you provided, to send any notifications
                            about the PiSmartCamera to the same GMail account. <br/>
                            The permission will not allow us to read your email, and any other private data.
                        </p>
                    </Message>
                </Segment>
            </Segment>
        );
    }
}

export default SetGmail;