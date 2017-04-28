import React, {Component} from 'react'
import {Breadcrumb, Button, Dropdown, Form, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetFaceRecognition extends Component {
    state = {
        loading: false,
        saving: false,
        facerec_method: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/facerec');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                facerec_method: json.facerec_method
            });
        } else {
        }
        this.refs.method_dropdown.setValue(json.facerec_method);
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/facerec', {
            method: 'POST',
            body: JSON.stringify({
                facerec_method: this.state.facerec_method
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

    handleChange(field, e) {
        this.setState({[field]: e.target.value})
    }

    render() {
        const handleFaceMethodChange = (e, {value}) => this.setState({'face_method': value});
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
                                Select the method for face recognition.<br/>
                                Default is set to "Local Binary Pattern Histogram" as it provides processing disregard
                                to light/image quality, yet it also runs faster on embedded systems.
                            </p>
                            <Dropdown
                                ref="method_dropdown"
                                defaultValue={this.state.facerec_method}
                                fluid
                                selection
                                options={[
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
                                ]}
                                onChange={handleFaceMethodChange}
                            />
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetFaceRecognition;