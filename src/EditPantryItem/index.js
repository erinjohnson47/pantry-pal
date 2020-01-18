import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { withRouter } from 'react-router';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react'

const locationOptions = [
    { key: 'refrigerator', text: 'Refrigerator', value: 'refrigerator' },
    { key: 'freezer', text: 'Freezer', value: 'freezer' },
    { key: 'pantry', text: 'Pantry', value: 'pantry' }
]

class EditPantryItem extends Component {
    state = {
        item: '',
        location: '',
        expDate: '',
        itemQuantity: '',
        servingsPerItem: '',
        isItemOpen: false,
        openedOn: '',
        modalOpen: '',
        loggedUser: '',
        itemToEdit: ''
    }
    updatePantryItem = () => {
        const {modalOpen, itemToEdit, modalClose} = this.props;
        return (
            <Modal
                closeIcon
                closeOnDimmerClick
                closeOnEscape
                onClose={modalClose}
                open={modalOpen === "edit"}
                >
                <Header 
                    icon='food' 
                    content='Edit Food Item' />
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
                                defaultValue={itemToEdit.item}
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
                                options={locationOptions}
                                name='location'
                                defaultValue={itemToEdit.location}
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
                    defaultValue={itemToEdit.expDate}
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
                    defaultValue={itemToEdit.quantity}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Servings</label>
                    <input placeholder='Servings per Item'
                    type='number'
                    name='servings'
                    onChange={this.handleChange}
                    defaultValue={itemToEdit.servings}
                    min='0'
                    />
                </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Checkbox
                        name='itemOpen'
                        onChange={this.handleChange}
                        defaultValue={itemToEdit.isItemOpen === true ? 'checked' : null}
                        /> 
                        <label>Is this item open?</label>
                        {itemToEdit.isItemOpen === true ? 
                            <Form.Field>
                            <label>Date Opened</label>
                            <input placeholder='Date Item Was Opened'
                                type='date'
                                name='openedOn'
                                onChange={this.handleChange}
                                defaultValue={itemToEdit.openedOn}
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
                    Update Item
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