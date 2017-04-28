import React, {Component} from 'react'
import {Breadcrumb, Button, Checkbox, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetIrFilter extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        filter_state: null
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/ir-filter');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                filter_state: json.state
            });
        } else {
        }
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/ir-filter', {
            method: 'POST',
            body: JSON.stringify({
                state: this.state.filter_state
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
        const handleSaveBtnClick = this.save.bind(this);

        const toggle = () => this.setState({filter_state: !this.state.filter_state});
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
                        IR Filter
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
                            <label>Switch on / off</label>
                            <Checkbox toggle label='Radio choice'
                                      defaultChecked={this.state.filter_state}
                                      onChange={toggle}
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetIrFilter;