import React, {Component} from 'react'
import {
    Button, Segment, Divider, Grid, Header, Image, Container, Label, Statistic,
    Item
} from "semantic-ui-react";
import {Link} from "react-router";

class Face extends Component {
    state = {
        loading: false,
        datetime: '...',
        img: '...',
        dropbox_url: '...',
        people: []
    };

    componentDidMount() {
        this.reloadRecords();
    }

    async reloadRecords() {
        let request_record = this.props.params.id;

        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/record/' + request_record);
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                datetime: json.datetime,
                img: json.img,
                dropbox_url: json.dropbox_url,
                people: json.people
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

    render() {
        const category2color = (n) => this.getColorFromCategoryName(n);

        return (
            <Segment basic>
                <Container>
                    <Header as='h2' style={{marginTop: 0}}>
                        <Header.Subheader>
                            Record
                        </Header.Subheader>
                        <code>{ this.state.datetime }</code>
                    </Header>
                    <Grid stackable>
                        <Grid.Column width="10">
                            <Image src={this.state.img}
                                   size='large' />
                        </Grid.Column>
                        <Grid.Column width="6">
                            <a href={this.state.dropbox_url} target="_blank">
                                <Button color="blue" content="View on Dropbox" icon="dropbox" />
                            </a>
                            <Header as='h3'>
                                <Header.Subheader>
                                    Date/Time
                                </Header.Subheader>
                                {this.state.datetime}
                            </Header>
                        </Grid.Column>
                    </Grid>
                    <Divider />
                    <Statistic horizontal value='2' label='involving persons' />
                    <Label.Group size="big">
                        {this.state.people.map(function(e, idx){
                            return (
                                <Link to={"/face/" + e.face_id }>
                                    <Label color={ category2color(e.category) } image>
                                        <img src={ e.img_url } alt='' />
                                        { e.face_id }
                                        <Label.Detail>{ e.category }</Label.Detail>
                                    </Label>
                                </Link>
                            );
                        })}
                    </Label.Group>
                </Container>
            </Segment>
        );
    }
}

export default Face;