import React, { useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';

function Home() {
    const [details, setDetails] = useState({ userName: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")

    const newUser = {
        username: details.userName,
        password: details.password
    }

    const registerHandle = async e => {
        e.preventDefault();
        await axios.post('register', newUser).then(
            res => {
                setError(res.data.status);
            }
        ).catch(
            err => {
                setError(err.response.data.error)
            }
        )
    }

    let errorMessage = "";
    if (error === 'success') {
        errorMessage = (<Alert variant="success">User Registered Successfully!!</Alert>)
    }else{
        errorMessage = (<Alert variant="danger">{error}</Alert>)
    }

    return (
        <div>
            <Container>
                <Link to={"/login"}><BsFillArrowLeftSquareFill size="2em" className="link"/></Link>
                    <h1>Register</h1>
                        <>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="username"
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
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setDetails({ ...details, confirmPassword: e.target.value })}
                                    value={details.confirmPassword}
                                />
                                <label htmlFor="floatingPasswordCustom">Confirm Password</label>
                            </Form.Floating>
                        </>
                        {error ? errorMessage : ""}
                        <div className="d-grid">
                            <Button variant="dark" size="lg" onClick={registerHandle}>
                                Register
                            </Button>
                        </div>
            </Container>
        </div>
    )
}

export default Home
