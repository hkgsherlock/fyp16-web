import React, {Component} from 'react';
import {Grid, Menu} from "semantic-ui-react";
import {Link} from "react-router";
import {MediaQuery} from "react-responsive";

class Settings extends Component {
    render() {
        return (
            <Grid columns={2} divided>
                <MediaQuery maxDeviceWidth={767}>
                    <Grid.Column computer={3} widescreen={3} mobile={16}>
                        <Menu vertical secondary stackable>
                            <Menu.Item>
                                <Menu.Header>Basics</Menu.Header>
                                <Menu.Menu>
                                    <Menu.Item name='login'>
                                        <Link to="/settings/login">
                                            Login Credentials
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='dropbox'>
                                        <Link to="/settings/dropbox">
                                            Dropbox
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='gmail'>
                                        <Link to="/settings/gmail">
                                            GMail
                                        </Link>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu.Item>

                            <Menu.Item>
                                <Menu.Header>Detection/Recognition</Menu.Header>
                                <Menu.Menu>
                                    <Menu.Item name='capture'>
                                        <Link to="/settings/capture">
                                            Video Capturing
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='motion'>
                                        <Link to="/settings/motion">
                                            Motion Detection
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='face'>
                                        <Link to="/settings/face">
                                            Face Detection
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='facerec'>
                                        <Link to="/settings/facerec">
                                            Face Recognition
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='record'>
                                        <Link to="/settings/record">
                                            Video Recording
                                        </Link>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu.Item>

                            <Menu.Item>
                                <Menu.Header>System</Menu.Header>
                                <Menu.Menu>
                                    <Menu.Item name='diskspace'>
                                        <Link to="/settings/diskspace">
                                            Disk usage and spaces
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='datetime'>
                                        <Link to="/settings/datetime">
                                            Date / Time
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item name='reboot'>
                                        <Link to="/settings/reboot">
                                            Reboot
                                        </Link>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </MediaQuery>
                <Grid.Column computer={13} widescreen={13} mobile={16}>
                    { this.props.children }
                </Grid.Column>
            </Grid>
        );
    }
}

export default Settings;