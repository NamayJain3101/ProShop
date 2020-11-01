import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import { listProducts } from '../Actions/ProductActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <React.Fragment>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )
                    })}
                </Row>
            )}
        </React.Fragment>
    )
}

export default HomeScreen
