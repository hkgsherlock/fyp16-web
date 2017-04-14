import React, {PureComponent} from "react";
import {Container, Header, Icon, Menu, Segment} from "semantic-ui-react";
import {Link} from "react-router";

class App extends PureComponent {
    render() {
        return (
            <Container>
                {/*<Header as='h1'>*/}
                    {/*<Icon name='video camera' />*/}
                    {/*<Header.Content>*/}
                        {/*PiSmartCamera*/}
                        {/*<Header.Subheader>*/}
                            {/*Web Admin Panel*/}
                        {/*</Header.Subheader>*/}
                    {/*</Header.Content>*/}
                {/*</Header>*/}
                {/*<Menu>*/}
                    {/*<Menu.Item name='portal'>*/}
                        {/*<Link to="/">Portal</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*/!*<Menu.Item name='People'>*!/*/}
                        {/*/!*<Link to="/people">People</Link>*!/*/}
                    {/*/!*</Menu.Item>*!/*/}
                    {/*<Menu.Item name='records'>*/}
                        {/*<Link to="/records">Records</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item name='settings'>*/}
                        {/*<Link to="/settings">Settings</Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item name='logout' position='right'>*/}
                        {/*<Link to="/logout">Logout</Link>*/}
                    {/*</Menu.Item>*/}
                {/*</Menu>*/}
                <Segment attached='bottom'>
                    { this.props.children }
                </Segment>
            </Container>
        );
    }
}

export default App;