import { useCallback, useEffect, useState } from 'react';

type StateSetterValue<T> = (state: T) => T | T;

type UseLocalStorageReturn<TInitialState> = [
	TInitialState,
	(value: TInitialState | StateSetterValue<TInitialState>) => void,
];

const useLocalStorage = <TInitialState = any>(
	key: string,
	initialState: TInitialState,
): UseLocalStorageReturn<TInitialState> => {
	const getInitialState = useCallback(() => {
		try {
			const lsItem = localStorage.getItem(key);
			if (lsItem) return JSON.parse(lsItem);

			return initialState;
		} catch (e) {
			return initialState;
		}
	}, [key, initialState]);

	const [state, setState] = useState<TInitialState>(getInitialState);

	const handleStateChange = useCallback(
		(value: TInitialState | StateSetterValue<TInitialState>) => {
			const newState = value instanceof Function ? value(state) : value;
			setState(newState);

			try {
				window.localStorage.setItem(key, JSON.stringify(newState));
			} catch (e) {
				/* empty */
			}
		},
		[key, state],
	);

	/*
	 * The purpose of this effect is to run during the hydration phase.
	 * So consumers of this hook recalculate side effects based on the state.
	 */
	useEffect(() => {
		setState(getInitialState());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [state, handleStateChange];
};

export default useLocalStorage;
