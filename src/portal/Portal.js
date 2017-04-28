import React, {Component} from 'react';
import {Grid, Header, Icon, Item, Segment, Statistic} from "semantic-ui-react";
import {Link} from "react-router";

class Portal extends Component {
    state = {
        loading: false,
        detects: [],
        records_count: '...',
        faces_count: '...',
        notifications_count: '...',
        uptime: '...'
    };

    componentDidMount() {
        this.reloadStat();
        this.reloadRecords();
    }

    async reloadStat() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/stat');
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

    async reloadRecords() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/record');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                detects: json.detects
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
                            Recent seens
                        </Header>

                        <Item.Group>
                            {this.state.detects.map(function(e, idx){
                                return (
                                    <Item>
                                        <Item.Image size='tiny' src={ e.img ? e.img : './image.png' } />
                                        <Item.Content verticalAlign='middle'>
                                            <Item.Header>
                                                <Link to={"/record/" + e.datetime}>
                                                    { e.datetime }
                                                </Link>
                                            </Item.Header>
                                            <Item.Meta>
                                                { e.people.join(', ') }
                                            </Item.Meta>
                                        </Item.Content>
                                    </Item>
                                );
                            })}
                        </Item.Group>
                    </Grid.Column>

                </Grid>
            </Segment>
        );
    }
}

export default Portal;