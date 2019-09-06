import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import Register from '../Register'
import Login from '../Login'

class NavBar extends Component {
    state = {
        activeItem: ''
    }

    render() {
        const { activeItem, handleItemClick } = this.props;

        return (
            <Menu tabular attached='top'>
                <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Register />
                        </Dropdown.Item> 
                        <Dropdown.Item>
                            <Login />
                        </Dropdown.Item> 
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item 
                    active={activeItem === 'Home'}
                    onClick={handleItemClick}
                    >
                    Home
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === 'Pantry'}
                    onClick={handleItemClick}
                    >
                    Pantry
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === 'Refrigerator'}
                    onClick={handleItemClick}
                    >
                    Refrigerator
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === 'Freezer'}
                    onClick={handleItemClick}
                    >
                    Freezer
                </Menu.Item>
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                        <div className='ui transparent icon input'>
                            <input
                                className='prompt'
                                type='text'
                                placeholder='Search your pantry...'
                            />
                        <i className='search link icon' />
                        </div>
                    <div className='results' />
                    </div>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default NavBar;