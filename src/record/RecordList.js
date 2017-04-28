import React, {Component} from 'react'
import {Segment, Header, Container, Item} from "semantic-ui-react";
import {Link} from "react-router";

class RecordList extends Component {
    state = {
        loading: false,
        detects: []
    };

    componentDidMount() {
        this.reloadRecords();
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
            <Segment basic loading={this.state.loading}>
                <Container>
                    <Header as='h3'>
                        Recent Seens
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
                </Container>
            </Segment>
        );
    }
}

export default RecordList;