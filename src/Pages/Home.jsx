import React from 'react';
import NavBar from '../Components/NavBar';
import Auth from './Auth';
import NewEvent from '../Components/NewEvent';

const Home = () => {
	return (
		<div>
			<NavBar />
			{/* <Auth /> */}
			<NewEvent />
		</div>
	);
};

export default Home;
