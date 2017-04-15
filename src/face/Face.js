import React, {Component} from 'react'
import {
    Button, Segment, Divider, Grid, Header, Image, Container, Label, Icon, Statistic,
    Item
} from "semantic-ui-react";

class Face extends Component {
    constructor() {
        super();

        this.state = {
            editing: false,
            saving: false
        };
    }

    save(e) {
        this.setState({saving: true});
        console.log(this.refs);
        setTimeout(() => {
            // this.refs.container.success(
            //     "Welcome welcome welcome!!",
            //     "You are now portal my friend. Welcome portal my friend.", {
            //         timeOut: 3000
            //     });
            this.setState({
                editing: false,
                saving: false
            });
        }, 1500);
    }

    render() {
        const handleEditClick = (e) => this.setState({editing: !this.state.editing});
        const handleSaveClick = this.save.bind(this);

        return (
            <Segment
                basic={ !this.state.editing }
                raised={ this.state.editing }
                loading={ this.state.saving }>
                <Container>
                    <Header as='h2' style={{marginTop: 0}}>
                        <Header.Subheader>
                            Face profile
                        </Header.Subheader>
                        <code>{ this.props.params.id || '???' }</code>
                    </Header>
                    <Grid stackable>
                        <Grid.Column width="4">
                            <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'
                                   size='medium' />
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Label color="green">
                                <Icon name="checkmark" />
                                Allowed
                            </Label>
                            <Header as='h3'>
                                <Header.Subheader>
                                    Face profile last updated
                                </Header.Subheader>
                                Sat 1 Apr 2017 10:57:55 GMT+0800
                            </Header>
                            <Header as='h3'>
                                <Header.Subheader>
                                    Last Detected
                                </Header.Subheader>
                                Sat 15 Apr 2017 09:32:48 GMT+0800
                            </Header>
                        </Grid.Column>
                        <Grid.Column width="4" textAlign="right">
                            {
                                this.state.editing ?
                                    <Button.Group vertical>
                                        <Button positive content="Save" icon="save"
                                                loading={ this.state.saving } onClick={ handleSaveClick }/>
                                        <Button color="grey" content="Cancel" icon="cancel"
                                                disabled={ this.state.saving } onClick={ handleEditClick }/>
                                    </Button.Group>
                                    :
                                    <Button.Group vertical>
                                        <Button color='blue' content="Edit" icon="edit" onClick={ handleEditClick }/>
                                        <Button color='red' content="Delete" icon="trash"/>
                                    </Button.Group>
                            }
                        </Grid.Column>
                    </Grid>
                    <Divider />
                    <Statistic horizontal value='46' label='Sample Images' />
                    <Image.Group size='tiny'>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
                    </Image.Group>
                    <Divider />
                    <Header as='h3'>
                        Recent Seens
                    </Header>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' src='http://react.semantic-ui.com/assets/images/wireframe/image.png' />

                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='a'>12 Years a Slave</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>charles</span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image size='tiny' src='http://react.semantic-ui.com/assets/images/wireframe/image.png' />

                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>charles, tim, alan</span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image size='tiny' src='http://react.semantic-ui.com/assets/images/wireframe/image.png' />

                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='a'>Watchmen</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>charles, tim</span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Container>
            </Segment>
        );
    }
}

export default Face;