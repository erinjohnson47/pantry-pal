import React from 'react';
import 'semantic-ui-css/semantic.min.css'
// import { Button, Header, Icon, Modal, Form, Dropdown, Item } from 'semantic-ui-react'

const PantryList = (props) => {
    //filter props into separate arrays for item.location === fridge, item.location === freezer, item.location === pantry, then map those arrays
    //also have an "all pantry" option that does not distinguish between location
    const allPantry  = props.pantryItems.map((item) => {
        return (
            <div key={item._id}>
            <h3>{item.item}</h3>
                <ul>
                <li>{item.location}</li>
                <li>Expires: {item.expDate}</li>
                <li>Quantity: {item.quantity}</li>
                {/* {
                    item.quantity = 0 && item.outOfStock ?
                    "This item is out of stock, would you like to add it to your Shopping List?"
                    : "Quantity:"  
                } */}
                <li>Servings per container: {item.servings}</li>
            <p>Notes:  
            { item.itemOpen ? ' This item was opened on {add openedOn}' : ' Item is unopened. ' 
            }
            { item.outOfStock ? `You have run out of this item` : null}
            { item.shoppingList ? `This item is on your shoppinglist. ` : `This item is currently not on your shopping list. `}</p>
                </ul>
            </div>
        )
    })
    // const fridgeList = allPantry.filter((item) => {item.location === 'refrigerator'})
    return(
        <div>
            {allPantry}
            <h2>Refrigerator</h2>
            {/* {fridgeList} */}
            <h2>Freezer</h2>

            <h2>Pantry</h2>

        </div>
    )
}

export default PantryList;