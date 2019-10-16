import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { withRouter } from 'react-router';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react'

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
    updatePantryItem = () => {
        return (
            <Modal
                closeIcon
                closeOnDimmerClick
                closeOnEscape
                onClose={this.closeModal}
                open={this.modalOpen}
                trigger={<Button onClick={this.handleOpen}>Add an Item to your Inventory</Button>} 
                >
                <Header 
                    icon='food' 
                    content='New Food Item' />
                <Modal.Content>
                <Form>
                    <Form.Field>
                        <div className="ui form">
                            <div className="required field">
                                <label>Item name</label>
                                <input placeholder='Food Item name'
                                required
                                type='text'
                                name='item'
                                onChange={this.handleChange}
                                value={this.state.item}
                                />
                            </div>
                        </div>
                    </Form.Field>
                <Form.Field>
                    <div className="ui form">
                        <div className="required field">
                        <label>Location</label>
                            <Dropdown
                                required
                                placeholder='Where Does This Item Belong?'
                                selection
                                // options={locationOptions}
                                name='location'
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </Form.Field>
                    <Form.Group inline>
                <Form.Field>
                    <label>Expiration Date</label>
                    <input placeholder='Item Expiration Date'
                    required
                    type='date'
                    name='expDate'
                    onChange={this.handleChange}
                    value={this.state.expDate}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Quantity</label>
                    <input
                    type='number'
                    min='0'
                    placeholder='Quantity'
                    name='quantity'
                    onChange={this.handleChange}
                    value={this.state.quantity || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Servings</label>
                    <input placeholder='Servings per Item'
                    type='number'
                    name='servings'
                    onChange={this.handleChange}
                    value={this.state.servings || ''}
                    min='0'
                    />
                </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Checkbox
                        name='itemOpen'
                        onChange={this.handleChange}
                        /> 
                        <label>Is this item open?</label>
                        {this.state.isItemOpen === true ? 
                            <Form.Field>
                            <label>Date Opened</label>
                            <input placeholder='Date Item Was Opened'
                                type='date'
                                name='openedOn'
                                onChange={this.handleChange}
                                value={this.state.openedOn}
                            />
                            </Form.Field> 
                        : null}  
                </Form.Group>
            </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    type='Submit'
                    primary
                    onClick={this.handleSubmit}>
                    Add Item
                </Button>
            </Modal.Actions>
            </Modal>
        )
        }  
    render() {
        return (
            <div>
            {this.updatePantryItem()}
            </div>
        )
    }
}

export default EditPantryItem;