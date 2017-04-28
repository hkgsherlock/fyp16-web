import React, {Component} from 'react'
import {Breadcrumb, Header, List, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class SetPortal extends Component {
    render() {
        return (
            <Segment basic>
                <Breadcrumb size='big'>
                    <Breadcrumb.Section>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </Breadcrumb.Section>
                </Breadcrumb>

                <Header as="h2">
                    Basics
                </Header>
                <List>
                    <List.Item>
                        <Link to="/settings/login">
                            Login Credentials
                        </Link>
                    </List.Item>
                    <List.Item name='dropbox'>
                        <Link to="/settings/dropbox">
                            Dropbox
                        </Link>
                    </List.Item>
                    <List.Item name='gmail'>
                        <Link to="/settings/gmail">
                            GMail
                        </Link>
                    </List.Item>
                </List>

                <Header as="h2">
                    Detection/Recognition
                </Header>
                <List>
                    <List.Item name='capture' >
                        <Link to="/settings/capture">
                            Video Capturing
                        </Link>
                    </List.Item>
                    <List.Item name='motion'>
                        <Link to="/settings/motion">
                            Motion Detection
                        </Link>
                    </List.Item>
                    <List.Item name='face'>
                        <Link to="/settings/face">
                            Face Detection
                        </Link>
                    </List.Item>
                    <List.Item name='facerec' >
                        <Link to="/settings/facerec">
                            Face Recognition
                        </Link>
                    </List.Item>
                    <List.Item name='record' >
                        <Link to="/settings/record">
                            Video Recording
                        </Link>
                    </List.Item>
                </List>

                <Header as="h2">
                    System
                </Header>
                <List>
                    <List.Item name='buzzer' >
                        <Link to="/settings/buzzer">
                            Buzzer
                        </Link>
                    </List.Item>
                    <List.Item name='ir-filter' >
                        <Link to="/settings/ir-filter">
                            IR-Filter
                        </Link>
                    </List.Item>
                    <List.Item name='diskspace' >
                        <Link to="/settings/diskspace">
                            Disk usage and spaces
                        </Link>
                    </List.Item>
                    {/*<List.Item name='datetime' >*/}
                        {/*<Link to="/settings/datetime">*/}
                            {/*Date / Time*/}
                        {/*</Link>*/}
                    {/*</List.Item>*/}
                    <List.Item name='reboot' >
                        <Link to="/settings/reboot">
                            Reboot
                        </Link>
                    </List.Item>
                </List>
            </Segment>
        );
    }
}

export default SetPortal;