import React, { Component } from 'react';
import CreatePantryItem from '../CreatePantryItem'
import PantryList from '../PantryList'
import { withRouter } from 'react-router';

const baseUrl = "http://localhost:9000"

class PantryContainer extends Component {
    state = {
        allPantryItems: [],
        filteredItems: [],
        activeItem: '',
        loggedUser: ''
    }
    handleDeleteClick = async (id) => {
        console.log(id, 'delete button onClick')
        try {
        const deletePantryItem = await fetch(`${baseUrl}/pantry/${id}`, {
            credentials: 'include',
            method: 'DELETE'
        });
        if (deletePantryItem.status !== 200) {
            throw Error('delete item failed')
        }
        const deletePantryItemJson = await deletePantryItem.json();
        console.log(deletePantryItemJson, "<-deletePantryItemJson")
        this.props.history.push('/pantry');
        const {getPantryItems} = this.props 
        getPantryItems();
        this.props.history.push('/pantry')
        } catch (err) {
            console.log(err);
            return err
        }
    }
    render() {
        const { filteredItems, activeItem, allPantryItems } = this.props
        return (
            <div>

                <CreatePantryItem 
                    getPantryItems={this.props.getPantryItems}
                    loggedUser={this.state.loggedUser}/>
                <PantryList 
                    allPantryItems={this.props.allPantryItems}
                    filteredItems={filteredItems}
                    activeItem={activeItem}
                    handleDeleteClick={this.handleDeleteClick}/>
            </div>
        )
    }
}

export default withRouter(PantryContainer);