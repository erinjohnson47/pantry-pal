import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react'

const baseUrl = process.env.REACT_APP_BACKEND_URL

const locationOptions = [
    { key: 'refrigerator', text: 'Refrigerator', value: 'refrigerator' },
    { key: 'freezer', text: 'Freezer', value: 'freezer' },
    { key: 'pantry', text: 'Pantry', value: 'pantry' }
]

// const { modalClose, modalOpen, handleOpen, getPantryItems } = this.props;

class CreatePantryItem extends Component {
    state = {
        item: "",
        location: "",
        expDate: "",
        quantity: '',
        servings: '',
        isItemOpen: false,
        openedOn: "",
        modalOpen: '',
        loggedUser: '',
        //added below for API call to food database
        // searchTerm: '',
        // foundItems: [],
        // error: null,
        // isLoaded: false,
        // foodId: ''
    }

    // componentDidMount() {
    //     if (this.state.searchTerm) {
    //         fetch(`https://api.nal.usda.gov/fdc/v1/search?`, {
    //             "api_key": process.env.API_KEY,
    //             "generalSearchInput": this.state.searchTerm,
    //             "requireAllWords": true
    //         })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     foundItems: result.foods
    //                 })
    //             }
    //         )
    //     } else {
    //         fetch(`https://api.nal.usda.gov/fdc/v1/${this.state.foodId}?`, {
    //             "api_key": process.env.API_KEY,
    //         })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     foundItems: result.foods
    //                 })
    //             }
    //         )
    //     }
    // }
    
    //date is going into DB as UTC at 00:00:000UTC, so when it comes out of the db and corrects for local time zone it displays the date as one day earlier - to correct this, the date format yyyy-mm-dd will be changed to yyyy/mm/dd because the db will still accept this as an ISOdate, but the browser will not auto-convert to local timezone, thus correcting the incorrect date display
    changeDateFormat = (expDate, openedOn) => {
        if (expDate) {
            let newExpDate = expDate.replace(/-/g, '/');
            this.setState(({
                expDate: newExpDate,
            }, () => {
                console.log(this.state, "state after date format updated")
            }))

        }
        if (openedOn) {
            let newOpenedDate = openedOn.replace(/-/g, '/');
            this.setState(({
                openedOn: newOpenedDate
            }, () => {
                console.log(this.state, "state after date format updated")
            }))
        }
    }

    handleChange = (e) => {
        if (e.target.name === 'expDate') {
            let newDate = e.target.value.replace(/-/g, '/')
            this.setState({
                [e.target.name]: newDate
            })
        } else if (e.target.name === "openedOn") {
            let newDate = e.target.value.replace(/-/g, '/')
            this.setState({
                [e.target.name]: newDate
            })
        } else if (e.target.name){
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value
            })
        } else if (!e.currentTarget.children[0].innerText) {
            this.setState(prevState => ({
                isItemOpen: !prevState.isItemOpen
            }))
        } else {
            this.setState({
                location: e.currentTarget.children[0].innerText
            })
        }
    }
    handleSubmit = async (e) => {
        const { getPantryItems, modalClose } = this.props;
        e.preventDefault();

        const addPantryItem = await fetch(`${baseUrl}/pantry/`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jsonAddPantry = await addPantryItem.json();
        if(jsonAddPantry.status.message === "Resource successfully created") {
            getPantryItems();
            this.props.history.push('/pantry')
            modalClose();
        }
    }
    addPantryItem = () => {
    const {modalClose, modalOpen, handleOpen} = this.props;
    return (
        <Modal
            closeIcon
            closeOnDimmerClick
            closeOnEscape
            onClose={modalClose}
            open={modalOpen === 'new'}
            trigger={<Button
                onClick={handleOpen.bind(null, { modal: "new" })}>Add an Item to your Inventory
                </Button>} 
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
                            options={locationOptions}
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
                {this.addPantryItem()}       
            </div>
        )
    }
}

export default withRouter(CreatePantryItem);