import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { withRouter } from 'react-router';
// import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react'

class EditPantryItem extends Component {
    state = {
        item: '',
        location: '',
        expDate: '',
        itemQuantity: '',
        servingsPerItem: '',
        isItemOpen: false,
        openedOn: '',
        editModalOpen: false,
        loggedUser: ''
    }
    handleEditModalOpen = () => {

    }
    render() {
        return (
            <div>
            hello this is the edit modal
            </div>
        )
    }
}

export default EditPantryItem;