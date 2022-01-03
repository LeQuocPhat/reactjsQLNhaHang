import React from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css'
import API, { endpoints } from './API';


class A_Register extends React.Component {
    constructor() {
        super()
        this.user = {
            'first_name':'',
            'last_name':'',
            'username':'',
            'email':'',
            'password':'',
            'confirm_password':'',
        }
        this.avatar = React.createRef()
        this.state = {
            'user': this.user
        }
    }

    change = (field, event) =>{
        this.user[field] = event.target.value
        this.setState({
            'user' : this.user
        })
    }

    register = async (event) => {
        event.preventDefault()
        if(this.state.user.password === this.state.user.confirm_password) {
            const formData = new FormData()
            for(let k in this.state.user)
                if(k !== 'confirm_password')
                    formData.append(k, this.state.user[k])

            formData.append('avatar', this.avatar.current.files[0])
            API.post(endpoints['users'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.info(res)
                alert("Success")
                // let bool = true
                this.props.hideForm(false)     
            }).catch(err =>{console.error(err)
                alert("Please fill all fields")
        })}
        
    }

    render() {
        return(
            <>
            <h1 class="text-center text-danger"> ĐĂNG KÝ</h1>
                <Form onSubmit={this.register}> 
                        <RegisterForm id="email" label="Email" type="email" field={this.state.user.email} change={this.change.bind(this, 'email')}/>
                        <RegisterForm id="firstName" label="First Name" type="text" field={this.state.user.first_name} change={this.change.bind(this, 'first_name')}/>
                        <RegisterForm id="lastName" label="Last Name" type="text" field={this.state.user.last_name} change={this.change.bind(this, 'last_name')}/>
                        <RegisterForm id="userName" label="User Name" type="text" field={this.state.user.user_name} change={this.change.bind(this, 'username')}/>
                        <RegisterForm id="password" label="Password" type="password" field={this.state.user.password} change={this.change.bind(this, 'password')}/>
                        <RegisterForm id="confirmPassword" label="Confirm Password" type="password" field={this.state.user.confirm_password} change={this.change.bind(this, 'confirm_password')}/>
                        <Form.Group controlId='avatar'>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type='file' ref={this.avatar}/>
                        </Form.Group>   
                        <Button variant="primary" type="submit" >ĐĂNG KÝ</Button>
                </Form>
            </>
        )
    }
}

class RegisterForm extends React.Component {
    render() {
        return(
            <Form.Group controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field} onChange={this.props.change}/>
            </Form.Group>
        )
    }
}

export default A_Register