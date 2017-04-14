import React, {Component} from 'react';
import LoginStore from '../stores/LoginStore'
import RouterContainer from "../services/RouterContainer";
import {Container, Header, Icon, Menu, Segment} from "semantic-ui-react";
import {Link, RouteHandler} from "react-router";

export default class AuthenticatedApp extends Component {
    constructor() {
        super();
        this.state = this._getLoginState();
    }

    componentWillMount() {
        if (!LoginStore.isLoggedIn()) {
            RouterContainer.get().transitionTo('/login');
        }
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
        return (
            <Container>
                <Header as='h1'>
                    <Icon name='video camera' />
                    <Header.Content>
                        PiSmartCamera
                        <Header.Subheader>
                            Web Admin Panel
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Menu>
                    <Menu.Item name='portal'>
                        <Link to="/">Portal</Link>
                    </Menu.Item>
                    {/*<Menu.Item name='People'>*/}
                    {/*<Link to="/people">People</Link>*/}
                    {/*</Menu.Item>*/}
                    <Menu.Item name='records'>
                        <Link to="/records">Records</Link>
                    </Menu.Item>
                    <Menu.Item name='settings'>
                        <Link to="/settings">Settings</Link>
                    </Menu.Item>
                    <Menu.Item name='logout' position='right'>
                        <Link to="/logout">Logout</Link>
                    </Menu.Item>
                </Menu>
                <Segment attached='bottom'>
                    <RouteHandler/>
                </Segment>
            </Container>
        );
    }
}
