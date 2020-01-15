import React from 'react';
import { api } from '../services/api'
import { Form, Icon, Popup, Modal } from 'semantic-ui-react';
import ListItemEditForm from './list_item_edit_form';

const popupStyle = {
    borderRadius: 5,
    padding: '5px'
}

class Trip extends React.Component {
    constructor(){
        super();
        this.state = {
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
    }

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
        console.log(e.target.className + ' item clicked');
        api.requests.checkListItem(e.target.className)
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }

    renderList = (list) => {
        return list.map(item => {
            return (
                item.isChecked === true ? 
                    <div key={item.id} id={item.id}>
                    <li>
                        <label><input type="checkbox" defaultChecked onClick={(e) => this.handleCheck(e)} className={item.id}/>{item.content}</label>
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
                <li>
                    <label><input type="checkbox" onClick={(e) => this.handleCheck(e)} className={item.id}/>{item.content}</label>
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

    state = { open: false }

    close = () => {
        this.setState({ 
            open: false,
        });
        this.getLists();
    }

    render(){
        const { open, size } = this.state
        return(
        <>
            {this.state.trip !== null ? 
                <>
                    <h1>{this.state.trip.name}</h1>
                    <h5>{this.state.trip.description !== null ? 'Description: ' + this.state.trip.description : 'No description found.'}</h5>
                    <h1>Before leaving to my destination:</h1>
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

                    <h1>Before leaving to go home:</h1>
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