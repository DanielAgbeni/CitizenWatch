import React from 'react';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import NewEvent from './Components/NewEvent';

const App = () => {
	return (
		<div>
			<NavBar />
			<div>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/signup'
						element={<Auth />}
					/>
					<Route
						path='/uploadevent'
						element={<NewEvent />}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
