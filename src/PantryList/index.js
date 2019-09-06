import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Card, Button } from 'semantic-ui-react'

const PantryList = ({ filteredItems, activeItem }) => {
    //function to set card color based on location
    const cardColor = (location) => {
        switch(location) {
            case 'Refrigerator' :
                return "teal";
            case "Freezer" :
                return "purple";
            case "Pantry" :
                return "yellow";
            default:
                return null;
        }
    }
    //function to map through each array (fridge, freezer, pantry)
    const pantryMap = element => {
        return (
            <div key={element._id}>
            <Card.Group itemsPerRow={3}>
            <Card
                color={cardColor(activeItem)}>
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
                        color='red'>
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

        let compare = 0;
        if (itemA > itemB) {
            compare = 1;
        } else if (itemA < itemB) {
            compare = -1;
        }
        return compare;
    }

    //invoke pantryMap function passing each filtered array as argument with sort function called
    const itemList = filteredItems.sort(alphaSort).map(pantryMap);
    
    return(
        <div>
            <h2>{activeItem}</h2>
            {itemList}
        </div>
        )
}

//need to add an "all pantry" option that does not distinguish between location (add location back to mapfunction for this)

export default PantryList;