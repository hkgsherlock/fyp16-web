import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Header, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetVideoRecording extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        record_width: '',
        record_height: '',
        record_framerate: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/record');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                record_width: json.record_width,
                record_height: json.record_height,
                record_framerate: json.record_framerate
            });
        } else {
        }
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/record', {
            method: 'POST',
            body: JSON.stringify({
                record_width: this.state.record_width,
                record_height: this.state.record_height,
                record_framerate: this.state.record_framerate
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
        const handleRecordWidthChange = (e) => this.handleChange('record_width', e);
        const handleRecordHeightChange = (e) => this.handleChange('record_height', e);
        const handleRecordFrameRateChange = (e) => this.handleChange('record_framerate', e);
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
                        Video Recording
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
                        <Header as="h2">
                            Output
                        </Header>
                        <Form.Field>
                            <label>Width</label>
                            <Input placeholder='Width, in integer'
                                   value={this.state.record_width}
                                   onChange={handleRecordWidthChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Height</label>
                            <Input placeholder='Height, in integer'
                                   value={this.state.record_height}
                                   onChange={handleRecordHeightChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Frame Rate</label>
                            <Input placeholder='Frame rate, in integer or decimal'
                                   value={this.state.record_framerate}
                                   onChange={handleRecordFrameRateChange}/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetVideoRecording;