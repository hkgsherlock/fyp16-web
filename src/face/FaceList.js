import React, {Component} from 'react'
import {Segment, Divider, Header, Container, Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router";

class FaceList extends Component {
    render() {
        return (
            <Segment basic>
                <Container>
                    <Header as='h2'>
                        Portal
                    </Header>
                    <Divider/>
                    <Card.Group stackable itemsPerRow="4">
                        <Card color='green'>
                            <Card.Content>
                                <Card.Header>
                                    <Link to='/face/charles'>
                                        <code>
                                            charles
                                        </code>
                                    </Link>
                                </Card.Header>
                            </Card.Content>
                            <Card.Content style={{padding: 0}}>
                                <Link to='/face/charles'>
                                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' fluid />
                                </Link>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <p><sub>Face profile last updated</sub><br/>
                                        Sat 1 Apr 2017 10:57:55 GMT+0800
                                    </p><p><sub>Last Detected</sub><br/>
                                        Sat 15 Apr 2017 09:32:48 GMT+0800
                                    </p>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='user'/>
                                Allowed
                            </Card.Content>
                        </Card>
                        <Card color='red'>
                            <Card.Content>
                                <Card.Header>
                                    <code>
                                        <Link to='/face/wil'>
                                            <code>
                                                wil
                                            </code>
                                        </Link>
                                    </code>
                                </Card.Header>
                            </Card.Content>
                            <Card.Content style={{padding: 0}}>
                                <Link to='/face/wil'>
                                    <Image src='http://react.semantic-ui.com/assets/images/avatar/large/daniel.jpg' fluid />
                                </Link>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <p><sub>Face profile last updated</sub><br/>
                                        Sat 1 Apr 2017 10:10:32 GMT+0800
                                    </p><p><sub>Last Detected</sub><br/>
                                    Sat 15 Apr 2017 09:32:48 GMT+0800
                                </p>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='user'/>
                                Deny
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Container>
            </Segment>
        );
    }
}

export default FaceList;