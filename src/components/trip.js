import React from 'react';
import { api } from '../services/api'
import { Form, Icon, Popup } from 'semantic-ui-react';

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
            }
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        // console.log(params.id)
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

    renderList = (list) => {
        return list.map(item => {
            return (
                <div key={item.id}>
                    <li>
                        {item.content} 
                        &nbsp;&nbsp; 
                        <Popup content='Edit item' style={popupStyle} trigger={
                            <Icon link bordered name='edit' onClick={() => console.log('edit clicked')} />
                        } />
                        &nbsp;
                        <Popup content='Delete item' style={popupStyle} trigger={
                            <Icon link bordered name='trash alternate' onClick={() => console.log('delete clicked')} />
                        } />
                    </li>
                    <br/>
                </div>
            )
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

    render(){
        return(
        <>
            {this.state.trip !== null ? 
                <>
                    <h1>{this.state.trip.name}</h1>
                    <h5>{this.state.trip.description !== null ? this.state.trip.description : 'No description found.'}</h5>
                    <h1>Before leaving to my destination:</h1>
                    {this.state.beforeItems !== null ?
                        this.renderList(this.state.beforeItems)
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
                        this.renderList(this.state.afterItems)
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
            
        </>
        )
    }
}

export default Trip;