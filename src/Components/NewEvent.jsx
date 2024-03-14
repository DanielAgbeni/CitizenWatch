import React, { useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { firestore, storage } from '../../firebase';
import { getAllIncident, saveItem } from '../utils/firebaseFunction';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';
import { doc, setDoc } from 'firebase/firestore';

const NewEvent = () => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [category, setCategory] = useState(null);
	const [location, setLocation] = useState('');
	const [pin, setPin] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [{ incident }, dispatch] = useStateValue();
	const text = 'Location Set';

	const uploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(err) => {
				console.log(err);
				// setFields(true);
				// setMsg('Error while uplading, try again');
				setTimeout(() => {
					// setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setIsLoading(false);
					setTimeout(() => {
						// setFields(false);
						setIsLoading(false);
					}, 4000);
				});
			},
		);
	};

	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);

			setTimeout(() => {
				// setFields(false);
			}, 4000);
		});
	};

	const userLocation = async () => {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;
						const point = {
							latitude,
							longitude,
						};
						console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
						console.log(point);
						resolve(point);
					},
					(error) => {
						switch (error.code) {
							case error.PERMISSION_DENIED:
								console.error('User denied the request for Geolocation.');
								break;
							case error.POSITION_UNAVAILABLE:
								console.error('Location information is unavailable.');
								break;
							case error.TIMEOUT:
								console.error('The request to get user location timed out.');
								break;
							case error.UNKNOWN_ERROR:
								console.error('An unknown error occurred.');
								break;
							default:
								console.error('An error occurred.');
								break;
						}
						reject(error);
					},
				);
			} else {
				console.error('Geolocation is not supported by this browser.');
				reject('Geolocation is not supported by this browser.');
			}
		});
	};

	const getLocationOnClick = async () => {
		setIsLoading(true);
		try {
			const position = await userLocation();
			setLocation(position);
			setPin(text);
			setIsLoading(false);
			console.log('User location obtained:', position);
			// Do whatever you want with the position here
		} catch (error) {
			console.error('Error getting user location:', error);
		}
	};
	const clearData = () => {
		setTitle('');
		setImageAsset(null);
		setDesc('');
		setLocation('');
		setCategory('Select Category');
	};
	const shareEvent = async () => {
		try {
			if (!title || !desc || !location || !category) {
				console.log('Field cannot be empty');
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					desc: desc,
					category: category,
					location: location,
					imageURL: imageAsset,
				};
				await setDoc(doc(firestore, 'incident', `${Date.now()}`), {
					data,
				});
				// saveItem(data);
				clearData();
			}
		} catch (error) {
			console.log(error);
		}
		// fetchData();
	};

	const fetchData = async () => {
		await getAllIncident().then((data) => {
			dispatch({
				type: actionType.SET_INCIDENT,
				incident: data,
			});
			console.log(data);
		});
	};

	return (
		<div className=' pt-16 w-full flex flex-col items-center justify-center'>
			<div className=' my-10'>
				<p className=' font-medium text-3xl'>Upload Incident</p>
			</div>
			<div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-1/2 h-1/2 md:h-340 cursor-pointer rounded-lg'>
				{isLoading ? (
					<Loader />
				) : (
					<div>
						{!imageAsset ? (
							<div>
								<label>
									<div className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
										<MdCloudUpload className='text-gray-500 text-8xl hover:text-gray-700' />
										<p className='text-gray-500 hover:text-gray-700'>
											Click here to upload a picture of what is happening
										</p>
									</div>
									<input
										type='file'
										accept='image/*'
										className=' w-0 h-0'
										onChange={uploadImage}
									/>
								</label>
							</div>
						) : (
							<>
								<div className='relative h-full'>
									<img
										src={imageAsset}
										alt='uploaded image'
										className=' w-80 h-autoobject-cover'
									/>
									<button
										type='button'
										className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out'
										onClick={deleteImage}>
										<MdDelete className='text-white' />
									</button>
								</div>
							</>
						)}
					</div>
				)}
			</div>
			<div className=' border border-gray-400 rounded-2xl px-6 py-3 flex flex-col gap-4 mt-4'>
				<input
					type='text'
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='What is Hapening??????'
					className='w-full h-full text-lg bg-transparent outline-none placeholder:text-gray-400 text-textColor border-b-2'
				/>
				<input
					type='text'
					required
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
					placeholder='Description'
					className='w-full h-full text-lg bg-transparent outline-none placeholder:text-gray-400 text-textColor border-b-2'
				/>
				<div className='w-full'>
					<select
						onChange={(e) => setCategory(e.target.value)}
						className='outline-none w-full text-base border-b-2 border-gray-200 rounded-md cursor-pointer'>
						<option
							value='other'
							className='bg-white'>
							Select Category
						</option>
						{categories &&
							categories.map((item) => (
								<option
									key={item.id}
									className='text-base border-0 outline-none capitalize bg-white text-headingColor'
									value={item.name}>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<button onClick={getLocationOnClick}>
					{isLoading ? <Loader /> : pin !== null ? pin : 'Get location'}
				</button>
				<button
					className=' flex items-center justify-center gap-2 py-1 px-2 border-black rounded-xl border hover:bg-black hover:text-white'
					onClick={() => {
						shareEvent();
					}}>
					<p>Share</p>
					<FaShare />
				</button>
			</div>
		</div>
	);
};

export default NewEvent;
