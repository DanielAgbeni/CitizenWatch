export const actionType = {
	SET_USER: 'SET_USER',
	SET_INCIDENT: 'SET_INCIDENT',
};
const reducer = (state, action) => {
	// console.log(action);

	switch (action.type) {
		case actionType.SET_USER:
			return {
				...state,
				user: action.user,
			};
		case actionType.SET_INCIDENT:
			return {
				...state,
				incident: action.incident,
			};
		default:
			return state;
	}
};
export default reducer;
