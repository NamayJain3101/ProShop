import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Button, Table } from 'react-bootstrap'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <React.Fragment>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>EMAIL</td>
                            <td>ADMIN</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='primary' className='btn-sm'><FaEdit /></Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    )
}

export default UserListScreen