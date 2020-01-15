import React, { Component } from 'react';
import PantryList from '../PantryList'
import { withRouter } from 'react-router';
// import EditPantryItem from '../EditPantryItem'
import CreatePantryItem from '../CreatePantryItem'

const baseUrl = process.env.REACT_APP_BACKEND_URL

class PantryContainer extends Component {
    state = {
        allPantryItems: [],
        filteredItems: [],
        activeItem: '',
        loggedUser: '',
        itemToEdit: '',
        modalOpen: false,
        item: "",
        location: "",
        expDate: "",
        itemQuantity: '',
        servings: '',
        isItemOpen: false,
        openedOn: "",
    }
    handleOpen = () => {
        const { loggedUser } = this.props;
        this.setState({
            loggedUser: loggedUser,
            modalOpen: true
        }, () => {
            console.log("this modal is open")
        })
    }
    modalClose = () => {
        this.setState({
            modalOpen: false,
            item: "",
            location: "",
            expDate: "",
            itemQuantity: '',
            servings: '',
            isItemOpen: false,
            openedOn: "",
        })
    }
    handleEditClick = (id) => {
        this.setState({
            itemToEdit: id,
            modalOpen: true
        },() => {
            console.log(this.state.itemToEdit, 'itemToEdit in state', this.state.modalOpen, "this.state.modalOpen")
        })
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
                <CreatePantryItem 
                    getPantryItems={this.props.getPantryItems}
                    // loggedUser={this.state.loggedUser}
                    handleOpen={this.handleOpen}
                    modalOpen={this.state.modalOpen}
                    modalClose={this.modalClose} />
                <PantryList 
                    allPantryItems={this.props.allPantryItems}
                    filteredItems={filteredItems}
                    activeItem={activeItem}
                    handleDeleteClick={this.handleDeleteClick}
                    handleEditClick={this.handleEditClick}
                    modalOpen={this.state.modalOpen}
                    itemToEdit={this.state.itemToEdit}
                    modalClose={this.modalClose}
                    />
            </div>
        )
    }
}

export default withRouter(PantryContainer);