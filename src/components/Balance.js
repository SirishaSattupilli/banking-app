import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Balance = () => {

    const [userDetails, setUserDetails] = useState({});
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let getDetails = async () => {
            await axios.get('balance').then(
              res => {
                setUserDetails(res.data)
              }
            ).catch(
              err => {
                console.log(err)
              })
          }
        
          let getTransactionDetails = async () => {
            await axios.get('transactions').then(
              res => {
                setTransactionDetails(res.data)
              }
            ).catch(
              err => {
                console.log(err)
              }).finally(() => {
                setIsLoading(false)
              })
          } 
          getDetails();
          getTransactionDetails();
          setIsLoading(true)
    }, [])

    /* useEffect(() => {
        axios.get('balance').then(
            res => {
                setUserDetails(res.data)
                console.log(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            })
        axios.get('transactions').then(
            res => {
                setTransactionDetails(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false)
            })
        setIsLoading(true)
    }, []) */


    /* let getDetails = async () => {
        await axios.get('balance').then(
          res => {
            setUserDetails(res.data)
          }
        ).catch(
          err => {
            console.log(err)
          })
      }
    
      let getTransactionDetails = async () => {
        await axios.get('transactions').then(
          res => {
            setTransactionDetails(res.data)
          }
        ).catch(
          err => {
            console.log(err)
          }).finally(() => {
            setIsLoading(false)
          })
      } */

    let logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/login')
    }

    let transferHandle = async (e) => {
        e.preventDefault()

    }

    if (isLoading) {
        return <Spinner className="mx-auto" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    return (
        <div align="center">
            {/* <Link to={'/login'} onClick={() => logoutHandler}><Button className='logout' variant="outline-dark">Logout</Button></Link> */}
            <Button onClick={logoutHandler} className='logout' variant="outline-dark">Logout</Button>
            <Container>
                <Row>
                    {userDetails && <Card style={{ width: '18rem' }} className="mx-auto m-5">
                        <Card.Body>
                            <Card.Title>You have</Card.Title>
                            <Card.Text className="balance">
                                SGD {new Intl.NumberFormat('en-US').format(userDetails.balance)}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><p>Account Number:<br /><b>{userDetails.accountNo}</b></p></ListGroupItem>
                            <ListGroupItem><p>Account Holder:<br /></p></ListGroupItem>
                        </ListGroup>
                    </Card>}
                </Row>
                <Row>
                    {transactionDetails.data && transactionDetails.data.map((item, id) => <ListGroup key={id}><ListGroupItem><span className="holder"><b>{item.transactionType === "transfer" ? item.receipient.accountHolder : item.sender.accountHolder}</b><br />{item.transactionType === "transfer" ? item.receipient.accountNo : item.sender.accountNo}</span><span className="amount">{item.amount}</span></ListGroupItem></ListGroup>)}
                </Row>
                <Link to={'/transfer'} onClick={() => transferHandle}><Button variant="dark" className="mx-auto m-5">Make Transfer</Button></Link>
            </Container>
        </div>
    )
}

export default Balance
