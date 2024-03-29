import React from 'react';
import NavBar from '../Components/NavBar';
import Auth from './Auth';
import NewEvent from '../Components/NewEvent';
import Feed from '../Components/Feed';
import { Link } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import { useStateValue } from '../Context/StateProvider';

const Home = () => {
	const [{ user }] = useStateValue();
	return (
		<div className=' flex flex-col mt-10 pt-10 items-center justify-center'>
			{user !== null ? (
				<div className='mb-2'>
					<Link to={'/uploadevent'}>
						<div className='px-2 py-1 rounded-xl hover:bg-white hover:text-black border-black border flex items-center justify-center text-2xl gap-2 bg-black text-white w-fit'>
							Upload event <FaUpload />
						</div>
					</Link>
				</div>
			) : (
				'Sign in to upload Incident'
			)}

			<Feed />
		</div>
	);
};

export default Home;
