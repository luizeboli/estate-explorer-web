/// <reference types="cypress" />

import type { WordpressPropertyPostType } from '../../src/types/wordpress';

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Retrieve properties from the Wordpress REST API
			 */
			getProperties: (options?: {
				per_page?: number;
			}) => Chainable<Response<WordpressPropertyPostType[]>>;
		}
	}
}
