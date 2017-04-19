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

    reboot(e) {
        e.preventDefault();
    }

    render() {
        const handlePromptConfirm = (e) => {
            e.preventDefault();
            this.setState({confirming: !this.state.confirming})
        };
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
                            <Button
                                color='Black'
                                icon='repeat'
                                content="Reboot"
                                onClick={ handlePromptConfirm }
                                disabled={this.state.confirming}
                            />
                            <Confirm
                                header='You clicked to request reboot.'
                                content='Do you really want to reboot? This action cannot be undone.'
                                confirmButton="Reboot"
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