import React, { Component } from 'react';
// import { register } from '../serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'


class Register extends Component {
    state = {
        username: '',
        password: '',
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const registerUser = await fetch('http://localhost:9000/user/register', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jsonRegister = await registerUser.json();
        console.log(registerUser, 'registerUser')
        console.log(jsonRegister, 'jsonRegister')
        if(jsonRegister.status.message === "User is logged in") {
            console.log('logged in')
            // this.props.history.push('/pantry')
        }
    }

    registerForm = () => {
    return (
        <Modal 
                trigger={<Button>Register</Button>} closeIcon>
                <Header 
                    icon='user' 
                    content='Register' />
        <Modal.Content>
            <Form>
                <Form.Field>
                <label>Username</label>
                <input placeholder='Username'
                type='text'
                name='username'
                onChange={this.handleChange}
                value={this.state.username}
                />
                </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input 
                placeholder='Password'
                type='password'
                name='password'
                onChange={this.handleChange}
                value={this.state.password}
                />
            </Form.Field>
            <Form.Field>
            <label>Email</label>
            <input 
                placeholder='Email Address'
                type='email'
                name='email'
                onChange={this.handleChange}
                value={this.state.email}
                />
            </Form.Field>
        </Form>
        </Modal.Content>
            <Modal.Actions>
                <Button 
                    type='Submit'
                    primary
                    onClick={this.handleSubmit}>
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

export default Register;
