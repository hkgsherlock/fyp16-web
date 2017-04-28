import React, {Component} from 'react'
import {
    Button, Segment, Header, Message, Form, Input, Dropdown
} from "semantic-ui-react";
import {browserHistory} from "react-router";

class FaceAdd extends Component {
    state = {
        loading: false,
        id: '...',
        category: '...'
    };

    async save(e) {
        e.preventDefault();
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/face', {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.id,
                category: this.state.category
            })
        });
        let json = await result.json();
        this.setState({loading: false});
        this.setState({
            saving: false,
            lastSaveResult: result.ok
        });
        if (result.ok) {
            browserHistory.push('../face/' + this.state.id);
        } else {
            this.setState({
                lastSaveReason: json.message
            })
        }
    }

    render()
    {
        const handleSaveBtnClick = this.save.bind(this);
        const handleIdChange = (e) => this.setState({'id': e.target.value});
        const handleCategoryChange = (e, {value}) => this.setState({'category': value});

        return (
            <Segment basic>
                <Header as="h2">
                    Create new face
                </Header>
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
                            <label>ID of the person</label>
                            <Input placeholder='e.g.: alan_smithee'
                                   value={this.state.gmail_url_hostname}
                                   onChange={handleIdChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <Dropdown
                                ref="method_dropdown"
                                defaultValue="Allowed"
                                fluid
                                selection
                                options={[
                                    {
                                        text: 'Allowed',
                                        value: 'allowed'
                                    },
                                    {
                                        text: 'Confirmed',
                                        value: 'confirmed'
                                    },
                                    {
                                        text: 'Pending',
                                        value: 'pending'
                                    },
                                    {
                                        text: 'Deny',
                                        value: 'deny'
                                    },
                                    {
                                        text: 'Ignored',
                                        value: 'ignored'
                                    }
                                ]}
                                onChange={handleCategoryChange}
                            />
                        </Form.Field>
                        <Button color='blue' icon='save' content='Save'
                                loading={ this.state.saving }
                                positive={ this.state.lastSaveResult === true }
                                negative={ this.state.lastSaveResult === false }
                                onClick={ handleSaveBtnClick }/>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default FaceAdd;