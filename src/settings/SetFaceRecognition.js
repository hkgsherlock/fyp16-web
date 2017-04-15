import React, {Component} from 'react'
import {Breadcrumb, Button, Dropdown, Form, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetFaceRecognition extends Component {
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
                        Detection/Recognition
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section active>
                        Face Recognition
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
                            <label>Method</label>
                            <p>
                                Select the method
                            </p>
                            <Dropdown defaultValue="createLBPHFaceRecognizer" fluid selection options={[
                                {
                                    text: 'Eigen-Face',
                                    value: 'createEigenFaceRecognizer'
                                },
                                {
                                    text: 'OpenCV Local Binary Pattern Cascading',
                                    value: 'createFisherFaceRecognizer'
                                },
                                {
                                    text: 'Local Binary Pattern Histogram',
                                    value: 'createLBPHFaceRecognizer'
                                }
                            ]} />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetFaceRecognition;