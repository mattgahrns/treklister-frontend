import React from 'react';
import { Form } from 'semantic-ui-react';
import { api } from '../services/api'

class ListItemEditForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: props.data,
            fields: {
                content: props.data.content,
            }
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    }

    handleSubmit = (e) => {
        api.requests.updateListItem(this.state.item.id, this.state.fields)
        .then(res => res.json())
        .then(json => {
            this.props.closeModal();
        });
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Input 
                    defaultValue={this.props.data.content}
                    name='content'
                    onChange={this.handleChange}
                />
                <Form.Button compact color='green' content='Confirm' />
            
            </Form>
        )
    }
}

export default ListItemEditForm;