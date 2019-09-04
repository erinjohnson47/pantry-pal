import React, { Component } from 'react';
import CreatePantryItem from '../CreatePantryItem'

class PantryContainer extends Component {
    state = {
        pantryItems: []
    }
    componentDidMount = () => {
        this.getPantryItems();
    }

    getPantryItems = async () => {
        try {
            const responseGetPantryItems = await fetch('http://localhost:9000/pantry', {
                credentials: 'include',
                method: 'GET'
            })
            console.log(responseGetPantryItems, '<-responseGetPantryItems')

            if(responseGetPantryItems.status !== 200) {
                throw Error('404 from server')
            }
            const jsonPantryItems = await responseGetPantryItems.json();
            console.log(jsonPantryItems, 'jsonPantryItems in getPantryItems')
            
            this.setState({
                pantryItems: [...jsonPantryItems.data]
            });
        } catch (err) {
            console.log(err, 'getPantryItems error')
            return err
        }
    }
    render() {
        return (
            <div>
                <CreatePantryItem />

            </div>
        )
    }
}

export default PantryContainer;