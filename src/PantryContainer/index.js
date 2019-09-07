import React, { Component } from 'react';
import CreatePantryItem from '../CreatePantryItem'
import PantryList from '../PantryList'

const baseUrl = "http://localhost:9000/"

class PantryContainer extends Component {
    state = {
        allPantryItems: [],
        filteredItems: [],
        activeItem: '',
        loggedUser: ''
    }
    componentDidMount = () => {
        this.getPantryItems();
    }



    filterItems = (activeItem) => {
        //use activeItem to determine which item should be filtered to list
        if (activeItem === 'Refrigerator') {
            //filters for items in Refrigerator only
            const fridgeFilter = [...this.state.allPantryItems].filter(item => item.location === "Refrigerator");
            console.log(fridgeFilter)
            this.setState({
                filteredItems: fridgeFilter,
                activeItem: "Refrigerator"
            })

        } else if (activeItem === 'Freezer') {
            //filters for items in Freezer only
            const freezerFilter = [...this.state.allPantryItems].filter(item => item.location === "Freezer") 
            this.setState({
                filteredItems: freezerFilter,
                activeItem: "Freezer"
            })
        } else {
            //filters for items in Pantry only
            const pantryFilter = [...this.state.allPantryItems].filter(item => item.location === "Pantry")
            this.setState({
                filteredItems: pantryFilter,
                activeItem: "Pantry"
            })
        }
    }

    getPantryItems = async () => {
        try {
            const responseGetPantryItems = await fetch(`${baseUrl}pantry`, {
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
                allPantryItems: [...jsonPantryItems.data]
            });
        } catch (err) {
            console.log(err, 'getPantryItems error')
            return err
        }
    }
    render() {
        console.log(this.state.loggedUser, 'this.state.logged user in pantry container')
        return (
            <div>
                <CreatePantryItem loggedUser={this.state.loggedUser}/>
                <PantryList filteredItems={this.state.filteredItems} activeItem={this.state.activeItem}/>
            </div>
        )
    }
}

export default PantryContainer;