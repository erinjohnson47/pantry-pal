import React from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { Button, Header, Icon, Modal, Form, Dropdown, Item } from 'semantic-ui-react'

const PantryList = (props) => {
    //function to map through each array (fridge, freezer, pantry)
    const pantryMap = element => {
        return (
            <div key={element._id}>
                <h3>{element.item}</h3>
                    <p>Expires: {element.expDate}</p>
                    { element.quantity === 0 && !(element.shoppingList) ? 
                    <p>"This element is out of stock, would you like to add it to your Shopping List?"</p>: 
                    <p>Quantity: {element.quantity}</p> }
                    <p>Servings per container: {element.servings}</p>
                <div>Notes:  
                { element.itemOpen ? 
                <p>This item was opened on {element.openedOn}</p>: 
                <p>This item is unopened.</p>
                }
                { element.outOfStock ? `You have run out of this item` : null}
                { element.shoppingList ? `This item is on your shoppinglist. ` : `This item is currently not on your shopping list. `}</div>
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
    const itemList = props.filteredItems.sort(alphaSort).map(pantryMap);
    
    return(
        <div>
            <h2>{props.activeItem}</h2>
            {itemList}
        </div>
        )
}

//need to add an "all pantry" option that does not distinguish between location (add location back to mapfunction for this)

export default PantryList;