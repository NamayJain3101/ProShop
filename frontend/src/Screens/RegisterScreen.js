import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../Actions/userActions'
import FormContainer from '../Components/FormContainer'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name: </FormLabel>
                    <FormControl type='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='email'>
                    <FormLabel>Email: </FormLabel>
                    <FormControl type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password: </FormLabel>
                    <FormControl type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='confirmPassword'>
                    <FormLabel>Confirm Password: </FormLabel>
                    <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
