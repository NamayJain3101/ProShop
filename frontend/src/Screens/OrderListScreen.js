import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Button, Table } from 'react-bootstrap'
import { listOrders } from '../Actions/orderActions'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({
            type: ORDER_DETAILS_RESET
        })
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history])

    return (
        <React.Fragment>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>USER</td>
                            <td>DATE</td>
                            <td>TOTAL PRICE</td>
                            <td>PAID</td>
                            <td>DELIVERED</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='primary' className='btn-sm'>Details</Button>
                                        </LinkContainer>
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

export default OrderListScreen