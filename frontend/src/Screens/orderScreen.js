import React from 'react'
import axios from 'axios'
import uuid from 'react-uuid'
import { PayPalButton } from 'react-paypal-button-v2'
import { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrder, getOrderDetails, payOrder } from '../Actions/orderActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useState } from 'react'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if (userInfo) {
            const addPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
            if (!order || (order._id !== orderId) || successPay || successDeliver) {
                dispatch({ type: ORDER_PAY_RESET })
                dispatch({ type: ORDER_DELIVER_RESET })
                dispatch(getOrderDetails(orderId))
            } else if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript()
                } else {
                    setSdkReady(true)
                }
            }
        } else {
            history.push('/login')
        }

    }, [dispatch, orderId, successPay, order, successDeliver, userInfo, history])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const codPaymentHandler = () => {
        dispatch(payOrder(orderId, {
            id: uuid(),
            status: "COMPLETED",
            payer: {
                email_address: userInfo.email
            },
            update_time: Date.now()
        }))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <React.Fragment>
                {userInfo && userInfo.isAdmin && <Link to='/admin/orderlist' className='btn btn-light my-3'>Go Back</Link>}
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name.toUpperCase()}</p>
                                <p>
                                    <strong>Email: </strong>
                                    <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered
                                    ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                    : <Message variant='danger'>Not Delivered</Message>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid && order.paymentMethod !== 'COD'
                                    ? <Message variant='success'>Paid on {order.paidAt}</Message>
                                    : (order.isPaid && order.paymentMethod === 'COD')
                                        ? <Message variant='success'>Pay On Delivery</Message>
                                        : <Message variant='danger'>Not Paid</Message>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => {
                                            return (
                                                <ListGroupItem key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x &#8377;{item.price} =  &#8377;{item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        })}
                                    </ListGroup>
                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2>Order Summary</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>&#8377;{order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>&#8377;{order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>&#8377;{order.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>&#8377;{order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                {!order.isPaid && (order.paymentMethod === 'PayPal') && (
                                    <ListGroupItem>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton amount={order.totalPrice} currency='INR' onSuccess={successPaymentHandler} />
                                        )}
                                    </ListGroupItem>
                                )}
                                {!order.isPaid && (order.paymentMethod === 'COD') && (
                                    <ListGroupItem>
                                        <Button onClick={codPaymentHandler} className='btn btn-block'>Pay On Delivery</Button>
                                    </ListGroupItem>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark as Delivered
                                        </Button>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    )
}

export default OrderScreen
