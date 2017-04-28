import React, {Component} from 'react'
import {Breadcrumb, Button, Dropdown, Form, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetFaceDetection extends Component {
    state = {
        loading: false,
        saving: false,
        face_method: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/face');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                face_method: json.face_method
            });
        } else {
        }
        this.refs.method_dropdown.setValue(json.face_method);
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/face', {
            method: 'POST',
            body: JSON.stringify({
                face_method: this.state.face_method
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
                        Face Detection
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
                                Select the method for face detection. <br/>
                                Default set to use "DLib HOG" one as it provides a more accurate result.
                            </p>
                            <Dropdown
                                ref="method_dropdown"
                                defaultValue={this.state.face_method}
                                placeholder='Select Method'
                                fluid
                                selection
                                options={[
                                    {
                                        text: 'OpenCV Haar Cascading',
                                        key: 'FaceCascadingOpencvHaar',
                                        value: 'FaceCascadingOpencvHaar'
                                    },
                                    {
                                        text: 'OpenCV Local Binary Pattern Cascading',
                                        key: 'FaceCascadingOpencvLbp',
                                        value: 'FaceCascadingOpencvLbp'
                                    },
                                    {
                                        text: 'DLib HOG Face Cascading',
                                        key: 'FaceCascadingDlib',
                                        value: 'FaceCascadingDlib'
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

export default SetFaceDetection;