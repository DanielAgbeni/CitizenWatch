import React from 'react';
import logo from '/logo.png';
import { FaRegUserCircle } from 'react-icons/fa';
import { useStateValue } from '../Context/StateProvider';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const [{ user }, dispatch] = useStateValue();
	// console.log(user);
	return (
		<div className=' flex items-center justify-between px-10 py-5 md:py-3 absolute top-0 w-full'>
			<Link to={'/'}>
				<div className=' flex items-center justify-center gap-2'>
					<img
						src={logo}
						alt=''
						className=' h-10 w-10 rounded-full'
					/>
					<h1 className=' font-semibold text-xl'>CitizenWatch</h1>
				</div>
			</Link>

			<div className=' text-4xl flex items-center justify-center gap-2'>
				<p className=' text-xl hidden md:flex'>
					{user ? user.displayName : ''}
				</p>
				{user && user.photoURL ? (
					<img
						src={user.photoURL}
						alt='Profile'
						className=' h-10 w-10 rounded-full'
					/>
				) : (
					<FaRegUserCircle />
				)}
			</div>
		</div>
	);
};

export default NavBar;
