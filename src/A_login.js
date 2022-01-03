import  React,  { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Redirect } from "react-router"
// import { useHistory } from "react-router-dom"
import { UserContext } from "./App"
import cookies from 'react-cookies';
// import API, { AuthAPI, endpoints } from "./API"
// import cookies from 'react-cookies'

export default function A_login(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLogged, setLogged] = useState(false)
    const auth = useContext(UserContext)
   
    const login = async (event) => {
        event.preventDefault() 
        await auth.login(username, password)
        test()
        
    }
    const test = () => {
        if(cookies.load("user") != null){
            setLogged(true)
            props.hideForm(false)     
        }
    }
    // console.log(user)
   

    if(isLogged)
        return <Redirect to="/" />
    else
        return (
            <>
                <h1 class="text-center text-danger">ĐĂNG NHẬP</h1>
                <Form onSubmit={login}>
                    <LoginForm id="username" type="text" field={username} change={event => setUsername(event.target.value)}/>
                    <LoginForm id="password" type="password" field={password} change={event => setPassword(event.target.value)}/>
                    <Button type="submit" >Login</Button>
                </Form>
            </>
        )
}

class LoginForm extends React.Component {
    render() {
        return(
            <Form.Group controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field} onChange={this.props.change}/>
            </Form.Group>
        )
    }
}