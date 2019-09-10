import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { withRouter } from 'react-router';
import { Button, Header, Modal, Form } from 'semantic-ui-react'

const baseUrl = process.env.REACT_APP_BACKEND_URL

class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
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
            email: ''
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const registerUser = await fetch(`${baseUrl}/user/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jsonRegister = await registerUser.json();
        //props from app.js
        const { setUser } = this.props
        if(jsonRegister.status.message === "User is logged in") {
            {setUser(jsonRegister.data)}
            console.log('logged in')
            this.props.history.push('/pantry')
            this.closeModal();
        }
    }
    registerForm = () => {
    return (
        <Modal
            open={this.state.modalOpen}
            trigger={<Button onClick={this.handleOpen}>Register</Button>} closeIcon>
            <Header 
                icon='user' 
                content='Register' />
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
            <Form.Field>
            <div className="ui form">
                <div className="required field">
                    <label>Email</label>
                        <input 
                            required
                            placeholder='Email Address'
                            type='email'
                            name='email'
                            onChange={this.handleChange}
                            value={this.state.email}
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
                    Register
                </Button>
            </Modal.Actions>
        </Modal>
    )
    }  
    render() {
        return (
            <div>
                {this.registerForm()}       
            </div>
        )
    }
}

export default withRouter(Register);
