import React, { Component } from 'react';
import PantryList from '../PantryList'
import { withRouter } from 'react-router';
import EditPantryItem from '../EditPantryItem'

const baseUrl = process.env.REACT_APP_BACKEND_URL

class PantryContainer extends Component {
    state = {
        allPantryItems: [],
        filteredItems: [],
        activeItem: '',
        loggedUser: '',
        itemToEdit: ''
    }
    handleEditClick = async (id) => {
        this.setState({
            itemToEdit: id
        })
        console.log(this.state.itemToEdit, 'itemToEdit in state')
    }
    handleDeleteClick = async (id) => {
        try {
        const deletePantryItem = await fetch(`${baseUrl}/pantry/${id}`, {
            credentials: 'include',
            method: 'DELETE'
        });
        if (deletePantryItem.status !== 200) {
            throw Error('delete item failed')
        }
        const deletePantryItemJson = await deletePantryItem.json();
        console.log(deletePantryItemJson, '<-deletepantryitemJson')
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
        const { filteredItems, activeItem } = this.props
        return (
            <div>
            {/* {loggedUser ? 
                <CreatePantryItem 
                    getPantryItems={this.props.getPantryItems}
                    loggedUser={this.state.loggedUser}/> :
                null 
            } */}
                <PantryList 
                    allPantryItems={this.props.allPantryItems}
                    filteredItems={filteredItems}
                    activeItem={activeItem}
                    handleDeleteClick={this.handleDeleteClick}
                    handleEditClick={this.handleEditClick}
                    />
                <EditPantryItem 
                     />
            </div>
        )
    }
}

export default withRouter(PantryContainer);