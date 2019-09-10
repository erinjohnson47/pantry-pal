import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router';
import { Button, Header, Modal, Form } from 'semantic-ui-react'

const baseUrl = process.env.REACT_APP_BACKEND_URL

class Login extends Component {
    state = {
        username: '',
        password: '',
        modalOpen: false,
        loggedUser: ''
    }
    
    handleOpen = () => {
        this.setState({
            modalOpen: true
        })
    }
    closeModal = () => {
        this.setState({
            modalOpen: false,
            username: '',
            password: '',
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const loginUser = await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jsonLogin = await loginUser.json();
        //props from app.js
        const { setUser, getPantryItems } = this.props
        console.log(loginUser, 'loginUser')
        console.log(jsonLogin, 'jsonLogin')
        if(jsonLogin.status.message === "User is logged in") {
            {setUser(jsonLogin.data)}
            console.log('logged in')
            this.props.history.push('/pantry')
            this.closeModal();
            getPantryItems();
        }
    }
    loginForm = () => {
    return (
        <Modal
            open={this.state.modalOpen}
            trigger={<Button onClick={this.handleOpen}>Login</Button>} closeIcon>
            <Header 
                icon='user' 
                content='Login' />
        <Modal.Content>
            <Form>
                <Form.Field>
                    <div className="ui form">
                        <div className="required field">
                            <label>Username</label>
                            <input placeholder='Username'
                            required
                            type='text'
                            name='username'
                            onChange={this.handleChange}
                            value={this.state.username}
                            />
                        </div>
                    </div>
                </Form.Field>
            <Form.Field>
                <div className="ui form">
                    <div className="required field">
                    <label>Password</label>
                        <input 
                            required
                            placeholder='Password'
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                </div>
            </Form.Field>
        </Form>
        </Modal.Content>
            <Modal.Actions>
                <Button 
                    type='Submit'
                    primary
                    onClick={this.handleSubmit}
                    >
                    Login
                </Button>
            </Modal.Actions>
        </Modal>
    )
    }  
    render() {
        return (
            <div>
                {this.loginForm()}
            </div>
        )
    }
}

export default withRouter(Login);
