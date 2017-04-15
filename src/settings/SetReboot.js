import React, {Component} from 'react'
import {Breadcrumb, Button, Confirm, Form, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetReboot extends Component {
    constructor() {
        super();
        this.state = {
            confirming: false
        }
    }

    reboot() {

    }

    render() {
        const handlePromptConfirm = (e) => this.setState({confirming: !this.state.confirming});
        const handleConfirmClick = this.reboot.bind(this);

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
                    <Form>
                        <Form.Field>
                            <label>Reboot</label>
                            <p>
                                Click the following button to reboot. This process takes about 2 minutes.
                            </p>
                            <Button color='Black' icon='repeat' content="Reboot" onClick={ handlePromptConfirm } />
                            <Confirm
                                open={ this.state.confirming }
                                onConfirm={ handleConfirmClick }
                                onCancel={ handlePromptConfirm }
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetReboot;