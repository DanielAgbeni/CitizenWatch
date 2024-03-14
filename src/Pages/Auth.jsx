import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { app } from '../../firebase';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from 'firebase/auth';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const [{ user }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const signin = async () => {
		const {
			user: { refreshToken, providerData },
		} = await signInWithPopup(auth, provider);
		dispatch({
			type: actionType.SET_USER,
			user: providerData[0],
		});
		localStorage.setItem('user', JSON.stringify(providerData[0]));
		navigate('/');
	};
	const signout = () => {
		localStorage.clear();
		signOut(auth).then(() => {
			navigate('/');
		});
		dispatch({
			type: actionType.SET_USER,
			user: null,
		});
	};
	return (
		<div className=' flex items-center justify-center w-screen h-screen'>
			<div
				className='flex items-center justify-center gap-3 border w-fit px-3 py-2 border-black rounded-2xl cursor-pointer hover:bg-slate-300'
				onClick={user ? signout : signin} // Conditionally call signout or signin based on user's presence
			>
				<div className='flex items-center justify-center text-3xl'>
					<FcGoogle />
				</div>
				<p className='font-semibold text-xl'>
					{user ? 'Sign out' : 'Sign In with Google'}
				</p>
			</div>
		</div>
	);
};

export default Auth;
