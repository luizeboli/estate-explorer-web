import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
	it('should return saved value if key exists', () => {
		// Arrange
		localStorage.setItem('test', JSON.stringify({ test: 'test' }));
		const { result } = renderHook(() => useLocalStorage('test', {}));

		// Assert
		expect(result.current[0]).toStrictEqual({ test: 'test' });
	});

	it('should return default value if key doesnt exist', () => {
		// Arrange
		const { result } = renderHook(() => useLocalStorage('test', { default: 'value' }));

		// Assert
		expect(result.current[0]).toStrictEqual({ default: 'value' });
	});

	it('should save value to local storage', () => {
		// Arrange
		const { result } = renderHook(() => useLocalStorage('test', { default: 'value' }));

		// Act
		act(() => result.current[1]({ default: 'saved' }));

		// Assert
		expect(result.current[0]).toStrictEqual({ default: 'saved' });
		expect(localStorage.getItem('test')).toBe(JSON.stringify({ default: 'saved' }));
	});

	it('should pass current state to the setter callback', () => {
		// Arrange
		const { result } = renderHook(() => useLocalStorage('test', { default: 'value' }));

		// Act
		act(() => result.current[1]((state) => ({ ...state, other: 'saved' })));

		// Assert
		expect(result.current[0]).toStrictEqual({ default: 'value', other: 'saved' });
	});
});
