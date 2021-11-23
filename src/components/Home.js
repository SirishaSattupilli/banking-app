import React, { useState } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';

function Home() {
    const [details, setDetails] = useState({ userName: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")

    //const {userName, password} = registeredUser
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
                <Row>
                    <Col><Link to={"/login"} className="link"><BsFillArrowLeftSquareFill size="2em" /></Link></Col>
                    <h1>Register</h1>
                </Row>
                <Row>
                    <Col>
                        <>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="text"
                                    placeholder="name@example.com"
                                    onChange={e => setDetails({ ...details, userName: e.target.value })}
                                    value={details.userName}
                                />
                                <label htmlFor="floatingInputCustom">Username</label>
                            </Form.Floating>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingPasswordCustom1"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setDetails({ ...details, password: e.target.value })}
                                    value={details.password}
                                />
                                <label htmlFor="floatingPasswordCustom">Password</label>
                            </Form.Floating>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingPasswordCustom2"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setDetails({ ...details, confirmPassword: e.target.value })}
                                    value={details.confirmPassword}
                                />
                                <label htmlFor="floatingPasswordCustom">Confirm Password</label>
                            </Form.Floating>
                        </>
                        {error ? errorMessage : ""}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-grid">
                            <Button variant="dark" size="lg" onClick={registerHandle}>
                                Register
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Home
