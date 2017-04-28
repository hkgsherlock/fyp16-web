import React, {Component} from 'react'
import {Breadcrumb, Button, Confirm, Form, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetResetBuzzer extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            lastSaveResult: null,
            lastSaveReason: null
        }
    }

    async reset(e) {
        e.preventDefault();
        let result;
        result = await fetch('http://pismartcam.local:5000/api/trigger/alarm', {
            method: 'POST',
            body: JSON.stringify({
                buzzing: false
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

    render() {
        const handlePromptResetConfirm = (e) => this.reset.bind(e);

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
                        System
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section active>
                        Buzzer
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
                            <label>Reset Buzzer</label>
                            <p>
                                Click the following button to reset buzzer.
                            </p>
                            <Button
                                color='yellow'
                                icon='repeat'
                                content="Reset"
                                onClick={ handlePromptResetConfirm }
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetResetBuzzer;