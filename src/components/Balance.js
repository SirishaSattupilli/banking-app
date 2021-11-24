import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Balance = () => {

  const [userDetails, setUserDetails] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let getDetails = async () => {
      await axios.get('balance', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(
          res => { setUserDetails(res.data) })
        .catch(
          err => { console.log(err) })
    }

    let getTransactionDetails = async () => {
      await axios.get('transactions', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(
          res => { setTransactionDetails(res.data) })
        .catch(
          err => { console.log(err) })
        .finally(
          () => { setIsLoading(false) })
    }
    getDetails();
    getTransactionDetails();
    setIsLoading(true)
  }, [])

  
  
  let logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login')
  }

  if (isLoading) {
    return <Spinner className="spinner" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }

  return (
    <div align="center">
      <Container>
        <Button
          className='logout'
          onClick={logoutHandler}
          variant="outline-dark">Logout</Button>

        {userDetails && <Card
          style={{ width: '18rem' }}
          className="mx-auto m-5 shadow p-3 mb-5 bg-white rounded">
          <Card.Body>
            <Card.Title>You have</Card.Title>
            <Card.Text className="balance">
              SGD {new Intl.NumberFormat('en-US').format(userDetails.balance)}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem><p>Account Number:<br /><b>{userDetails.accountNo}</b></p></ListGroupItem>
          </ListGroup>
        </Card>}


        <h3 align="left">Your transaction history</h3>
        {transactionDetails.data && transactionDetails.data.map((item, id) =>
          <ListGroup key={id}>
            <ListGroupItem>
              <span className="holder" align="left"><b>{item.transactionType === "transfer" ? item.receipient.accountHolder : item.sender.accountHolder}</b><br />{item.transactionType === "transfer" ? item.receipient.accountNo : item.sender.accountNo}</span>
              <span className={item.transactionType === "transfer" ? "amount-sent" : "amount-received"}><b>{new Intl.NumberFormat('en-US').format(item.amount)}</b></span>
            </ListGroupItem>
          </ListGroup>)}

        <Link to={'/transfer'}><Button variant="dark" className="mx-auto m-5">Make Transfer</Button></Link>
      </Container>
    </div>
  )
}

export default Balance
