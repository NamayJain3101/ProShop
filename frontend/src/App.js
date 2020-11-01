import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' exact component={HomeScreen} />
					<Route path='/product/:id' component={ProductScreen} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
