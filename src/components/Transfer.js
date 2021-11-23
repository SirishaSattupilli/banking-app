import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'

const Transfer = () => {

    const [payees, setPayees] = useState([]);

    useEffect(() => {
        let getPayees = async () => {
            await axios.get('/payees').then(
                res => {
                    setPayees(res.data)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
        getPayees();
    }, [])

    console.log(payees)

    return (
        <div>
            <Container>
                <Row>
                    <Col><Link to={"/balance"} className="link"><BsFillArrowLeftSquareFill size="2em" /></Link></Col>
                    <h1>Transfer</h1>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Select aria-label="Default select example" className="mb-3">
                                {payees.data && payees.data.map((item, id) => <option key={id}>{item.name}</option>)}
                            </Form.Select>
                            <FloatingLabel controlId="floatingTextarea" label="Amount" className="mb-3">
                                <Form.Control as="textarea" placeholder="Leave a comment here" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-grid">
                            <Button variant="dark" size="lg">
                                Transfer
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Transfer
