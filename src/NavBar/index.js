import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import PantryContainer from '../PantryContainer';


class NavBar extends Component {
    state = {
        activeItem: '',
        loggedUser: ''
    }
    
    render() {
        const { activeItem, handleItemClick, handleLogoutClick, loggedUser } = this.props;
        
        console.log(this.state)
        return (
            <div className='navbar'>
            <Menu tabular attached='top'>
                <Dropdown item icon='user' simple>
                    <Dropdown.Menu> 
                    {!loggedUser ? 
                        <div>
                            <Dropdown.Item 
                                href='/user/register'>
                            Register
                            </Dropdown.Item> 
                            <Dropdown.Item 
                                href="/user/login">
                            Login
                            </Dropdown.Item>
                        </div> :
                        <div>
                            <Dropdown.Item 
                                href='/user/logout'
                                onClick={handleLogoutClick}>
                                Logout
                            </Dropdown.Item>
                        </div>
                    }
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item 
                    href='/'
                    active={activeItem === 'Home'}
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
                {/* <Menu.Menu position='right'>
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
                </Menu.Menu> */}
            </Menu>
        </div>
        )
    }
}

export default withRouter(NavBar);