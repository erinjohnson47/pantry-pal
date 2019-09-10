import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Card, Button } from 'semantic-ui-react'

const PantryList = ({ filteredItems, activeItem, handleDeleteClick, allPantryItems }) => {
    console.log(filteredItems, 'filteredItems destructured from PantryList')
    console.log(activeItem, 'filteredItems destructured from PantryList')
    console.log(handleDeleteClick, 'handleDeleteClick destructured from PantryList')
    console.log(allPantryItems, 'allPantryItems destructured from PantryList')
    //function to set card color based on location
    const cardColor = {
        Refrigerator: "teal",
        Freezer: "purple",
        Pantry: "yellow"
        }
    //function to map through each array (fridge, freezer, pantry)
    const pantryMap = element => {
        return (
            <div key={element._id}>
            <Card.Group>
            <Card
                color={cardColor[activeItem]}>
                <Card.Content>
                    <Card.Header>{element.item}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <p>Expires: {new Date(element.expDate).toLocaleDateString()}</p>
                    { element.quantity === 0 && !(element.shoppingList) ? 
                    <p>"This element is out of stock, would you like to add it to your Shopping List?"</p>: 
                    <p>Quantity: {element.quantity}</p> }
                    <p>Servings per container: {element.servings}</p>
                <div>Notes:  
                { element.itemOpen ? 
                <p>This item was opened on {new Date(element.openedOn).toLocaleDateString()}</p>: 
                <p>This item is unopened.</p>
                }
                { element.outOfStock ? `You have run out of this item` : null}
                { element.shoppingList ? `This item is on your shoppinglist. ` : `This item is currently not on your shopping list. `}</div>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button 
                        basic 
                        color='green'>
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
    console.log(itemList, 'itemList in PantryList')
    const allItemList = allPantryItems.sort(alphaSort).map(pantryMap);
    console.log(allItemList, 'allItemList in PantryList')
    console.log(filteredItems, 'filteredItems destructured from PantryList')
    console.log(activeItem, 'filteredItems destructured from PantryList')
    console.log(handleDeleteClick, 'handleDeleteClick destructured from PantryList')
    console.log(allPantryItems, 'allPantryItems destructured from PantryList')
    
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
        </div>
        )
}

//need to add an "all pantry" option that does not distinguish between location (add location back to mapfunction for this)

export default PantryList;