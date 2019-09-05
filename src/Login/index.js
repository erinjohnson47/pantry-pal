import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Modal, Form } from 'semantic-ui-react'


class Login extends Component {
    state = {
        username: '',
        password: '',
        modalOpen: false
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
        const loginUser = await fetch('http://localhost:9000/user/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jsonLogin = await loginUser.json();
        console.log(this.state, 'state in login user')
        console.log(loginUser, 'loginUser')
        console.log(jsonLogin, 'jsonLogin')
        if(jsonLogin.status.message === "User is logged in") {
            console.log('logged in')
            // this.props.history.push('/pantry')
            this.closeModal();
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

export default Login;