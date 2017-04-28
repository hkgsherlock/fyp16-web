import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Header, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetDropbox extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        capture_width: '',
        capture_height: '',
        capture_framerate: '',
        process_width: '',
        process_height: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/capture');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                capture_width: json.capture.width,
                capture_height: json.capture.height,
                capture_framerate: json.capture.frame_rate,
                process_width: json.process.width,
                process_height: json.process.height,
            });
        } else {
        }
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/set/capture', {
            method: 'POST',
            body: JSON.stringify({
                capture_width: this.state.capture_width,
                capture_height: this.state.capture_height,
                capture_frame_rate: this.state.capture_framerate,
                process_width: this.state.process_width,
                process_height: this.state.process_height,
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
        const handleCaptureWidthChange = (e) => this.handleChange('capture_width', e);
        const handleCaptureHeightChange = (e) => this.handleChange('capture_height', e);
        const handleCaptureFrameRateChange = (e) => this.handleChange('capture_framerate', e);
        const handleProcessWidthChange = (e) => this.handleChange('process_width', e);
        const handleProcessHeightChange = (e) => this.handleChange('process_height', e);
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
                        Video Capturing
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
                            Capturing
                        </Header>
                        <Form.Field>
                            <label>Width</label>
                            <Input placeholder='Width, in integer'
                                   value={this.state.capture_width}
                                   onChange={handleCaptureWidthChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Height</label>
                            <Input placeholder='Height, in integer'
                                   value={this.state.capture_height}
                                   onChange={handleCaptureHeightChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Frame Rate</label>
                            <Input placeholder='Frame rate, in integer or decimal'
                                   value={this.state.capture_framerate}
                                   onChange={handleCaptureFrameRateChange}/>
                        </Form.Field>

                        <Header as="h2">
                            Processing
                        </Header>
                        <Form.Field>
                            <label>Width</label>
                            <Input placeholder='Width, in integer'
                                   value={this.state.process_width}
                                   onChange={handleProcessWidthChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Height</label>
                            <Input placeholder='Height, in integer'
                                   value={this.state.process_height}
                                   onChange={handleProcessHeightChange}/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetDropbox;