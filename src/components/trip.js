import React from 'react';
import { api } from '../services/api'
import { Form, Icon, Popup, Modal, Button } from 'semantic-ui-react';
import ListItemEditForm from './list_item_edit_form';
import TripEditForm from './trip_edit_form';

const popupStyle = {
    borderRadius: 5,
    padding: '5px'
}

class Trip extends React.Component {
    constructor(){
        super();
        this.state = {
            user: null,
            trip: null,
            beforeItems: null,
            afterItems: null,
            beforeList: null,
            afterList: null,
            beforeFields: {
                content: ''
            },
            afterFields: {
                content: ''
            },
            open: false,
            item: null,
            bgColor: '',
            deleteModalOpen: false,
            editModalOpen: false,
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        api.requests.fetchTrip(params.id)
        .then(res => res.json())
        .then(json => {
            this.setState({
                trip: json
            }, () => this.getLists())
        });
        if (localStorage.getItem("token") != null)
        api.auth.getCurrentUser().then((data) => {
          if (!data.error) {
            this.setState({
              user: data
            })
          } else {
            this.setState({
              user: null
            })
          }
        });
    }

    handleEditOpen = () => this.setState({ editModalOpen: true })

    handleEditClose = (trip) => {
        this.setState({ 
            editModalOpen: false,
            trip: trip
        });
    }
    
    handleDeleteOpen = () => this.setState({ deleteModalOpen: true })

    handleDeleteClose = () => this.setState({ deleteModalOpen: false })

    getLists = () => {
        api.requests.fetchLists(this.state.trip.id)
        .then(res => res.json())
        .then(json => {
            this.setState({
                beforeItems: json.before_items,
                afterItems: json.after_items,
                beforeList: json.before_list,
                afterList: json.after_list
            });
        });
    }

    handleCheck = (e) => {
        e.persist();
        api.requests.checkListItem(e.target.className)
        .then(res => res.json())
        .then(json => {
            if(json.isChecked){
                this.setState({bgColor: '#96FF72'})
                e.target.style.backgroundColor = this.state.bgColor;
                this.setState({bgColor: ''})
            }else{
                this.setState({bgColor: ''})
                e.target.style.backgroundColor = this.state.bgColor;
                this.setState({bgColor: '#96FF72'})
            }
            this.getLists();
        })
    }

    renderList = (list) => {
        return list.map(item => {
            return (
                item.isChecked === true ? 
                    <div key={item.id} id={item.id}>
                    <li>
                        <label style={{backgroundColor: '#96FF72', cursor: 'pointer'}}><input style={{cursor: 'pointer'}} type="checkbox" defaultChecked onClick={(e) => this.handleCheck(e)} className={item.id}/>{item.content}</label>
                        &nbsp;&nbsp; 
                        <Popup content='Edit item' style={popupStyle} trigger={
                            <Icon link bordered name='edit' onClick={() => {
                                this.setState({ 
                                    size: 'fullscreen', 
                                    open: true,
                                    item: item,
                                });
                            }} />
                        } />
                        &nbsp;
                        <Popup content='Delete item' style={popupStyle} trigger={
                            <Icon link bordered name='trash alternate' onClick={() => this.handleItemDelete(item.id)} />
                        } />
                    </li>
                    <br/>
                </div>
                :
                <div key={item.id} id={item.id}>
                    {undefined}
                <li>
                    <label style={{cursor: 'pointer'}}><input style={{cursor: 'pointer'}} type="checkbox" onClick={(e) => this.handleCheck(e)} className={item.id}/>{item.content}</label>
                    &nbsp;&nbsp; 
                    <Popup content='Edit item' style={popupStyle} trigger={
                        <Icon link bordered name='edit' onClick={() => {
                            this.setState({ 
                                size: 'fullscreen', 
                                open: true,
                                item: item,
                            });
                        }} />
                    } />
                    &nbsp;
                    <Popup content='Delete item' style={popupStyle} trigger={
                        <Icon link bordered name='trash alternate' onClick={() => this.handleItemDelete(item.id)} />
                    } />
                </li>
                <br/>
                </div>
            )
        });
    }

    handleItemDelete = itemID => {
        api.requests.deleteListItem(itemID)
        .then(res => res.json())
        .then(json => {
            this.getLists();
        });
    }

    handleBeforeChange = e => {
        const newFields = { ...this.state.beforeFields, [e.target.name]: e.target.value };
        this.setState({ beforeFields: newFields });
    };

    handleAfterChange = e => {
        const newFields = { ...this.state.afterFields, [e.target.name]: e.target.value };
        this.setState({ afterFields: newFields });
    };

    handleBeforeSubmit = e => {
        e.preventDefault();
        api.requests.newListItem(this.state.beforeList[0].id, this.state.beforeFields)
        .then(res => res.json())
        .then(json => {
            let newBeforeItems = this.state.beforeItems;
            newBeforeItems.push(json);
            this.setState({
                beforeItems: newBeforeItems,
                beforeFields: {
                    content: ''
                }
            });
        });
    }

    handleAfterSubmit = e => {
        e.preventDefault();
        api.requests.newListItem(this.state.afterList[0].id, this.state.afterFields)
        .then(res => res.json())
        .then(json => {
            let newAfterItems = this.state.afterItems;
            newAfterItems.push(json);
            this.setState({
                afterItems: newAfterItems,
                afterFields: {
                    content: ''
                }
            });
        });
    }

    handleClearChecks = (e) => {
        api.requests.uncheckAllItems(e.target.id)
        .then(res => res.json())
        .then(json => {
            if(json.list.before){
                this.setState({
                    beforeItems: json.list_items
                }, () => {
                    for(let i = 0; i < this.state.beforeItems; i++){
                        document.querySelector(`.${this.state.beforeItems[i].id}`).click();
                    }
                });
            } else {
                this.setState({
                    afterItems: json.list_items
                }, () => {
                    for(let i = 0; i < this.state.afterItems; i++){
                        document.querySelector(`.${this.state.afterItems[i].id}`).click();
                    }
                });
            }
        })
    }

    state = { open: false }

    close = () => {
        this.setState({ 
            open: false,
        });
        this.getLists();
    }

    handleDelete = (e) => {
        api.requests.deleteTrip(e.target.id)
        .then(res => res.json()
        .then(json => {
            if(json.message){
                this.props.history.push(`/users/${this.state.user.id}/trips`)
            }
        }));
    }

    render(){
        const { open, size } = this.state
        return(
        <>
            {this.state.trip !== null && this.state.beforeList !== null ? 
                <>
                    <Modal 
                    trigger={<Button onClick={this.handleEditOpen} id={this.state.user.id} compact>Edit Trip</Button>}
                    open={this.state.editModalOpen}
                    onClose={this.handleEditClose}
                    >
                        <Modal.Header>Edit Trip</Modal.Header>
                        <Modal.Content>
                            <TripEditForm handleClose={this.handleEditClose} currTrip={this.state.trip}/>
                        </Modal.Content>
                    </Modal>
                    <Modal 
                    size='mini' 
                    trigger={<Button onClick={this.handleDeleteOpen} compact negative>Delete Trip</Button>}
                    open={this.state.deleteModalOpen}
                    onClose={this.handleDeleteClose}
                    >
                        <Modal.Header>Delete This Trip</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure you want to delete this trip?</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleDeleteClose} negative>No</Button>
                            <Button
                            id={this.state.trip.id}
                            onClick={(e) => this.handleDelete(e)}
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>
                    <h1>{this.state.trip.name}</h1>
                    <h5>{this.state.trip.description !== null ? 'Description: ' + this.state.trip.description : 'No description found.'}</h5>
                    <h2>Before leaving to my destination: &nbsp;&nbsp; {this.state.beforeList !== null ? <Button id={this.state.beforeList[0].id} color='red' compact onClick={(e) => this.handleClearChecks(e)}>Clear All Checks</Button> : null}</h2>
                    {this.state.beforeItems !== null ?
                        this.state.beforeItems.length > 0 ?
                        this.renderList(this.state.beforeItems)
                        :
                        <p>No items yet, add some below!</p>
                    :    
                        <Icon loading name='spinner' size='huge'/>
                    }
                    <br/>
                    <Form onSubmit={this.handleBeforeSubmit}>
                        <Form.Input
                            label='New item'
                            placeholder="Type something..."
                            name='content'
                            value={this.state.beforeFields.content}
                            onChange={this.handleBeforeChange}
                        />
                        <Form.Button content='Add item' />
                    </Form>

                    <h2>Before leaving to go home: &nbsp;&nbsp; {this.state.afterList !== null ? <Button id={this.state.afterList[0].id} color='red' compact onClick={(e) => this.handleClearChecks(e)}>Clear All Checks</Button> : null}</h2>
                    {this.state.afterItems !== null ?
                        this.state.afterItems.length > 0 ?
                        this.renderList(this.state.afterItems)
                        :
                        <p>No items yet, add some below!</p>
                    :    
                        <Icon loading name='spinner' size='huge'/>
                    }
                    <br/>
                    <Form onSubmit={this.handleAfterSubmit}>
                        <Form.Input
                            label='New item'
                            placeholder="Type something..."
                            name='content'
                            value={this.state.afterFields.content}
                            onChange={this.handleAfterChange}
                        />
                        <Form.Button content='Add item' />
                    </Form>
                </>
            :
                <Icon loading name='spinner' size='massive'/>
            }
            
            <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit item</Modal.Header>
                <Modal.Content>
                    <ListItemEditForm data={this.state.item} closeModal={this.close} />
                </Modal.Content>
                <Modal.Actions>
                    
                </Modal.Actions>
            </Modal>
        </>
        )
    }
}

export default Trip;