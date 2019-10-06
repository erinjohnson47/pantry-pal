import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    state = {
        activeItem: '',
        loggedUser: ''
    }
    
    render() {
        const { activeItem, handleItemClick, handleLogoutClick, loggedUser } = this.props;
        
        return (
            <div >
            <Menu tabular attached='top' id='pantryNavbar'>
                <Dropdown item icon='user' simple>
                    <Dropdown.Menu> 
                    {!loggedUser ? 
                        <div>
                            <Dropdown.Item>
                                <Link to='/user/register'>Register</Link>
                            </Dropdown.Item> 
                            <Dropdown.Item> 
                                <Link to="/user/login">Login</Link>
                            </Dropdown.Item>
                        </div> :
                        <div>
                            <Dropdown.Item 
                                href='#'
                                onClick={handleLogoutClick}>
                                Logout
                            </Dropdown.Item>
                        </div>
                    }
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item 
                    active={activeItem === 'Home'}>
                    <Link to="/">Home</Link>
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