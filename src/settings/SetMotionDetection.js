import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetMotionDetection extends Component {
    state = {
        loading: false,
        saving: false,
        lastSaveResult: null,
        lastSaveReason: null,
        threshold_low: '',
        minimum_area: '',
        bounding_box_padding: '',
        frame_span: ''
    }

    componentDidMount() {
        this.reloadSet();
    }

    async reloadSet() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/motion');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                threshold_low: json.threshold_low,
                minimum_area: json.minimum_area,
                bounding_box_padding: json.bounding_box_padding,
                frame_span: json.frame_span
            });
        } else {
        }
    }

    async save() {
        this.setState({saving: true});
        let result;
        result = await fetch('http://localhost:5000/api/set/motion', {
            method: 'POST',
            body: JSON.stringify({
                threshold_low: this.state.threshold_low,
                minimum_area: this.state.minimum_area,
                bounding_box_padding: this.state.bounding_box_padding,
                frame_span: this.state.frame_span
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
        const handleThresholdLowChange = (e) => this.handleChange('threshold_low', e);
        const handleMinimumAreaChange = (e) => this.handleChange('minimum_area', e);
        const handleBoundingBoxPaddingChange = (e) => this.handleChange('bounding_box_padding', e);
        const handleFrameSpanChange = (e) => this.handleChange('frame_span', e);
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
                        Motion Detection
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
                            <label>Threshold Low</label>
                            <p>
                                The lower value for threshold, which means if the pixel difference of frame comparing
                                and frame to be compared has lower difference than this value, the pixel is meant to be
                                no change.
                            </p>
                            <Input placeholder='Grayscale color value (0-255) in integer'
                                   value={this.state.threshold_low}
                                   onChange={handleThresholdLowChange}/>
                        </Form.Field>
                        {/*<Form.Field>*/}
                        {/*<label>Threshold High</label>*/}
                        {/*<p>*/}
                        {/*The higher value for threshold, which means if the pixel difference of frame comparing*/}
                        {/*and frame to be compared has higher difference than this value, the pixel is meant to be*/}
                        {/*changed.*/}
                        {/*</p>*/}
                        {/*<Input placeholder='Grayscale color value (0-255) in integer'/>*/}
                        {/*</Form.Field>*/}
                        <Form.Field>
                            <label>Minimun Area Size</label>
                            <p>
                                Minimum size of area in pixels that the detection reports changes.
                            </p>
                            <Input placeholder='Number of pixels, in integer'
                                   value={this.state.minimum_area}
                                   onChange={handleMinimumAreaChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Bounding Box Padding</label>
                            <p>
                                Extra spaces for detected changes.
                            </p>
                            <Input placeholder='Length of pixels, in integer'
                                   value={this.state.bounding_box_padding}
                                   onChange={handleBoundingBoxPaddingChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Frame Span</label>
                            <p>
                                By how many frames earlier to select to compare with current frame.
                            </p>
                            <Input placeholder='Number of frames, in integer'
                                   value={this.state.frame_span}
                                   onChange={handleFrameSpanChange}/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetMotionDetection;