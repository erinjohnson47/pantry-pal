import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import Register from '../Register'
import Login from '../Login'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
    }

    // handleItemClick = (e) => this.setState({ activeItem: e.target.name })

    render() {
        const { activeItem } = this.props;
        console.log(activeItem, 'activeItem in render in NavBar')

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
                    active={activeItem === 'Pantry'}
                    onClick={this.props.handleItemClick}
                    >
                    Pantry
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === 'Refrigerator'}
                    onClick={this.props.handleItemClick}
                    >
                    Refrigerator
                </Menu.Item>
                <Menu.Item 
                    active={activeItem === 'Freezer'}
                    onClick={this.props.handleItemClick}
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