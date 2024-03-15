import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

const Feed = () => {
	const [incidents, setIncidents] = useState([]);

	useEffect(() => {
		const fetchIncidents = async () => {
			try {
				const querySnapshot = await getDocs(collection(firestore, 'incident'));
				const incidentData = querySnapshot.docs.map((doc) => doc.data());
				setIncidents(incidentData);
			} catch (error) {
				console.error('Error fetching incidents:', error);
			}
		};

		fetchIncidents();
	}, []);

	return (
		<div className='container mx-auto p-4'>
			<div className='overflow-x-auto'>
				<div className='flex flex-col items-center justify-center gap-8 space-x-4'>
					{incidents
						.slice(0)
						.reverse()
						.map((incident, index) => (
							<div
								className='max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden relative'
								key={index}>
								<img
									className='w-full h-40 object-cover'
									src={incident.data.imageURL}
									alt={incident.data.title}
								/>
								<div className='p-4'>
									<h3 className='text-lg font-semibold mb-2'>
										{incident.data.title}
									</h3>
									<p className='text-gray-700'>{incident.data.desc}</p>
									<div className='text-gray-500 py-1 px-1 bg-slate-300 rounded-md'>
										{incident.data.category}
									</div>
									<div className='flex items-center justify-center gap-2'>
										<p className='text-gray-700'>
											Latitude: {incident.data.location.latitude}
										</p>
										<p className='text-gray-700'>
											Longitude: {incident.data.location.longitude}
										</p>
									</div>
									{/* Add more <div>s or other elements for additional properties */}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Feed;
