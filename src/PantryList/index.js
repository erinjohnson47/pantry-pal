import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Card, Button } from 'semantic-ui-react'
import EditPantryItem from '../EditPantryItem'

const PantryList = ({ filteredItems, activeItem, handleDeleteClick, allPantryItems, handleOpen, itemToEdit, modalOpen, modalClose }) => {

    //function to set card color based on location
    const cardColor = {
        Refrigerator: "teal",
        Freezer: "purple",
        Pantry: "yellow"
        }

    //change date display
    const changeDateDisplay = (date) => {
        let thisDate = new Date(date);
        let day = thisDate.getDate();
        let month = thisDate.getMonth()+1;
        let year = thisDate.getFullYear();
        return `${month}/${day}/${year}` 
    }

    //function to map through each array (fridge, freezer, pantry)
    const pantryMap = element => {
        return (
            <div id='pantryCard' key={element._id}>
            <Card.Group>
            <Card
                color={cardColor[activeItem]}>
                <Card.Content>
                    <Card.Header>{element.item}</Card.Header>
                </Card.Content>
                <Card.Content>
                    {
                        activeItem ? 
                        null : 
                        <p>Location: {element.location}</p>
                    }
                    <p>Expires: {changeDateDisplay(element.expDate)}</p>
                    { element.quantity === 0 && !(element.shoppingList) ? 
                    <p>"This element is out of stock, would you like to add it to your Shopping List?"</p>: 
                    <p>Quantity: {element.quantity}</p> }
                    <p>Servings per container: {element.servings}</p>
                <div>Notes:  
                { element.isItemOpen ? 
                <p>This item was opened on {changeDateDisplay(element.openedOn)}</p>: 
                <p>This item is unopened.</p>
                }
                { element.outOfStock ? `You have run out of this item` : null}
                </div>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button 
                        basic 
                        color='green'
                        onClick={handleOpen.bind(null, {itemToEdit: element, modal: "edit"})}>
                        Edit
                    </Button>
                    <Button 
                        basic 
                        color='red'
                        onClick={handleDeleteClick.bind(null, element._id)}>
                        Delete
                    </Button>
                    </div>
                </Card.Content>
            </Card>
            </Card.Group>
            </div>
        )
    }
    //function to sort the arrays alphabetically (**use this to create buttons to sort by alpha, exp date, etc.**)
    const alphaSort = (a,b) => {
        const itemA = a.item.toLowerCase();
        const itemB = b.item.toLowerCase();
        if (itemA > itemB) {
            return 1;
        } else if (itemA < itemB) {
            return -1;
        } else {
            return 0
        }
    }

    //invoke pantryMap function passing each filtered array as argument with sort function called
    
    const itemList = filteredItems.sort(alphaSort).map(pantryMap);
    const allItemList = allPantryItems.sort(alphaSort).map(pantryMap);

    return(
    
        <div>
        {
            activeItem ?
            <div> 
            <h2>{activeItem}</h2>
            {itemList}
            </div> :
            <div><h2>All Pantry Items</h2>
            {allItemList}
            </div>
            
        }
        {modalOpen === "edit" ? 
            <EditPantryItem 
                modalOpen={modalOpen}
                handleOpen={handleOpen}
                itemToEdit={itemToEdit}
                modalClose={modalClose} 
            /> 
        : null}
        </div>
        )
}

//need to add an "all pantry" option that does not distinguish between location (add location back to mapfunction for this)

export default PantryList;