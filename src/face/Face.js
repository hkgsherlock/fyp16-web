import React, {Component} from 'react'
import {
    Button, Segment, Divider, Grid, Header, Image, Container, Label, Icon, Statistic,
    Item, Modal, Message, Confirm, Dropdown, Input
} from "semantic-ui-react";
import './Face.css';
import {browserHistory} from "react-router";

class Face extends Component {
    state = {
        loading: false,
        lastUploadResult: null,
        lastUploadReason: null,
        id: '...',
        category: '...',
        lastUpdate: '...',
        lastDetect: '...',
        faces: [],
        detects: [],
        fileToDelete: null,
        confirmingDelete: false,
        newId: null,
        newCategory: null
    };

    componentDidMount() {
        this.reloadRecords();
    }

    async reloadRecords() {
        let request_face = this.props.params.id;
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/face/' + request_face);
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                id: json.id,
                category: json.category,
                newId: json.id,
                newCategory: json.category,
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

    async save(e) {
        e.preventDefault();
        if (this.state.newCategory.length === 0 || this.state.newId.length === 0) {
            return;
        }
        this.setState({loading: true});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/face/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.newId,
                category: this.state.newCategory
            })
        });
        let json = await result.json();
        this.setState({loading: false});
        this.setState({
            saving: false,
            lastSaveResult: result.ok
        });
        if (result.ok) {
            browserHistory.push('/face');
        } else {
            this.setState({
                lastSaveReason: json.message
            })
        }
    }

    async uploadFace(e) {
        e.preventDefault();
        let files = e.target.querySelector('input[name=img]').files;
        if (files.length < 1) {
            return;
        }
        let formData = new FormData();
        formData.append('img', files[0]);
        let result;
        result = await fetch("http://pismartcam.local:5000/api/face/" + this.state.id + "/faces/", {
            method: 'POST',
            body: formData
        });
        let json = await result.json();
        this.setState({
            lastUploadResult: result.ok
        });
        if (!result.ok) {
            this.setState({
                lastUploadReason: json.message
            })
        }
    }

    deleteItemsAdd(e) {
        e.preventDefault();

        if (!this.state.editing) {
            return;
        }

        let filename = e.target.getAttribute("data-filename");
        console.log(filename);
        this.setState({fileToDelete: filename, confirmingDelete: true});
    }

    async deleteImage(e) {
        e.preventDefault();
        this.setState({loading: true, confirmingDelete: false});
        let result;
        result = await fetch('http://pismartcam.local:5000/api/face/' + this.state.id + "/faces/" + this.state.fileToDelete, {
            method: 'DELETE'
        });
        let json = await result.json();
        this.setState({loading: false});
        this.setState({
            saving: false,
            lastSaveResult: result.ok
        });
        if (result.ok) {
            this.reloadRecords();
        } else {
            this.setState({
                lastSaveReason: json.message
            })
        }
    }

    render() {
        const category2color = (n) => this.getColorFromCategoryName(n);
        const category2icon = (n) => this.getIconFromCategoryName(n);
        const handleEditClick = (e) => this.setState({editing: !this.state.editing, wantToDelete: []});
        const handleSaveClick = this.save.bind(this);
        const handleFaceUploadClick = this.uploadFace.bind(this);
        const handleDeleteItemsAdd = this.deleteItemsAdd.bind(this);
        const handleConfirmDeleteImageClick = this.deleteImage.bind(this);
        const handleConfirmDeleteCancelClick = (e) => this.setState({confirmingDelete: false});
        const handleIdChange = (e) => this.setState({newId: e.target.value});
        const handleCategoryChange = (e, {value}) => this.setState({newCategory: value});

        return (
            <Segment
                basic={ !this.state.editing }
                raised={ this.state.editing }
                loading={ this.state.loading || this.state.saving }>
                <Container>
                    <Header as='h2' style={{marginTop: 0}}>
                        <Header.Subheader>
                            Face profile
                        </Header.Subheader>
                        { this.state.editing ?
                        <Input placeholder='e.g.: alan_smithee'
                               value={this.state.newId}
                               onChange={handleIdChange}/>
                        :
                        <code>{ this.state.id }</code>
                        }
                    </Header>
                    <Grid stackable>
                        <Grid.Column width="4">
                            <Image src={ this.state.faces.length > 0 ?
                                this.state.faces[0].url :
                                '/question.png' }
                                   size='medium'/>
                        </Grid.Column>
                        <Grid.Column width="8">
                            { this.state.editing ?
                            <Dropdown
                                ref="method_dropdown"
                                defaultValue={this.state.category}
                                fluid
                                selection
                                options={[
                                    {
                                        text: 'Allowed',
                                        value: 'allowed'
                                    },
                                    {
                                        text: 'Confirmed',
                                        value: 'confirmed'
                                    },
                                    {
                                        text: 'Pending',
                                        value: 'pending'
                                    },
                                    {
                                        text: 'Deny',
                                        value: 'deny'
                                    },
                                    {
                                        text: 'Ignored',
                                        value: 'ignored'
                                    }
                                ]}
                                onChange={handleCategoryChange}
                            />
                            :
                            <Label color={category2color(this.state.category)} size="large">
                                <Icon name={category2icon(this.state.category)}/>
                                { this.state.category }
                            </Label>
                            }
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
                    {
                        this.state.editing &&
                        <Modal trigger={<Button color="yellow" floated='right'>Upload</Button>}>
                            <Modal.Header>Select a Photo</Modal.Header>
                            <Modal.Content image>
                                <form method="post" onSubmit={handleFaceUploadClick}>
                                    <p>
                                        Please specify a file, or a set of files:<br/>
                                        <input type="file" name="img" size="40"/>
                                    </p>
                                    <div>
                                        <input type="submit" value="Send"/>
                                    </div>
                                </form>

                                { this.state.lastUploadResult === true &&
                                <Message positive>
                                    <Message.Header>Settings saved</Message.Header>
                                </Message>
                                }
                                { this.state.lastUploadResult === false &&
                                <Message positive>
                                    <Message.Header>Failed to save settings</Message.Header>
                                    { this.state.lastUploadReason }
                                </Message>
                                }
                            </Modal.Content>
                        </Modal>
                    }
                    <Confirm
                        header='Deleting face images from face profile.'
                        content={'Do you really want to selected image "' + this.state.fileToDelete + '"? ' +
                        'This action cannot be undone.'}
                        confirmButton="Delete"
                        open={ this.state.confirmingDelete }
                        onConfirm={ handleConfirmDeleteImageClick }
                        onCancel={ handleConfirmDeleteCancelClick }
                    />
                    {
                        this.state.editing &&
                        <p>Select the image(s) to delete.</p>
                    }
                    <Image.Group size='tiny'>
                        {
                            this.state.faces.map((e, idx) => (<Image data-filename={e.filename} src={e.url}
                                                                     onClick={handleDeleteItemsAdd}/>))
                        }
                    </Image.Group>
                    <Divider />
                    <Statistic horizontal value={this.state.detects.length} label='Recent Seens'/>
                    <Item.Group>
                        {
                            this.state.detects.map((e, idx) => (
                                <Item>
                                    <Item.Image size='tiny'
                                                src={ e.img ? e.img : '../image.png' }/>

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