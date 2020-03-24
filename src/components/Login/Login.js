import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    

    const handleSignIn = () => {
        auth.signInWithPassword(email, password)
            .then(res => {
                window.location.pathname = '/';
                console.log(res.user)
            })
            .catch(err=>{
                console.log(err)
            })
       
    }

    const handleSignInWithGoogle = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/';
            })
    }

    const handleChange = e => {
        e.preventDefault();
        if(e.target.name === "email") setEmail(e.target.value)
        else setPassword(e.target.value);
    }

    return (
        <div>
            <h3>Login</h3>
            <hr/><br/>
            <Button onClick={handleSignInWithGoogle}> Signup with Google </Button> <br/>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" required name="email" placeholder="Email" onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" required name="password" placeholder="Password"  onChange={handleChange}  />
                    </Col>
                </Form.Group>
                

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={handleSignIn}>Sign in</Button>
                        </Col>
                    </Form.Group>
            </Form>
        </div>
    );
};

export default Login;