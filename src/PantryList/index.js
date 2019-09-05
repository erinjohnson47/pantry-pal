import React from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { Button, Header, Icon, Modal, Form, Dropdown, Item } from 'semantic-ui-react'

const PantryList = (props) => {
    //filters for items in Refrigerator only
    const fridgeFilter = props.allPantryItems.filter(item => item.location === "Refrigerator") 
    console.log(fridgeFilter, 'fridgeFilter')

    //filters for items in Freezer only
    const freezerFilter = props.allPantryItems.filter(item => item.location === "Freezer") 
    console.log(freezerFilter, 'freezerFilter')

    //filters for items in Pantry only
    const pantryFilter = props.allPantryItems.filter(item => item.location === "Pantry")
    console.log(pantryFilter, 'pantryFilter') 

    //also have an "all pantry" option that does not distinguish between location

    //function to map through each array (fridge, freezer, pantry)
    const pantryMap = element => {
        return (
            <div key={element._id}>
                <h3>{element.item}</h3>
                <ul>
                    <li>Expires: {element.expDate}</li>
                    {
                        element.quantity = 0 && element.outOfStock ?
                        <p>"This element is out of stock, would you like to add it to your Shopping List?"</p>
                        : <p>Quantity: {element.quantity}</p> 
                    }
                    <li>Servings per container: {element.servings}</li>
                <p>Notes:  
                { element.itemOpen ? 
                <p>This item was opened on {element.openedOn}</p>: 
                <p>This item is unopened.</p>
                }
                { element.outOfStock ? `You have run out of this item` : null}
                { element.shoppingList ? `This item is on your shoppinglist. ` : `This item is currently not on your shopping list. `}</p>
                </ul>
            </div>
        )
    }
    //invoke pantryMap function passing each filtered array as argument
    const fridgeItems = fridgeFilter.map(pantryMap);
    console.log(fridgeItems, '<-fridgeItems')
    
    const freezerItems = freezerFilter.map(pantryMap);
    console.log(fridgeItems, '<-freezerItems')
    
    const pantryItems = pantryFilter.map(pantryMap);
    console.log(pantryItems, '<-pantryItems')
    
    return(
        <div>
            <h2>Refrigerator</h2>
            {fridgeItems}

            <h2>Freezer</h2>
            {freezerItems}

            <h2>Pantry</h2>
            {pantryItems}
        </div>
        )
}

export default PantryList;