import React, {Component} from 'react'
import {Breadcrumb, Button, Form, Input, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetMotionDetection extends Component {
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
                            <Input placeholder='Grayscale color value (0-255) in integer'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Threshold High</label>
                            <p>
                                The higher value for threshold, which means if the pixel difference of frame comparing
                                and frame to be compared has higher difference than this value, the pixel is meant to be
                                changed.
                            </p>
                            <Input placeholder='Grayscale color value (0-255) in integer'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Minimun Area Size</label>
                            <p>
                                Minimum size of area in pixels that the detection reports changes.
                            </p>
                            <Input placeholder='Frame rate, in integer or decimal'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Bounding Box Padding</label>
                            <p>
                                Extra spaces for detected changes.
                            </p>
                            <Input placeholder='Width, in integer'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Frame Span</label>
                            <p>
                                By how many frames earlier to select to compare with current frame.
                            </p>
                            <Input placeholder='Height, in integer'/>
                        </Form.Field>
                    </Form>
                </Segment>
            </Segment>
        );
    }
}

export default SetMotionDetection;