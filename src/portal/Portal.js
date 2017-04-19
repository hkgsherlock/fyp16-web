import React, {Component} from 'react';
import {Container, Feed, Grid, Header, Icon, Segment, Statistic} from "semantic-ui-react";

class Portal extends Component {
    /*
     ret = {
     'records_count': result[0],
     'faces_count': result[1],
     'notifications_count': result[2],
     'uptime':  int(round(uptime_sec / 3600))
     }
     */

    state = {
        loading: false,
        records_count: '...',
        faces_count: '...',
        notifications_count: '...',
        uptime: '...'
    };

    componentDidMount() {
        this.reloadStat();
    }

    async reloadStat() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/stat');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                records_count: json.records_count,
                faces_count: json.faces_count,
                notifications_count: json.notifications_count,
                uptime: json.uptime
            });
        } else {
        }
    }

    render() {
        return (
            <Segment basic loading={ this.state.loading }>
                <Header as="h2" dividing>
                    Portal
                    <Header.Subheader>
                        An overview of your camera surveillance system.
                    </Header.Subheader>
                </Header>

                <Grid columns={2} stackable>

                    <Grid.Column width={8}>
                        <Header as="h3" dividing>
                            Overview
                        </Header>

                        <Segment inverted padded color='blue'>
                            <Grid columns={2}>
                                <Grid.Column width={3} verticalAlign="middle">
                                    <Icon inverted name='video camera' size="huge" />
                                </Grid.Column>
                                <Grid.Column width={13} verticalAlign="middle">
                                    <Statistic inverted horizontal value={ this.state.records_count } label='Video Captures' />
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <Segment inverted padded color='green'>
                            <Grid columns={2}>
                                <Grid.Column width={3} verticalAlign="middle">
                                    <Icon inverted name='user' size="huge" />
                                </Grid.Column>
                                <Grid.Column width={13} verticalAlign="middle">
                                    <Statistic inverted horizontal value={ this.state.faces_count } label='Profiled Persons' />
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <Segment inverted padded color='orange'>
                            <Grid columns={2}>
                                <Grid.Column width={3} verticalAlign="middle">
                                    <Icon inverted name='info circle' size="huge" />
                                </Grid.Column>
                                <Grid.Column width={13} verticalAlign="middle">
                                    <Statistic inverted horizontal value={ this.state.notifications_count } label='Notifications' />
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <Segment inverted padded color='grey'>
                            <Grid columns={2}>
                                <Grid.Column width={3} verticalAlign="middle">
                                    <Icon inverted name='clock' size="huge" />
                                </Grid.Column>
                                <Grid.Column width={13} verticalAlign="middle">
                                    <Statistic inverted horizontal value={ this.state.uptime } label='Hours of running' />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Header as="h3" dividing>
                            Recent recordings
                        </Header>

                        <Feed size='large'>
                            <Feed.Event>
                                <Feed.Label image='http://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
                                <Feed.Content>
                                    <Feed.Date>4 days ago</Feed.Date>
                                    <Feed.Summary>
                                        charles, tim
                                    </Feed.Summary>

                                    <Feed.Extra images>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='http://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
                                <Feed.Content>
                                    <Feed.Date>4 days ago</Feed.Date>
                                    <Feed.Summary>
                                        charles, tim
                                    </Feed.Summary>

                                    <Feed.Extra images>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='http://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
                                <Feed.Content>
                                    <Feed.Date>4 days ago</Feed.Date>
                                    <Feed.Summary>
                                        charles, tim
                                    </Feed.Summary>

                                    <Feed.Extra images>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                        <a><img src='http://react.semantic-ui.com/assets/images/wireframe/image.png' alt='' /></a>
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Grid.Column>

                </Grid>
            </Segment>
        );
    }
}

export default Portal;