import React, { Component } from 'react'
import { Menu, Dropdown, Link } from 'semantic-ui-react'

class NavBar extends Component {
    state = {
        activeItem: ''
    }

    menuForm = () => {
        const { activeItem, handleItemClick } = this.props;
        return (
            <Menu tabular attached='top'>
                <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item href='/user/Register'>
                        Register
                        </Dropdown.Item> 
                        <Dropdown.Item href="/user/Login">
                        Login
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
    render() {
        return (
            <div>
                {this.menuForm}
            </div>
        )
    }
}

export default NavBar;