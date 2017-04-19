import React, {Component} from 'react'
import {Segment, Divider, Header, Container, Card, Icon, Image, Label} from "semantic-ui-react";
import {Link} from "react-router";

class FaceList extends Component {
    state = {
        loading: false,
        faces: []
    };

    componentDidMount() {
        this.reloadRecords();
    }

    async reloadRecords() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/face');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                faces: json.faces
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

    render() {
        const category2color = (n) => this.getColorFromCategoryName(n);
        const category2icon = (n) => this.getIconFromCategoryName(n);
        return (
            <Segment basic>
                <Container>
                    <Header as='h2'>
                        Faces
                    </Header>
                    <Divider/>
                    <Card.Group stackable itemsPerRow="4">
                        {this.state.faces.map(function(e, idx){
                            return (
                                <Card color={category2color(e.category)}>
                                    <Card.Content>
                                        <Card.Header>
                                            <Icon name='user'/>
                                            <Link to={ '/face/' + e.id }>
                                                <code>
                                                    {e.id}
                                                </code>
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Content style={{padding: 0}}>
                                        <Link to={ '/face/' + e.id }>
                                            <Image src={ e.img_url && e.img_url.length > 0 ?
                                                    e.img_url :
                                                    '/question.png' } fluid />
                                        </Link>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <p><sub>Face profile last updated</sub><br/>
                                                { e.last_update || '(Never updated)'}
                                            </p><p><sub>Last Detected</sub><br/>
                                            {e.last_detect || '(Never detected)'}
                                        </p>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Label color={category2color(e.category)} size="large">
                                            <Icon name={category2icon(e.category)}/>
                                            { e.category }
                                        </Label>
                                    </Card.Content>
                                </Card>
                            );
                        })}
                    </Card.Group>
                </Container>
            </Segment>
        );
    }
}

export default FaceList;