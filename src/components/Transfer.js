import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
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


    return (
        <div>
            <Container>
                <Link to={"/balance"} ><BsFillArrowLeftSquareFill size="2em" className="link" /></Link>
                <h1>Transfer</h1>

                <Form>
                    <Form.Select 
                    aria-label="Default select example" 
                    className="mb-3">
                        {payees.data && payees.data.map((item, id) => <option key={id}>{item.name}</option>)}
                    </Form.Select>

                    <FloatingLabel label="Amount" className="mb-3">
                        <Form.Control 
                        as="input" 
                        type="number" 
                        min="0" 
                        placeholder="Amount" />
                    </FloatingLabel>

                    <FloatingLabel label="Description" className="mb-5">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Form>
                
                <div className="d-grid">
                    <Button variant="dark" size="lg">
                        Transfer
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default Transfer
