import React, {Component} from 'react'
import {
    Button, Segment, Divider, Grid, Header, Image, Container, Label, Icon, Statistic,
    Item
} from "semantic-ui-react";

class Face extends Component {
    state = {
        loading: false,
        id: '...',
        category: '...',
        lastUpdate: '...',
        lastDetect: '...',
        faces: [],
        detects: []
    };

    componentDidMount() {
        this.reloadRecords();
    }

    async reloadRecords() {
        let request_face = this.props.params.id;
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/face/' + request_face);
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                id: json.id,
                category: json.category,
                lastUpdate: json.lastUpdate,
                lastDetect: json.lastDetect,
                faces: json.faces,
                detects: json.detects
            });
        } else {
        }
    }

    getColorFromCategoryName(category_name) {
        category_name = category_name.toLowerCase();
        if (category_name === 'allowed') {
            return 'green';
        }
        if (category_name === 'confirmed') {
            return 'olive';
        }
        if (category_name === 'pending') {
            return 'yellow';
        }
        if (category_name === 'deny') {
            return 'red';
        }
        if (category_name === 'ignored') {
            return '';
        }
    }

    getIconFromCategoryName(category_name) {
        category_name = category_name.toLowerCase();
        if (category_name === 'allowed') {
            return 'checkmark';
        }
        if (category_name === 'confirmed') {
            return 'circle outline';
        }
        if (category_name === 'pending') {
            return 'hourglass half';
        }
        if (category_name === 'deny') {
            return 'warning sign';
        }
        if (category_name === 'ignored') {
            return 'window minimize';
        }
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
        const category2color = (n) => this.getColorFromCategoryName(n);
        const category2icon = (n) => this.getIconFromCategoryName(n);
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
                        <code>{ this.state.id }</code>
                    </Header>
                    <Grid stackable>
                        <Grid.Column width="4">
                            <Image src={ this.state.faces.length > 0 ?
                                this.state.faces[0].url :
                                '/question.png' }
                                   size='medium'/>
                        </Grid.Column>
                        <Grid.Column width="8">
                            <Label color={category2color(this.state.category)} size="large">
                                <Icon name={category2icon(this.state.category)}/>
                                { this.state.category }
                            </Label>
                            <Header as='h3'>
                                <Header.Subheader>
                                    Face profile last updated
                                </Header.Subheader>
                                { this.state.lastUpdate || '(Never updated)' }
                            </Header>
                            <Header as='h3'>
                                <Header.Subheader>
                                    Last Detected
                                </Header.Subheader>
                                { this.state.lastDetect || '(Never detected)' }
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
                    <Statistic horizontal value={this.state.faces.length} label='Sample Images'/>
                    <Image.Group size='tiny'>
                        {
                            this.state.faces.map((e, idx) => (<Image data-filename={e.filename} src={e.url}/>))
                        }
                    </Image.Group>
                    <Divider />
                    <Statistic horizontal value={this.state.detects.length} label='Recent Seens'/>
                    <Item.Group>
                        {
                            this.state.detects.map((e, idx) => (
                                <Item>
                                    <Item.Image size='tiny'
                                                src={e.img}/>

                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header as='a'>{ e.datetime }</Item.Header>
                                        <Item.Meta>
                                            <span className='cinema'>{ e.people.join(', ') }</span>
                                        </Item.Meta>
                                    </Item.Content>
                                </Item>
                            ))
                        }
                    </Item.Group>
                </Container>
            </Segment>
        );
    }
}

export default Face;