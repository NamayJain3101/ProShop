import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import OrderScreen from './Screens/orderScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductScreen from './Screens/ProductScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' exact component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
