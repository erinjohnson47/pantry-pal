import React, { Component } from 'react';
import CreatePantryItem from '../CreatePantryItem'
import PantryList from '../PantryList'

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
        console.log(this.state, 'this.state in render')
        return (
            <div>
                <CreatePantryItem />
                <PantryList pantryItems={this.state.pantryItems}/>
            </div>
        )
    }
}

export default PantryContainer;