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

	incidents.forEach((incident) => console.log(incident.data.title));

	return <div>{incidents.data.title}</div>;
};

export default Feed;
