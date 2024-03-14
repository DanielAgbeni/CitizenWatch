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
		<div class='container mx-auto p-4'>
			<div class='overflow-x-auto'>
				<div class='flex flex-col items-center justify-center gap-8 space-x-4'>
					{incidents
						.slice(0)
						.reverse()
						.map((incident, index) => (
							<div
								class='max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden'
								key={index}>
								<img
									class='w-full h-40 object-cover'
									src={incident.data.imageURL}
									alt={incident.data.title}
								/>
								<div class='p-4'>
									<h3 class='text-lg font-semibold mb-2'>
										{incident.data.title}
									</h3>
									<p class='text-gray-700'>{incident.data.desc}</p>
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
