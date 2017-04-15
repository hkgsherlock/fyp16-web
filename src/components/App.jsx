import React, {PureComponent} from "react";
import {Button, Grid, Header, Icon, Menu, Segment} from "semantic-ui-react";
import {Link} from "react-router";
import DocumentTitle from 'react-document-title'
import {VelocityTransitionGroup} from "velocity-react";
import MediaQuery from 'react-responsive'

// import {ToastContainer, ToastMessage} from 'react-toastr'
// const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class App extends PureComponent {
    myMenu = (
        <Menu attached='top' stackable inverted>
            <Menu.Item name='portal'>
                <Icon name='dashboard' />
                <Link to="/">Portal</Link>
            </Menu.Item>
            <Menu.Item name='faces'>
                <Icon name='image' />
                <Link to="/face">Faces</Link>
            </Menu.Item>
            <Menu.Item name='records'>
                <Icon name='history' />
                <Link to="/record">Records</Link>
            </Menu.Item>
            <Menu.Item name='settings'>
                <Icon name='settings' />
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item name='logout' position='right'>
                <Icon name='power' />
                <Link to="/logout">Logout</Link>
            </Menu.Item>
        </Menu>
    );

    constructor() {
        super();
        this.state = {
            showMenu: false
        };
    }

    componentWillMount() {

    }

    render() {
        const handleMenuBtnClick = (e) => this.setState({showMenu: !this.state.showMenu});
        return (
            <DocumentTitle title="PiSmartCamera">
                {/*<ToastContainer ref="container"*/}
                {/*toastMessageFactory={ToastMessageFactory}*/}
                {/*className="toast-top-right"/>*/}

                <Grid textAlign='center' style={{marginTop: '1em'}}>
                    <Grid.Column computer={12} tablet={14} mobile={16} textAlign='left'>
                        <Header as='h1'>
                            <Icon name='video camera'/>
                            <Header.Content>
                                PiSmartCamera
                                <Header.Subheader>
                                    Web Admin Panel
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <MediaQuery maxDeviceWidth={767}>
                            <Button icon="bars" content="Menu" attached='top' fluid
                                    active={ this.state.showMenu }
                                    onClick={ handleMenuBtnClick }>
                            </Button>
                            <VelocityTransitionGroup component="div"
                                                     enter={{
                                                         animation: 'slideDown',
                                                         duration: this.state.duration,
                                                         style: {height: ''}
                                                     }}
                                                     leave={{animation: 'slideUp', duration: this.state.duration}}>
                                {this.state.showMenu ? this.myMenu : null}
                            </VelocityTransitionGroup>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={767}>
                            { this.myMenu }
                        </MediaQuery>
                        <Segment attached='bottom'>
                            { this.props.children }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </DocumentTitle>
        );
    }
}

export default App;