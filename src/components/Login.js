import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom';

const Login = () => {

    const [details, setDetails] = useState({ userName: "", password: "" });
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault();
        const data = {
            username: details.userName,
            password: details.password
        }
        await axios.post('login', data).then(
            res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                setLoggedIn(true)
            }
        ).catch(
            err => {
                setError(err.response.data.error)
            })
    }

    if (loggedIn) {
        return <Navigate to={'/balance'} />
    }

    let errorMessage = "";
    if (error) {
        errorMessage = (<Alert variant="danger">{error}</Alert>)
    }

    return (
        <div>
            <Container>
                <h1 className="link">Login</h1>

                <Form>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="name@example.com"
                            onChange={e => setDetails({ ...details, userName: e.target.value })}
                            value={details.userName}
                        />
                        <label htmlFor="floatingInputCustom">Username</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setDetails({ ...details, password: e.target.value })}
                            value={details.password}
                        />
                        <label htmlFor="floatingPasswordCustom">Password</label>
                    </Form.Floating>
                </Form>

                {error ? errorMessage : ""}

                <div>
                    <Button variant="dark" size="lg" className="btn mb-3" onClick={loginHandler}>Login</Button>
                    <Link to="/"><Button variant="outline-dark" size="lg" className="btn">Register</Button></Link>
                </div>

            </Container>
        </div>
    )
}

export default Login
