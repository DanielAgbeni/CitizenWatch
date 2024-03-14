import { fetchUser } from '../utils/fetchLocalStorage';
const userInfo = fetchUser();

export const initialState = {
	user: userInfo,
	incident: null,
};
