/*
<Menu.Item name='records'>
<Link to="/records">Records</Link>
</Menu.Item>
 */

import React, {Component} from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent'
import {Grid, Header, Menu, Segment} from "semantic-ui-react";

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            activeItem: 'login'
        };
    }

    onLeave() {

    }

    render() {
        const { activeItem } = this.state || {};
        const handleItemClick = (e, { name }) => this.setState({ activeItem: name });

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu vertical>
                        <Menu.Item>
                            <Menu.Header>Basics</Menu.Header>
                            <Menu.Menu>
                                <Menu.Item name='login' active={activeItem === 'login'} onClick={handleItemClick} >
                                    Login Credentials
                                </Menu.Item>
                                <Menu.Item name='dropbox' active={activeItem === 'dropbox'} onClick={handleItemClick} />
                                <Menu.Item name='gmail' active={activeItem === 'gmail'} onClick={handleItemClick} />
                            </Menu.Menu>
                        </Menu.Item>

                        <Menu.Item>
                            <Menu.Header>Detection/Recognition</Menu.Header>
                            <Menu.Menu>
                                <Menu.Item name='capture' active={activeItem === 'capture'} onClick={handleItemClick} >
                                    Video Capturing
                                </Menu.Item>
                                <Menu.Item name='motion' active={activeItem === 'motion'} onClick={handleItemClick} />
                                <Menu.Item name='face' active={activeItem === 'face'} onClick={handleItemClick} />
                                <Menu.Item name='facerec' active={activeItem === 'facerec'} onClick={handleItemClick} >
                                    Face Recognition
                                </Menu.Item>
                                <Menu.Item name='record' active={activeItem === 'record'} onClick={handleItemClick} >
                                    Video Recording
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu.Item>

                        <Menu.Item>
                            <Menu.Header>System</Menu.Header>
                            <Menu.Menu>
                                <Menu.Item name='diskspace' active={activeItem === 'diskspace'} onClick={handleItemClick} >
                                    Disk Space
                                </Menu.Item>
                                <Menu.Item name='datetime' active={activeItem === 'datetime'} onClick={handleItemClick} >
                                    Date/Time
                                </Menu.Item>
                                <Menu.Item name='reboot' active={activeItem === 'reboot'} onClick={handleItemClick} />
                            </Menu.Menu>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    { this.state.activeItem === 'login' &&
                    <Segment>
                        <Header as='h1'>Web UI Login Credentials</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'dropbox' &&
                    <Segment>
                        <Header as='h1'>Dropbox Integration</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'gmail' &&
                    <Segment>
                        <Header as='h1'>GMail Integration</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'capture' &&
                    <Segment>
                        <Header as='h1'>Video Capture Parameters</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'motion' &&
                    <Segment>
                        <Header as='h1'>Motion Detection Parameters</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'face' &&
                    <Segment>
                        <Header as='h1'>Face Detection Parameters</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'facerec' &&
                    <Segment>
                        <Header as='h1'>Face Recognition Parameters</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'record' &&
                    <Segment>
                        <Header as='h1'>Video Recorder Parameters</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'diskspace' &&
                    <Segment>
                        <Header as='h1'>Disk Usage and Space</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'datetime' &&
                    <Segment>
                        <Header as='h1'>Date & Time</Header>
                    </Segment>
                    }
                    { this.state.activeItem === 'reboot' &&
                    <Segment>
                        <Header as='h1'>Reboot PiSmartCamera</Header>
                    </Segment>
                    }
                </Grid.Column>
            </Grid>
        );
    }
}

export default Settings;