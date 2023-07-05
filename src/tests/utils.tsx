import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import WishlistProvider from '@/components/WishlistProvider';

const customRender = (ui: ReactElement, options?: RenderOptions) => {
	return render(<WishlistProvider>{ui}</WishlistProvider>, options);
};

export * from '@testing-library/react';
export { customRender as render };
