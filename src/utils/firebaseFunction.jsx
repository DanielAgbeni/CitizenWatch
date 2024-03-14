import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase';
export const saveItem = async (data) => {
	await setDoc(doc(firestore, 'incident', `${Date.now()}`), data, {
		merge: true,
	});
};

// getall food items
export const getAllIncident = async () => {
	const items = await getDocs(
		query(collection(firestore, 'incident'), orderBy('id', 'desc')),
	);

	return items.docs.map((doc) => doc.data());
};
