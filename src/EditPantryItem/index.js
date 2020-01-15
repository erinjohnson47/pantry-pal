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
        modalOpen: false,
        loggedUser: '',
        itemToEdit: ''
    }
    updatePantryItem = () => {
        const {modalOpen, itemToEdit, modalClose } = this.props;
        return (
            <Modal
                closeIcon
                closeOnDimmerClick
                closeOnEscape
                onClose={modalClose}
                open={modalOpen}
                trigger={<Button onClick={this.handleOpen}>Edit Item</Button>} 
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
                                value={itemToEdit.item}
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
                    value={itemToEdit.expDate}
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
                    value={itemToEdit.quantity || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Servings</label>
                    <input placeholder='Servings per Item'
                    type='number'
                    name='servings'
                    onChange={this.handleChange}
                    value={itemToEdit.servings || ''}
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
                        {itemToEdit.isItemOpen === true ? 
                            <Form.Field>
                            <label>Date Opened</label>
                            <input placeholder='Date Item Was Opened'
                                type='date'
                                name='openedOn'
                                onChange={this.handleChange}
                                value={itemToEdit.openedOn}
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