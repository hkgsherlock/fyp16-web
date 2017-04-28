import React, {Component} from 'react'
import {Breadcrumb, Button, Confirm, Form, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetReboot extends Component {
    constructor() {
        super();
        this.state = {
            lastSaveResult: null,
            lastSaveReason: null,
            confirming_reinit: false,
            confirming_reboot: false
        }
    }

    async reinit(e) {
        e.preventDefault();
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/reinit', {
            method: 'POST'
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

    async reboot(e) {
        e.preventDefault();
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/reset', {
            method: 'POST'
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

    render() {
        const handlePromptReinitConfirm = (e) => {
            e.preventDefault();
            this.setState({confirming_reinit: !this.state.confirming_reinit})
        };
        const handlePromptRebootConfirm = (e) => {
            e.preventDefault();
            this.setState({confirming_reboot: !this.state.confirming_reboot})
        };
        const handleConfirmReinitClick = this.reinit.bind(this);
        const handleConfirmRebootClick = this.reboot.bind(this);

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
                        System
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section active>
                        Reboot
                    </Breadcrumb.Section>
                </Breadcrumb>
                <Segment basic loading={ this.state.saving }>
                    { this.state.lastSaveResult === true &&
                    <Message positive>
                        <Message.Header>Operation committed</Message.Header>
                    </Message>
                    }
                    { this.state.lastSaveResult === false &&
                    <Message positive>
                        <Message.Header>Failed to run</Message.Header>
                        { this.state.lastSaveReason }
                    </Message>
                    }

                    <Form>
                        <Form.Field>
                            <label>Re-initialise</label>
                            <p>
                                Click the following button to re-initialise the service. This process takes about 30 seconds.
                            </p>
                            <Button
                                color='olive'
                                icon='repeat'
                                content="Re-initialise"
                                onClick={ handlePromptReinitConfirm }
                                disabled={this.state.confirming_reinit}
                            />
                            <Confirm
                                header='You clicked to request for re-initialisation.'
                                content='Do you really want to re-initialise the system? This action cannot be undone.'
                                confirmButton="Reboot"
                                open={ this.state.confirming_reinit }
                                onConfirm={ handleConfirmReinitClick }
                                onCancel={ handlePromptReinitConfirm }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Reboot</label>
                            <p>
                                Click the following button to reboot. This process takes about 2 minutes.
                            </p>
                            <Button
                                color='black'
                                icon='repeat'
                                content="Reboot"
                                onClick={ handlePromptRebootConfirm }
                                disabled={this.state.confirming_reboot}
                            />
                            <Confirm
                                header='You clicked to request reboot.'
                                content='Do you really want to reboot? This action cannot be undone.'
                                confirmButton="Reboot"
                                open={ this.state.confirming_reboot }
                                onConfirm={ handleConfirmRebootClick }
                                onCancel={ handlePromptRebootConfirm }
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetReboot;