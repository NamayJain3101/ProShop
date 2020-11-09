import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserDetails({
                id: user._id,
                name,
                email,
                password
            }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
