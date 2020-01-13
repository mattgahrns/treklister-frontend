import React from 'react';
import { api } from '../services/api'
import { Form } from 'semantic-ui-react';

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
            return <li key={item.id}>{item.content}</li>
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
        .then(console.log)
    }

    handleAfterSubmit = e => {
        e.preventDefault();

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
                        <p>Loading...</p>
                    }
                    <br/>
                    <Form onSubmit={this.handleBeforeSubmit}>
                        <Form.Input
                            label='New Item'
                            placeholder="I can't forget..."
                            name='content'
                            onChange={this.handleBeforeChange}
                        />
                        <Form.Button content='Submit' />
                    </Form>

                    <h1>Before leaving to go home:</h1>
                    {this.state.afterItems !== null ?
                        this.renderList(this.state.afterItems)
                    :    
                        <p>Loading...</p>
                    }
                    <br/>
                    <Form onSubmit={this.handleAfterSubmit}>
                        <Form.Input
                            label='New Item'
                            placeholder="I can't forget..."
                            name='content'
                            onChange={this.handleAfterChange}
                        />
                        <Form.Button content='Submit' />
                    </Form>
                </>
            :
                <p>Loading...</p>
            }
            
        </>
        )
    }
}

export default Trip;